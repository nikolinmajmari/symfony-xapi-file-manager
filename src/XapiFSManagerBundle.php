<?php

namespace Xapi\FsManagerBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class XapiFSManagerBundle implements Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }
}