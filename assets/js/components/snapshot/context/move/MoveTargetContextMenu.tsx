import React, { createRef, ForwardedRef } from "react";
import { useRef } from "react";
import { SnapshotEntry } from "../../../../api/resource/snapshot_entry";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getSnapshot, selectMoveTarget } from "../../../../features/move/moveTargetSlice";
import { BreadcumpLink } from "../../BreadcumpLink";

export interface MoveTargetContextMenuPropsInterface{
    parentAnchor:{x:number,y:number};
    handleMove:(target:string)=>void;
}

export const MoveTargetContextMenu = React.forwardRef((props:MoveTargetContextMenuPropsInterface,ref:ForwardedRef<HTMLDivElement>)=>{
    const moveTargetState = useAppSelector(selectMoveTarget);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        dispatch(getSnapshot("/"));
    })
    const ancestors = moveTargetState?.value?.ancestors;
    let parent:string;
    if(ancestors.length>0){
        parent = ancestors[ancestors.length-1];
    }
    parent = "";
    const entries = moveTargetState?.value?.children??[];
    const renderEntry = (entry:SnapshotEntry)=>{
        return (
            <div key={entry.id} className="flex flex-row justify-between" onClick={()=>dispatch(getSnapshot(entry.id))}>
                <label>{entry.name}</label>
            </div>
        );
    }
    return (   <div 
        ref={ref}
        className="context-menu w-60 bg-white shadow-xl rounded-xl text-gray-800 fixed m-0 p-0"
        style={{
          top: `${props.parentAnchor.y}px`,
          left: `${props.parentAnchor.x}px`,
        }}
        >
            <div className="flex flex-row">
                <BreadcumpLink current={false} onClick={()=>1} text={parent}/>
            </div>
            <div className="flex flex-col items-stretch h-40 overflow-y-scroll">
                {entries?.map(e=>renderEntry(e))}
            </div>
            <div className="flex flex-row justify-end">
                <button className="btn bg-blue-500 text-white px-4 py-2 rounded">Move</button>
            </div>
        </div>);
});