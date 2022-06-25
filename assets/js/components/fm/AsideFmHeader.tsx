import React from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { useAppDispatch } from "../../app/hooks";
import { createFolder } from "../../features/snapshot/snapshotSlice";
import { IconButton } from "../buttons/IconButton";
export function AsideFMHeader() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="action-field flex flex-row flex-wrap justify-end items-start">
      <div onClick={() => setShowModal(true)}>
        <IconButton icon={<AiFillFolderAdd size={24} />} text="New Folder" />
      </div>
      {showModal ? (
        <NewFolderModal showModal={showModal} setShowModal={setShowModal} />
      ) : (
        <></>
      )}
      <div className="mx-1"></div>
      <IconButton icon={<AiFillFolderAdd size={24} />} text="Upload Files" />
    </div>
  );
}

export function NewFolderModal({
  setShowModal,
  showModal,
}: {
  setShowModal: (b: boolean) => void;
  showModal: boolean;
}) {
  const clickHandler = (e: MouseEvent) => {
    if (modalRef.current?.contains(e.target as Node)) {
      return;
    } else if (overlayRef.current?.contains(e.target as Node)) {
      return setShowModal(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  const [newFolderName,setNewFolderName] = React.useState<string>("");
  const modalRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const handleCreateFolder = async () => {
    dispatch(createFolder({
      parent:"",
      folderName:newFolderName
    }));
    setNewFolderName("");
    setShowModal(false);
  };
  return (
    <>
      <div
        ref={overlayRef}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div
            ref={modalRef}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h4 className="text-3xl font-semibold">New Folder</h4>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  value={newFolderName}
                  onChange={(e)=>setNewFolderName(e.target.value)}
                  type="text"
                  placeholder="New Folder Name"
                />
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleCreateFolder()}
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
