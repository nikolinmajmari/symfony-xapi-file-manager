export interface SnapshotEntry{
    id:string;
    name:string;
    type:FSSnapshotEntryType;
    mime:string;
    aTime:number;
    mTime:number;
}

export type FSSnapshotEntryType = "file"|"folder"|"shourtcut"|"compressed";