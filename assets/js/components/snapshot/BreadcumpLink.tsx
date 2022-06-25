import React from "react";
import { IoIosArrowForward } from "react-icons/io";
export interface BreadcumpLinkPropsInterface {
  text: string;
  current: boolean;
  onClick:Function;
}

export function BreadcumpLink(props: BreadcumpLinkPropsInterface) {
  return (
    <div onClick={(e)=>props.onClick()} className="flex flex-row items-center mx-1">
      <label className="px-1 text-sm hover:text-blue-900 font-bold cursor-pointer">
        {props.text.length==0?"root":props.text}
      </label>
      <IoIosArrowForward size={20} />
    </div>
  );
}
