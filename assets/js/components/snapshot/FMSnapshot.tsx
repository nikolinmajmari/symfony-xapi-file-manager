import React from "react";
import { FSSnapshotEntry } from "../../api/resource/fs_snapshot_entry";
import { FMSnapshotEntry } from "../../components/snapshot/FMSnapshotEntry";

export interface FMSnapshotPropsInterface {
  childrens: FSSnapshotEntry[];
  self: any;
}

export default function FMSnapshot(props: FMSnapshotPropsInterface) {
  return (
    <div className="structure sticky flex flex-col overflow-y-scroll flex-1 my-4">
      <div className="header grid grid-cols-11 border-gray-300 border-b pb-3">
        <div className="col-span-1"></div>
        <div className="col-span-6 font-bold text-gray-500">Name</div>
        <div className="col-span-2 font-bold text-gray-500">Last Modified</div>
        <div className="col-span-2 font-bold text-gray-500">Size</div>
      </div>
      {props.childrens.map((ch) => (
        <FMSnapshotEntry entry={ch} />
      ))}
    </div>
  );
}
