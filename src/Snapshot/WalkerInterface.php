<?php

namespace Xapi\FsManager\Snapshot;

use Symfony\Component\Finder\SplFileInfo;

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

}