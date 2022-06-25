import React from "react";
import { SnapshotEntry } from "../../api/resource/snapshot_entry";
import { FMSnapshotEntry } from "../../components/snapshot/FMSnapshotEntry";

export interface FMSnapshotPropsInterface {
  entries: SnapshotEntry[];
  self: any;
}

export default function FMSnapshot(props: FMSnapshotPropsInterface) {
  console.log("props",props);
  return (
    <div className="structure flex flex-col overflow-y-scroll flex-1 my-4">
      <div className="header bg-gray-100 pt-3 bg-opacity-90 sticky fixed grid grid-cols-11 border-gray-300 border-b pb-3" style={{top:0}}>
        <div className="col-span-1"></div>
        <div className="col-span-6 font-bold text-gray-500">Name</div>
        <div className="col-span-2 font-bold text-gray-500">Last Modified</div>
        <div className="col-span-2 font-bold text-gray-500">Size</div>
      </div>
      {props.entries?.map((ch) => (
        <FMSnapshotEntry entry={ch} />
      ))}
    </div>

  );
}
