<?php

namespace Xapi\FsManager\Controllers;

use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Xapi\FsManager\DTO\SnapshotEntry;
use Xapi\FsManager\Snapshot\SnapshotWalker;

class SnapshotController extends AbstractController
{
    private Environment $twig;
    private EventDispatcher $dispatcher;
    private SnapshotWalker $walker;
    public function __construct(EventDispatcher $dispatcher, SnapshotWalker $walker,Environment $twig)
    {
        $this->dispatcher = $dispatcher;
        $this->walker = $walker;
        $this->twig = $twig;
    }

    /**
     * @throws \Exception
     */
    public function getSnapshot(): Response
    {
        $entries = $this->walker->get();
        $rendered = $this->twig->render('@XapiFSManager/base.html.twig',[
            "entries"=>$entries
        ]);
        return new Response($rendered);
    }
}