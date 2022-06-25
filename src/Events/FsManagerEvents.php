<?php

namespace Xapi\FsManager\Events;

final class FsManagerEvents
{
    const FsManagerAccessRequestEvent = "xapi.fs_manager.access_request";
    const FsManagerAccessEvent = "xapi.fs_manager.access";
    const FsManagerSearchRequestEvent = "xapi.fs_manager.search_request";
    const FsManagerFileUploadRequestEvent = "xapi.fs_manager.file_upload_request";
    const FsManagerFileUploadEvent = "xapi.fs_manager.file_upload";
    const FsManagerSnapshotMoveRequestEvent = "xapi.fs_manager.move_request";
    const FsManagerSnapshotMoveEvent = "xapi.fs_manager.move";
    const FsManagerSnapshotDeleteRequestEvent = "xapi.fs_manager.move_request";
    const FsManagerSnapshotDeleteEvent = "xapi.fs_manager.move";
}