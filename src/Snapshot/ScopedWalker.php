<?php

namespace Xapi\FsManager\Snapshot;

use Symfony\Bridge\Twig\NodeVisitor\Scope;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Xapi\FsManager\DTO\Snapshot;

class ScopedWalker implements WalkerInterface
{
    protected string $scopedContext;
    /**
     * @var string
     */
    protected string $scope;
    /**
     * @var WalkerInterface
     */
    protected WalkerInterface $walker;

    public function __construct(WalkerInterface $walker,string $scope)
    {
        $this->scope = $scope;
        $this->walker = $walker;
        $this->setContext("/");
    }
    /**
     * @return SplFileInfo
     */
    public function current(): SplFileInfo
    {
        $pathName = $this->getContextPathName();
        if($pathName) {
            return new SplFileInfo($this->walker->getContext(), $this->getContext(), $pathName);
        }
        throw new Exception("Invalid context");
    }

    function getEntries(): array
    {
        return array_map(
            fn(\SplFileInfo $info)=>new SplFileInfo(
                $info->getRealPath(),
                $this->getScopedPath($info->getPath()),
                $this->getScopedPath($info->getPathname()))
            ,$this->walker->getEntries()
        );
    }

    private function getScopedPath(string $path):string{
        return str_replace($this->scope,"",$path);
    }
    function contains(\SplFileInfo $info): array
    {
        return $this->walker->contains($info);
    }

    function getContext(): string
    {
        return $this->scopedContext;
    }

    function setContext(string $context)
    {
        if(strlen($context)!=0 && DIRECTORY_SEPARATOR == $context[-1]){
            $context = substr($context,0,-1);
        }

        $this->walker->setContext($this->scope.$context);
        $this->scopedContext = $context;
    }

    private function getContextPathName()
    {
        if($this->getContext()==""||$this->getContext()==DIRECTORY_SEPARATOR){
            return "root";
        }
        $names = explode(DIRECTORY_SEPARATOR,$this->getContext());
        return end($names);
    }

    public function isDir(): bool
    {
        return is_dir($this->getContext());
    }
}