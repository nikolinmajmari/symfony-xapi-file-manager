import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { uploadToSnapshot } from '../../features/snapshot/snapshotSlice';

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};



export function FileUploadModal({
  setShowModal,
  showModal,
}: {
  setShowModal: (b: boolean) => void;
  showModal: boolean;
}) {
  /// modal 
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
  const modalRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  /// modal end 


  /// dropzone 
  const {
    getRootProps,
    getInputProps,
    isFocused,
    acceptedFiles,
    isDragAccept,
    isDragReject
  } = useDropzone();
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);  
  const files:any = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));
  /// end dropzone 

  /// upload 
  const context = useAppSelector(e=>e.snapshot.value.entry.id);
  const dispatch = useAppDispatch();
  const handleFileUpload = async () => {
    const formData = new FormData();
    const files = acceptedFiles;
   files.forEach(file => {
    formData.append("file", file);
   });
    setShowModal(false);
    dispatch(uploadToSnapshot({
      context,
      data:formData
    }))
  };
  /// upload end 
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
              <div className="container">
                <div {...getRootProps({style})}>
                  <input {...getInputProps()} multiple/>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                   </div>
                   <div>
                      <h2>Files</h2>
                      <ul>{files}</ul>
                   </div>
                  </div>
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
                onClick={() => handleFileUpload()}
              >
                Upload Files 
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}