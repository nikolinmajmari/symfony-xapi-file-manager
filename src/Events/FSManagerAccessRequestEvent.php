<?php

namespace Xapi\FSManager\Events;

use Symfony\Contracts\EventDispatcher\Event;

class FSManagerAccessRequestEvent extends Event
{
    const NAME = FSManagerEvents::FSManagerAccessRequestEvent;

    private string $requestedContext;
    /**
     * @return string
     */
    public function getRequestedContext(): string
    {
        return $this->requestedContext;
    }

    /**
     * @param string $requestedContext
     */
    public function setRequestedContext(string $requestedContext): void
    {
        $this->requestedContext = $requestedContext;
    }
    public function __construct(string $requestedContext)
    {
        $this->requestedContext = $requestedContext;
    }
}