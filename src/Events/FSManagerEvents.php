<?php

namespace Xapi\FSManager\Events;

final class FSManagerEvents
{
    const FSManagerAccessRequestEvent = "xapi.fs_manager.access_request";
    const FSManagerAccessEvent = "xapi.fs_manager.access";
    const FSManagerSearchRequestEvent = "xapi.fs_manager.search_request";
    const FSManagerFileUploadRequestEvent = "xapi.fs_manager.file_upload_request";
    const FSManagerFileUploadEvent = "xapi.fs_manager.file_upload";
    const FSManagerSnapshotMoveRequestEvent = "xapi.fs_manager.move_request";
    const FSManagerSnapshotMoveEvent = "xapi.fs_manager.move";
    const FSManagerSnapshotDeleteRequestEvent = "xapi.fs_manager.move_request";
    const FSManagerSnapshotDeleteEvent = "xapi.fs_manager.move";
}