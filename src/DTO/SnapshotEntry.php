<?php

namespace Xapi\FsManager\DTO;

use Symfony\Component\Finder\SplFileInfo;

class SnapshotEntry
{
    /**
     * @var string
     */
    private string $id;
    /**
     * @var string $type Snapshot entry type
     */
    private string $type;
    /**
     * @var string
     */
    private string $alias;
    /**
     * @var float
     */
    private float $size;
    /**
     * @var \DateTime
     */
    private \DateTime $lastEdit;
    /**
     * @var array
     */
    private array $tags;

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @param string $id
     */
    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }
    /**
     * @return string
     */
    public function getAlias(): string
    {
        return $this->alias;
    }

    /**
     * @param string $alias
     */
    public function setAlias(string $alias): self
    {
        $this->alias = $alias;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getLastEdit(): \DateTime
    {
        return $this->lastEdit;
    }

    /**
     * @param \DateTime $lastEdit
     */
    public function setLastEdit(\DateTime $lastEdit): self
    {
        $this->lastEdit = $lastEdit;
        return $this;
    }

    /**
     * @return float
     */
    public function getSize(): float
    {
        return $this->size;
    }

    /**
     * @param float $size
     */
    public function setSize(float $size): self
    {
        $this->size = $size;
        return $this;
    }

    /**
     * @return array
     */
    public function getTags(): array
    {
        return $this->tags;
    }

    /**
     * @param array $tags
     */
    public function setTags(array $tags): self
    {
        $this->tags = $tags;
        return $this;
    }


    /**
     * @throws \Exception
     */
    static function fromSplFileInfo(SplFileInfo $info,string $base): SnapshotEntry
    {
        return (new self())
            ->setAlias(str_replace($base,"",$info->getBasename()))
            ->setId(str_replace($base,"",$info->getPathname()))
            ->setLastEdit(
                \DateTime::createFromFormat(
                    "Y-m-d H:i:s",
                    date("Y-m-d H:i:s",$info->getMTime()
                    )
                )
            )
            ->setSize($info->getSize())
            ->setType($info->getType())
            ;
    }
}