<?php

namespace Xapi\FsManager\Controllers;

use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Twig\Environment;
use Xapi\FsManager\Events\FsManagerAccessRequestEvent;
use Xapi\FsManager\Snapshot\SnapshotWalker;

class SnapshotController extends AbstractController
{
    private Environment $twig;
    private ?EventDispatcher $dispatcher;
    private SnapshotWalker $walker;
    public function __construct(?EventDispatcher $dispatcher, SnapshotWalker $walker,SerializerInterface $serializer)
    {
        $this->dispatcher = $dispatcher;
        $this->walker = $walker;
        $this->serializer = $serializer;
    }

    private function dispatchAccessRequestEvent(string $context):string{
        if($this->dispatcher!=null){
            $event = new FsManagerAccessRequestEvent($context);
            $this->dispatcher->dispatch($event,FsManagerAccessRequestEvent::NAME);
            return $event->getRequestedContext();
        }
        return $context;
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
}