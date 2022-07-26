import React from "react";
import {
  AiFillFile,
  AiFillFileExcel,
  AiFillFileImage,
  AiFillFilePdf,
  AiFillFilePpt,
  AiFillFileWord,
  AiFillFolder,
} from "react-icons/ai";
import xapiClient from "../../api/client/xapi_fs_client";
import { SnapshotEntry } from "../../api/resource/snapshot_entry";
import { useAppDispatch } from "../../app/hooks";
import { deleteSnapshot, getSnapshot } from "../../features/snapshot/snapshotSlice";
import SnapshotEntryContextMenu from "./context/SnapshotContextMenu";
export interface FMSnapshotEntryPropsInterface {
  entry: SnapshotEntry;
}

export function resolveIconOnFileType(type: string) {
  switch (type) {
    case "dir":
      return <AiFillFolder size={24} />;
    case "file":
      return <AiFillFile size={24} />;
    case "word":
      return <AiFillFileWord size={24} />;
    case "exel":
      return <AiFillFileExcel size={24} />;
    case "img":
      return <AiFillFileImage size={24} />;
    case "pdf":
      return <AiFillFilePdf size={24} />;
    case "ppt":
      return <AiFillFilePpt size={24} />;
    default:
      return <AiFillFile size={24} />;
  }
}

export function FMSnapshotEntry(props: FMSnapshotEntryPropsInterface) {
  const icon = resolveIconOnFileType(props.entry.mime||props.entry.type);
  const [selected, setSelected] = React.useState<boolean>(false);
  const entryRef = React.useRef<HTMLDivElement>(null);
  const onEntryClick = (e: MouseEvent) => {
    setSelected(entryRef.current?.contains(e.target as Node) ?? false);
  };
  const onClick = () => setSelected(false);

  React.useEffect(() => {
    document.addEventListener("click", onEntryClick);
    return () => {
      document.removeEventListener("click", onEntryClick);
    };
  }, []);
  

  /// state managemenet 

  const dispatch = useAppDispatch();

  const handleDelete = ()=>{
    setSelected(true);
    dispatch(deleteSnapshot(props.entry.id));
  };

  const handleGoDown = ()=>{
    dispatch(getSnapshot(props.entry.id));
  }

  return (
    <>
    <div
      className={`element grid grid-cols-11 py-3 border-gray-300 ${
        selected ? "bg-blue-100 border-b-0 border-blue-100" : "bg-white"
      }`}
      style={{ borderBottomWidth: "1px", borderTopWidth: "0" }}
      ref={entryRef}
    >
      <div className="col-span-1 px-2">#1</div>
      <div className="col-span-6 px-2 flex flex-row">
        {icon}
        <div className="w-2"></div>
        <label onClick={(e)=>handleGoDown()}>{props.entry.name}</label>
      </div>
      <div className="col-span-2 px-2">{props.entry.name}</div>
      <div className="col-span-2 px-2">{props.entry.name}</div>
      <SnapshotEntryContextMenu ref={entryRef} onDelete={handleDelete} onDownload={()=>xapiClient.downloadFile(props.entry.id)} />
    </div>
      </>
  );
}
