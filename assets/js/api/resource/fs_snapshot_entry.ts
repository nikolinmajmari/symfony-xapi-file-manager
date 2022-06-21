export interface FSSnapshotEntry{
    name:string;
    path:string;
    parent:string;
    id:string;
    type:FSSnapshotEntryType;
    mime:string;
    tags:string[];
}

export type FSSnapshotEntryType = "file"|"folder"|"shourtcut"|"compressed";