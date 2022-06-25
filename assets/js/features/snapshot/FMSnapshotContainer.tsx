import React from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import FMSnapshot from "../../components/snapshot/FMSnapshot";
import { getSnapshot } from "./snapshotSlice";

export default function FMSnapshotContainer() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((e) => e.snapshot);
  React.useEffect(()=>{
    dispatch(getSnapshot(state.value.entry.id));
  },[])
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
      <FMSnapshot entries={state.value.children} self={state.value} />
    </>
  );
}
