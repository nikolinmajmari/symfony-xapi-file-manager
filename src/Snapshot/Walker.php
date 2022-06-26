<?php

namespace Xapi\FSManager\Snapshot;

use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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

    /**
     * @return string
     */
    function getContext(): string
    {
        return $this->context;
    }

    /**
     * @param string $name
     * @return \SplFileInfo|null
     */
    function mkDir(string $name): ?\SplFileInfo
    {
        $path = implode(DIRECTORY_SEPARATOR,[$this->getContext(),$name]);
        if(mkdir($path)){
            return new \SplFileInfo($path);
        }
        return null;
    }

    /**
     * @return void
     */
    function remove(): void
    {
        if(str_contains($this->getContext(),"storage")){
            if($this->isDir()){
                self::delTree($this->context);
            }else{
                unlink($this->getContext());
            }
        }
    }

    /**
     * @return \SplFileInfo
     * @throws \Exception
     */
    function achive(): \SplFileInfo
    {
        throw new \Exception("not implemented yet");
    }

    /**
     * @param $dir
     * @return void
     */
    static function delTree($dir){
        $files = array_diff(scandir($dir),[".",".."]);
        foreach($files as $file){
            $path = $dir.DIRECTORY_SEPARATOR.$file;
            if(is_dir($path)){
                self::delTree($path);
            }else{
                unlink($path);
            }
        }
        rmdir($dir);
    }

    function upload(UploadedFile $file): \SplFileInfo
    {
        $path = $this->getContext().DIRECTORY_SEPARATOR.$file->getClientOriginalName();
        if(file_exists($path)){
            throw new \Exception("file already exists");
        }
        rename($file->getPathname(),$path);
        return new \SplFileInfo($path);
    }
}