<?php

namespace Xapi\FSManager\Controllers;

use http\Env;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Twig\Environment;
use Xapi\FSManager\Events\FSManagerAccessRequestEvent;
use Xapi\FSManager\Snapshot\SnapshotWalker;

class SnapshotController extends AbstractController
{
    private ?EventDispatcher $dispatcher;
    private SnapshotWalker $walker;
    private Environment $twig;
    public function __construct(?EventDispatcher $dispatcher, SnapshotWalker $walker,Environment $twig)
    {
        $this->dispatcher = $dispatcher;
        $this->walker = $walker;
        $this->twig = $twig;
    }


    private function dispatchAccessRequestEvent(string $context):string{
        if($this->dispatcher!=null){
            $event = new FSManagerAccessRequestEvent($context);
            $this->dispatcher->dispatch($event,FSManagerAccessRequestEvent::NAME);
            return $event->getRequestedContext();
        }
        return $context;
    }


    /**
     * @return Response
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function getReactClient(): Response
    {
        return new Response($this->twig->render("@XapiFSManager/base.html.twig"));
    }

    /**
     * @throws \Exception
     */
    public function getSnapshot(Request $request): Response
    {
        $context = $request->query->get(SnapshotWalker::CONTEXT)??SnapshotWalker::ROOT;
        $context = $this->dispatchAccessRequestEvent($context);
        $this->walker->setContext($context);
        $snapshot = $this->walker->get();
        if($request->query->get("onlyDirs",false)){
            $snapshot = $snapshot->withFoldersOnly();
        }
        return $this->json([
            "data"=>$snapshot
        ]);
    }

    /**
     * @throws \Exception
     */
    public function downloadFile(Request $request):Response{
        $context = $request->query->get(SnapshotWalker::CONTEXT)??SnapshotWalker::ROOT;
        $context = $this->dispatchAccessRequestEvent($context);
        $this->walker->setContext($context);
        $entry = $this->walker->get()->getEntry()->getSplFileInfo();
        return $this->file($entry);
    }

    /**
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function createDirectory(Request $request):Response{
        $this->walker->setContext($request->get(SnapshotWalker::CONTEXT,SnapshotWalker::ROOT));
        $newDir = $this->walker->createDir($request->get("name",null));
        return $this->json([
            "data"=>$newDir,
            "status"=>true
        ]);
    }

    /**
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function deleteSnapshot(Request $request):Response{
        $context = $request->get(SnapshotWalker::CONTEXT,SnapshotWalker::ROOT);
        $this->walker->setContext($context);
        $entry = $this->walker->get()->getEntry();
        if($this->walker->remove()){
            return $this->json([
                "data"=>$entry,
                "status"=>true,
                "message"=>"deleted successfully"
            ]);
        }
        throw new \Exception("Can not remove ".$context);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function uploadIntoSnapshot(Request $request):Response{
        $context = $request->get(SnapshotWalker::CONTEXT,SnapshotWalker::ROOT);
        $this->walker->setContext($context);
        $files = $request->files->all();
        $entries = [];
        /** @var UploadedFile $file */
        foreach ($files as $file){
            $entries[]=$this->walker->upload($file);
        }
        return $this->json([
            "status"=>true,
            "message"=>"files uploaded successfully",
            "data"=>$entries
        ]);
    }
}