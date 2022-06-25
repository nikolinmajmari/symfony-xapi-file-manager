import { SnapshotEntry } from "./snapshot_entry";

export interface Snapshot{
    children:SnapshotEntry[];
    ancestors:string[];
    entry:SnapshotEntry;
}