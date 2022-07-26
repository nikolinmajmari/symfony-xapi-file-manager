import React, { createRef, MouseEventHandler, MutableRefObject, useRef } from "react";
import { AiOutlineCloudDownload, AiOutlineDelete } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { useAppDispatch } from "../../../app/hooks";
import { getSnapshot } from "../../../features/move/moveTargetSlice";
import {MoveTargetContextMenu} from "./move/MoveTargetContextMenu";

export interface ContextMenuIPropsInterface {
  onDelete:Function
  onDownload:Function,
}

const SnapshotEntryContextMenu = React.forwardRef(({onDelete,onDownload}:ContextMenuIPropsInterface,entryRef:React.RefObject<HTMLDivElement>)=>{  
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });
    var contextMenuRef = useRef<HTMLDivElement>();
    const handleContextMenu = (e: MouseEvent) => {
      if (entryRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        setAnchorPoint({ x: e.pageX, y: e.pageY });
        setShowMenu(true);
      } else if(!contextMenuRef.current?.contains(e.target as Node)) {
        setShowMenu(false);
      }

    };
    const handleClick = (e:MouseEvent) => {
      if(!contextMenuRef?.current?.contains(e.target as Node)){
        //setShowMenu(false);
      }
    };
    React.useEffect(() => {
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("click", handleClick);
      };
    }, []);
    return (<div ref={contextMenuRef} className="cursor-pointer">
      {showMenu?  <MainMenu ref={contextMenuRef} anchorPoint={anchorPoint} onDelete={onDelete} onDownload={onDownload}/>:<></>}
  </div>);
});
export default SnapshotEntryContextMenu;

interface IMainMenuProps{
  anchorPoint:{x:number,y:number};
  onDelete:Function;
  onDownload:Function;
}

const MainMenu = React.forwardRef((props:IMainMenuProps,contextMenuRef:any)=>{
  const [showMoveMenu,setShowMoveMenu] = React.useState<boolean>(false);
  React.useEffect(()=>{
    console.log(contextMenuRef,"forwarded ref");
    contextMenuRef.current?.addEventListener("click",handleClick);
    return ()=>contextMenuRef.current?.removeEventListener("click",handleClick);
  },[]);
  const moveMenuRef = React.useRef<HTMLDivElement>();

  const handleShowMenu = ()=>setShowMoveMenu(true);
  const handleClick = (e:MouseEvent)=>{
    console.log(moveMenuRef,"mmref",e.target,moveMenuRef.current?.contains(e.target as Node));
    if(!moveMenuRef.current?.contains(e.target as Node)){
      setShowMoveMenu(false);
    }
  }

  return (
    <div className="wrapper">
      <div
    className="context-menu w-60 bg-white shadow-xl rounded-xl text-gray-800 fixed m-0 p-0"
    style={{
      top: `${props.anchorPoint.y}px`,
      left: `${props.anchorPoint.x}px`,
    }}
  >
    <MenuOption 
      icon={<FiEye size={20} />} 
      text={"Preview"} 
      onClick={(e)=>1} />
    <MenuOption 
      icon={<MdDriveFileMoveOutline size={20} />} 
      text={"Move"} 
      onClick={handleShowMenu} /> 
    <MenuOption 
      icon={<FiEye size={20} />} 
      text={"View Details"} 
      onClick={(e)=>1} />
    <MenuOption 
      icon={<AiOutlineCloudDownload size={20} />} 
      text={"Download"} 
      onClick={(e)=>props.onDownload()} />
   <MenuOption 
      icon={<AiOutlineDelete size={20} />} 
      text={"Delete"} 
      onClick={(e)=>props.onDelete()} />
  </div>
  {showMoveMenu?<MoveTargetContextMenu 
    ref={moveMenuRef}
    parentAnchor={{
        x: props.anchorPoint.x+150,
        y: props.anchorPoint.y+50
      }} handleMove={function (target: string): void {
        throw new Error("Function not implemented.");
      } }/>:<></>}
    </div>

   );
});



export interface MenuOptionInterface{
  icon:any;
  text:string;
  onClick:MouseEventHandler<HTMLDivElement>;
}
export function MenuOption(props:MenuOptionInterface){
  return (
    <div onClick={props.onClick} className="cursor-pointer hover:bg-gray-100 px-8 py-4 flex flex-row justify-start">
      {props.icon}
      <div className="w-2"></div>
      <label>{props.text}</label>
    </div>
  );
}