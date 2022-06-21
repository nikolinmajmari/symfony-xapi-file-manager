import React from "react";
import { useAppSelector } from "../../app/hooks";
import FMSnapshot from "../../components/snapshot/FMSnapshot";

export default function FMSnapshotContainer() {
  const state = useAppSelector((e) => e.snapshot);
  if (state.status === "loading") {
    return (
      <>
        <label>Loading</label>
      </>
    );
  } else if (state.status === "failed") {
    return (
      <>
        <label>Failure</label>
      </>
    );
  }
  return (
    <>
      <FMSnapshot childrens={state.value.childrens} self={state.value} />
    </>
  );
}
