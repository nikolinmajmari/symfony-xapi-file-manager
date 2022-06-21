import React from "react";
import { SiGoogletagmanager } from "react-icons/si";
import { BreadcumpLink } from "./BreadcumpLink";
export default function FMSnapshotBreadcump() {
  return (
    <div className="breadcump flex flex-row justify-start p-1 rounded-md bg-blue-50 text-blue-500 items-center">
      <SiGoogletagmanager className="mx-1" />
      <BreadcumpLink text="KeenThemes" current={false} />
      <BreadcumpLink text="Themes" current={false} />
      <BreadcumpLink text="html" current={true} />
    </div>
  );
}
