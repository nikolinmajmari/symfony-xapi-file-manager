import React from "react";
import { AiOutlineCloudDownload, AiOutlineDelete } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { MdDriveFileMoveOutline } from "react-icons/md";

export interface ContextMenuIPropsInterface {
  anchor: { x: number; y: number };
  show: boolean;
}

export default function FMSnapshotContextMenu({
  entryRef,
}: {
  entryRef: React.RefObject<HTMLDivElement>;
}) {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (e: MouseEvent) => {
    console.log("dispatching", e, entryRef.current, e.target);
    if (entryRef.current?.contains(e.target as Node)) {
      e.preventDefault();
      setAnchorPoint({ x: e.pageX, y: e.pageY });
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  const handleClick = () => setShowMenu(false);

  React.useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (showMenu) {
    return (
      <div
        className="context-menu w-60 bg-white shadow-xl rounded-xl text-gray-800 fixed m-0 p-0"
        style={{
          top: `${anchorPoint.y}px`,
          left: `${anchorPoint.x}px`,
        }}
      >
        <div className=" border-b border-gray-300 cursor-pointer hover:bg-gray-100 px-8 py-4 flex flex-row justify-start">
          <FiEye size={20} />
          <div className="w-2"></div>
          <label>Preview</label>
        </div>
        <div className="cursor-pointer hover:bg-gray-100 px-8 py-4 flex flex-row justify-start">
          <MdDriveFileMoveOutline size={20} />
          <div className="w-2"></div>
          <label>Move</label>
        </div>
        <div className="cursor-pointer hover:bg-gray-100 px-8 py-4 flex flex-row justify-start">
          <FiEye size={20} />
          <div className="w-2"></div>
          <label>View Details</label>
        </div>
        <div className="cursor-pointer hover:bg-gray-100 px-8 py-4 flex flex-row justify-start">
          <AiOutlineCloudDownload size={20} />
          <div className="w-2"></div>
          <label>Download</label>
        </div>
        <div className=" border-t border-gray-300 cursor-pointer hover:bg-gray-100 px-8 py-4 flex flex-row justify-start">
          <AiOutlineDelete size={20} />
          <div className="w-2"></div>
          <label>Delete</label>
        </div>
      </div>
    );
  }
  return <></>;
}
