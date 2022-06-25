<?php

namespace Xapi\FsManager\Snapshot;

use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class Walker implements WalkerInterface
{
    /**
     * @var string
     */
    protected string $context;
    /**
     * @return false|string
     */
    protected function getPathName()
    {
        if($this->context == DIRECTORY_SEPARATOR){
            return "root";
        }
        $paths = explode(DIRECTORY_SEPARATOR, $this->context);
        return end($paths);
    }

    /**
     * @return array
     */
    function getEntries(): array
    {
        if(is_dir($this->getContext())){
            $results = scandir($this->getContext());
            $results = array_slice($results,2);
            return array_map(
                fn($pathName)=> new \SplFileInfo(
                    implode(DIRECTORY_SEPARATOR,[$this->getContext(),$pathName])
                ),
                $results
            );
        }
        return [];
    }

    public function isDir(): bool
    {
        return is_dir($this->getContext());
    }

    function current(): \SplFileInfo
    {
        $pathName = $this->getPathName();
        if($pathName!==false) {
            return new \SplFileInfo($this->getContext());
        }
        throw new Exception("Invalid context");
    }

    function contains(\SplFileInfo $info): array
    {
        (new Finder())->in($this->context)->contains($info->getPathname());
        return [];
    }

    function setContext(string $context)
    {
        if(!file_exists($context)){
            throw new Exception("Context ".$this->context." Not found on machine");
        }
        if(DIRECTORY_SEPARATOR == $context[-1]){
            $context = substr($context,0,-1);
        }
        $this->context = $context;
    }

    function getContext(): string
    {
        return $this->context;
    }
}