<?php

namespace Xapi\FSManager\DTO;

use Symfony\Component\Finder\SplFileInfo;

class Snapshot implements \JsonSerializable
{

    private SnapshotEntry $entry;
    private ?array $ancestors;

    private array $children=[];

    public function __construct()
    {}


    /**
     * @return SnapshotEntry
     */
    public function getEntry(): SnapshotEntry
    {
        return $this->entry;
    }

    /**
     * @param SnapshotEntry $entry
     */
    public function setEntry(SnapshotEntry $entry): self
    {
        $this->entry = $entry;
        return $this;
    }

    /**
     * @return array|null
     */
    public function getAncestors(): ?array
    {
        return $this->ancestors;
    }

    /**
     * @param array|null $ancestors
     */
    public function setAncestors(?array $ancestors): self
    {
        $this->ancestors = $ancestors;
        return $this;
    }

    /**
     * @return array
     */
    public function getChildren(): array
    {
        return $this->children;
    }

    public function getFolders():array{
        return array_filter($this->getChildren(),fn(SnapshotEntry $child)=>$child->getSplFileInfo()->isDir());
    }

    /**
     * @param array $children
     */
    public function setChildren(array $children): self
    {
        $this->children = $children;
        return $this;
    }

    public function addChild(SnapshotEntry $child):self{
        $this->children[] = $child;
        return $this;
    }

    /**
     * @throws \Exception
     */
    static function fromSplFileInfo(SplFileInfo $info): Snapshot
    {
        $entry = new SnapshotEntry($info);
        $snapshot = new self();
        $snapshot->setEntry($entry);
        return $snapshot;
    }

    public function withFoldersOnly(): Snapshot
    {
        return (new Snapshot())
            ->setAncestors($this->getAncestors())
            ->setEntry($this->getEntry())
            ->setChildren($this->getFolders());
    }

    public function jsonSerialize(): array
    {
        return [
          "ancestors"=>$this->ancestors,
          "entry"=>$this->entry,
          "children"=>$this->children
        ];
    }
}