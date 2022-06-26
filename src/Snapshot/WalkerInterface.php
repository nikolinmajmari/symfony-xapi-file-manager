<?php

namespace Xapi\FSManager\Snapshot;

use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @author Nikolin Majmari  nikolinmajmari30@gmail.com
 */
interface WalkerInterface extends ContextInterface
{
    /**
     * @return array
     */
    function getEntries():array;

    /**
     * @return \SplFileInfo
     */
    function current():\SplFileInfo;

    /**
     * @param \SplFileInfo $info
     * @return array
     */
    function contains(\SplFileInfo $info):array;

    function isDir():bool;

    function mkDir(string $name):?\SplFileInfo;

    function remove():void;

    function achive():\SplFileInfo;

    function upload(UploadedFile $file):\SplFileInfo;

}