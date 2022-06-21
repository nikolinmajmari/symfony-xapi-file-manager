import React from "react";
import { IoIosArrowForward } from "react-icons/io";
export interface BreadcumpLinkPropsInterface {
  text: string;
  current: boolean;
}

export function BreadcumpLink(props: BreadcumpLinkPropsInterface) {
  return (
    <div className="flex flex-row items-center mx-1">
      <label className="px-1 text-sm hover:text-blue-900 font-bold cursor-pointer">
        {props.text}
      </label>
      <IoIosArrowForward size={20} />
    </div>
  );
}
