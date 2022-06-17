<?php

namespace Xapi\FsManager;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class XapiFSManagerBundle extends Bundle
{
    public function getPath(): string
    {
        die();
        return \dirname(__DIR__);
    }
}