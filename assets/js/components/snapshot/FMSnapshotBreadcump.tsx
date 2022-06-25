import React from "react";
import { SiGoogletagmanager } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSnapshot } from "../../features/snapshot/snapshotSlice";
import { BreadcumpLink } from "./BreadcumpLink";
export default function FMSnapshotBreadcump() {
  const ancestors = useAppSelector(e=>e.snapshot.value.ancestors);
  const dispatch = useAppDispatch();
  return (
    <div className="breadcump flex flex-row justify-start p-1 rounded-md bg-blue-50 text-blue-500 items-center">
      <SiGoogletagmanager className="mx-1" />
      {
        ancestors?.map(e=><BreadcumpLink 
          text={e} 
          current={false} 
          onClick={()=>{
            dispatch(getSnapshot(e))
          }}
          />)
      }
    </div>
  );
}
