<?php

namespace Xapi\FsManager\Snapshot;

interface FsFilterInterface
{
    /**
     * @param string $search can be name or regular expression
     * @return mixed
     */
    function filterByName(string $search);

    /**
     * @param int $size
     * @return mixed
     */
    function filterBySize(int $size);

}