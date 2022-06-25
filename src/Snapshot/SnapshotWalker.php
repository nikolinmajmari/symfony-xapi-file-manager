<?php

namespace Xapi\FSManager\Snapshot;

use Exception;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Xapi\FSManager\DTO\Snapshot;
use Xapi\FSManager\DTO\SnapshotEntry;

class SnapshotWalker implements SnapshotWalkerInterface, ContextInterface
{
    const CONTEXT = "context";
    const ROOT = "";
    private WalkerInterface $walker;

    function __construct(ScopedWalker $walker)
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
                array_map(fn(SplFileInfo $entry)=>new SnapshotEntry($entry),$this->walker->getEntries())
            )
            ->setEntry($this->head())
            ->setAncestors(
                $this->getAncestors()
            );
    }

    public function getAncestors():array{
        $ancestors = [];
        $ancestorsNames = explode(DIRECTORY_SEPARATOR,$this->walker->getContext());
        $ancestor = null;
        foreach($ancestorsNames as $name){;
            if($ancestor!==null){
                $ancestor = $ancestor.DIRECTORY_SEPARATOR.$name;
            }else{
                $ancestor = $name;
            }
            $ancestors[]=$ancestor;
        }
        return $ancestors;
    }

    public function createDir(?string $dirName){
        if($dirName==null){
            throw new Exception("please defined idr name");
        }
        $info = $this->walker->mkDir($dirName);
        if($info){
            return new SnapshotEntry($info,$this->walker->getContext(),implode(DIRECTORY_SEPARATOR,[$this->walker->getContext(),$dirName]));
        }else{
            throw new Exception("Could not open file");
        }
    }

    function remove():bool
    {
        $this->walker->remove();
        return true;
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