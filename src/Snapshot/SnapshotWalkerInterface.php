<?php

namespace Xapi\FsManager\Snapshot;

use Xapi\FsManager\DTO\Snapshot;
use Xapi\FsManager\DTO\SnapshotEntry;

interface SnapshotWalkerInterface
{
    function get():Snapshot;
    function head():SnapshotEntry;
    function ancestors():array;
    function remove():bool;
    function compress():SnapshotEntry;
    function decompress():array;
    function move(string $newContext):array;
    function getEntries():array;
    function search(string $text):array;
}