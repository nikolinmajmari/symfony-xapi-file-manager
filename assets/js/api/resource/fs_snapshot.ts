import { FSSnapshotEntry } from "./fs_snapshot_entry";

export interface FSSnapshot extends FSSnapshotEntry{
    childrens:FSSnapshotEntry[],
    ancestors:FSSnapshotEntry[],
}