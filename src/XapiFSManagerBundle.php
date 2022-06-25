<?php

namespace Xapi\FSManager;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Xapi\FSManager\DependencyInjection\XapiFSManagerExtension;

class XapiFSManagerBundle extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }

    public function getContainerExtension(): XapiFSManagerExtension
    {
        if (null === $this->extension) {
            $this->extension = new XapiFSManagerExtension();
        }
        return $this->extension;
    }


}