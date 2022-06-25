<?php

namespace Xapi\FsManager\Events;

use Symfony\Contracts\EventDispatcher\Event;

class FsManagerAccessRequestEvent extends Event
{
    const NAME = FsManagerEvents::FsManagerAccessRequestEvent;

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