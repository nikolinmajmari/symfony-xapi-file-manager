import React from "react";
import { MdOutlineSecurity } from "react-icons/md";
import FMSnapshotBreadcump from "./FMSnapshotBreadcump";

export function SnapshotHeader() {
  return (
    <div className="nav flex flex-row justify-between items-start pt-6">
      <div className="flex flex-row">
        <FMSnapshotBreadcump />
        <SecurityBadge />
      </div>
      <div className="p-1 text-sm font-bold rounded px-2 text-white bg-blue-500">
        {" "}
        82 Items
      </div>
    </div>
  );
}

export function SecurityBadge() {
  return (
    <div className="mx-3 py-2 px-3 bg-blue-200 rounded cursor-pointer">
      <MdOutlineSecurity size={20} />
    </div>
  );
}
