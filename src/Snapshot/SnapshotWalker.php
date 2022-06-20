<?php

namespace Xapi\FsManager\Snapshot;

use Exception;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\File\File;
use Xapi\FsManager\DTO\SnapshotEntry;

class SnapshotWalker
{
    private ?Filesystem $fileSystem;

    private string $root;

    private $pointer;

    public function __construct(Filesystem $filesystem,$root)
    {
        $this->fileSystem = $filesystem;
        $this->root = $root;
        $this->pointer = DIRECTORY_SEPARATOR;
    }

    public function point(string $path):void{

        $path = str_replace("..","",$path);
        $path = htmlspecialchars($path,ENT_QUOTES);
        $this->pointer = $path;
    }

    public function getAbsolutePointer():string{
        return $this->root.$this->pointer;
    }

    /**
     * @throws Exception
     */
    public function get(): array
    {
        $finder =  (new Finder())->ignoreUnreadableDirs()
            ->in($this->getAbsolutePointer());
        $entries = [];
        foreach ($finder as $item) {
            $entries[] = SnapshotEntry::fromSplFileInfo($item,$this->root);
        }
        return $entries;
    }
}