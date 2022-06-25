import React from "react";

export interface IconButtonPropsInterface {
  icon: any;
  text: string;
}
export function IconButton({ icon, text }: IconButtonPropsInterface) {
  return (
    <button className="p-2 my-1 bg-blue-100 hover:bg-blue-500 font-bold text-blue-900 hover:text-blue-50 rounded-md flex flex-row items-center">
      {icon}
      <div className="w-2"></div>
      {text}
    </button>
  );
}
