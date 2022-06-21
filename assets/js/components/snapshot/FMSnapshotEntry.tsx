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
import { FSSnapshotEntry } from "../../api/resource/fs_snapshot_entry";
import FMSnapshotContextMenu from "./FMSnapshotContextMenu";
export interface FMSnapshotEntryPropsInterface {
  entry: FSSnapshotEntry;
}

export function resolveIconOnFileType(type: string) {
  switch (type) {
    case "Folder":
      return <AiFillFolder size={24} />;
    case "File":
      return <AiFillFile size={24} />;
    case "Word":
      return <AiFillFileWord size={24} />;
    case "Exel":
      return <AiFillFileExcel size={24} />;
    case "Image":
      return <AiFillFileImage size={24} />;
    case "Pdf":
      return <AiFillFilePdf size={24} />;
    case "Ppt":
      return <AiFillFilePpt size={24} />;
    default:
      return <AiFillFile size={24} />;
  }
}

export function FMSnapshotEntry(props: FMSnapshotEntryPropsInterface) {
  const icon = resolveIconOnFileType(props.entry.mime);
  const [selected, setSelected] = React.useState<boolean>(false);
  const entryRef = React.useRef<HTMLDivElement>(null);
  const onEntryClick = (e: MouseEvent) => {
    setSelected(entryRef.current?.contains(e.target as Node) ?? false);
  };
  const onClick = () => setSelected(false);

  React.useEffect(() => {
    document.addEventListener("contextmenu", onEntryClick);
    document.addEventListener("click", onEntryClick);
    return () => {
      document.removeEventListener("contextmenu", onEntryClick);
      document.removeEventListener("click", onEntryClick);
    };
  }, []);
  return (
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
        <label>{props.entry.name}</label>
      </div>
      <div className="col-span-2 px-2">{props.entry.name}</div>
      <div className="col-span-2 px-2">{props.entry.name}</div>
      <FMSnapshotContextMenu entryRef={entryRef} />
    </div>
  );
}
