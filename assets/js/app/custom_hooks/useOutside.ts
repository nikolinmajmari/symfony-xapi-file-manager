import { any, func } from "prop-types";
import React,{useEffect} from "react";

function useOutside(containerRef:React.RefObject<Element>,contextMenuRef:React.RefObject<Element>,callback:Function):any{
    /**
     * if clicked outside of element
     */
    function handleClickOutside(event:MouseEvent){
        if(
            containerRef?.current?.contains(event.target as Node)
            && !contextMenuRef?.current?.contains(event.target as Node)
        ){
            callback();
        }
        useEffect(()=>{
            document.addEventListener("click",handleClickOutside);
            return ()=>{
                document.removeEventListener("click",handleClickOutside);
            }
        })
    }
}

export default useOutside;