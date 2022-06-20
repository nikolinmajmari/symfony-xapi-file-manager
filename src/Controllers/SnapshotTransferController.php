<?php

namespace Xapi\FsManager\Controllers;

use Symfony\Component\HttpFoundation\JsonResponse;

class SnapshotTransferController extends AbstractController
{
    private $config;
    public function __construct(array $config)
    {
        $this->config = $config;
    }

    function moveSnapshot(){
        return new JsonResponse();
    }
}