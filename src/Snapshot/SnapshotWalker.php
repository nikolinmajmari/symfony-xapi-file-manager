<?php

namespace Xapi\FsManager\Snapshot;

use Exception;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Xapi\FsManager\DTO\Snapshot;
use Xapi\FsManager\DTO\SnapshotEntry;

class SnapshotWalker implements SnapshotWalkerInterface, ContextInterface
{
    const CONTEXT = "context";
    const ROOT = "";
    private WalkerInterface $walker;

    function __construct(WalkerInterface $walker)
    {
        $this->walker = $walker;
    }

    /**
     * @throws Exception
     */
    public function get(): Snapshot
    {
        return (new Snapshot())
            ->setChildren(
                array_map(
                    fn(SplFileInfo $info)=>new SnapshotEntry($info),
                    $this->walker->getEntries()
                )
            )
            ->setEntry($this->head())
            ->setAncestors([]);
    }



    function remove(): bool
    {
        // TODO: Implement remove() method.
    }

    function compress(): SnapshotEntry
    {
        // TODO: Implement compress() method.
    }

    function decompress(): array
    {
        // TODO: Implement decompress() method.
    }

    function move(string $newContext): array
    {
        // TODO: Implement move() method.
    }

    /**
     * @throws Exception
     */
    function head(): SnapshotEntry
    {
        return new SnapshotEntry($this->walker->current());
    }

    /**
     * @throws Exception
     */
    function ancestors(): array
    {
        $parts = explode(DIRECTORY_SEPARATOR,$this->walker->getContext());
        $ancestors = [""];
        $sub = "";
        foreach($parts as $part){
            $sub = implode([DIRECTORY_SEPARATOR],[$sub,$part]);
            $ancestors[] = $sub;
        }
        return $ancestors;
    }

    function getEntries(): array
    {
        return $this->walker->getEntries();
    }

    function setContext(string $context)
    {
        return $this->walker->setContext($context);
    }

    function getContext(): string
    {
        return $this->walker->getContext();
    }

    function search(string $text): array
    {
        // TODO: Implement search() method.
    }
}