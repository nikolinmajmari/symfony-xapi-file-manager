<?php

namespace Xapi\FsManager\DTO;

use Exception;
use Symfony\Component\Finder\SplFileInfo;

class SnapshotEntry implements \JsonSerializable
{
    private SplFileInfo $splFileInfo;

    private string $relativePath;

    private string $relativePathname;

    public function __construct(SplFileInfo $splFileInfo,?string $relativePath=null,?string $relativePathname=null)
    {
        $this->splFileInfo = $splFileInfo;
        $this->relativePath = $relativePath??$this->splFileInfo->getRelativePath();
        $this->relativePathname =$relativePathname?? $this->splFileInfo->getRelativePathname();
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
     * @return SplFileInfo
     */
    public function getSplFileInfo(): SplFileInfo
    {
        return $this->splFileInfo;
    }

    /**
     * @return array
     */
    public function __serialize(): array
    {
        $isDir = $this->splFileInfo->isDir();
        return [
            "id"=>$this->splFileInfo->getRelativePathname(),
            "name"=>$this->splFileInfo->getFilename(),
            "size"=>$isDir?null:$this->splFileInfo->getSize(),
            "a_time"=>$isDir?null:$this->splFileInfo->getATime(),
            "m_time"=>$isDir?null:$this->splFileInfo->getMTime(),
            "type"=>$this->splFileInfo->getType(),
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