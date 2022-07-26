import React, { useRef } from "react";
import "./App.css";
import Master from "./layout/Master";
import xapiClient from "./api/client/xapi_fs_client";
import { OutsideContext } from "./app/context";

function App() {
  const containerRef = useRef();
  return <div ref={containerRef} className="flex flex-1 overflow-hidden">
    <OutsideContext.Provider value={containerRef}>
    <Master />
    </OutsideContext.Provider>
  </div>;
}
export default App;