<?php

namespace Xapi\FSManager\Snapshot;

interface ContextInterface
{
    /**
     * @param string $context
     * @return
     */
    function setContext(string $context);

    /**
     * @return string
     */
    function getContext():string;
}