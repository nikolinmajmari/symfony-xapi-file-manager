<?php

namespace Xapi\FSManager\DTO;

use Exception;
use Symfony\Component\Finder\SplFileInfo;

class SnapshotEntry implements \JsonSerializable
{
    private \SplFileInfo $splFileInfo;

    private string $relativePath;

    private string $relativePathname;

    public function __construct(SplFileInfo $splFileInfo)
    {
        $this->splFileInfo = $splFileInfo;
        $this->relativePath = $this->splFileInfo->getRelativePath();
        $this->relativePathname = $this->splFileInfo->getRelativePathname();
    }

    /**
     * Returns the relative path.
     *
     * This path does not contain the file name.
     *
     * @return string
     */
    public function getRelativePath(): string
    {
        return $this->relativePath;
    }

    /**
     * Returns the relative path name.
     *
     * This path contains the file name.
     *
     * @return string
     */
    public function getRelativePathname(): string
    {
        return $this->relativePathname;
    }
    /**
     * @return \SplFileInfo
     */
    public function getSplFileInfo(): \SplFileInfo
    {
        return $this->splFileInfo;
    }



    /**
     * @return array
     */
    public function __serialize(): array
    {
        return [
            "id"=>$this->getRelativePathname(),
            "name"=>$this->splFileInfo->getFilename(),
            "size"=>file_exists($this->splFileInfo->getPathname())?$this->splFileInfo->getSize():null,
            "a_time"=>file_exists($this->splFileInfo->getPathname())?$this->splFileInfo->getATime():null,
            "m_time"=>file_exists($this->splFileInfo->getPathname())?$this->splFileInfo->getMTime():null,
            "type"=>file_exists($this->splFileInfo->getPathname())?$this->splFileInfo->getType():null,
            'mime'=>file_exists($this->splFileInfo->getPathname())?$this->splFileInfo->getType():null,
        ];
    }

    public function getSize(){
        try{
            return $this->splFileInfo->getSize();
        }catch (\Exception $e){
            return null;
        }
    }

    public function jsonSerialize()
    {
        return $this->__serialize();
    }
}