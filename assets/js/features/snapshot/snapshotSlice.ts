import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { act } from "react-dom/test-utils";
import xapiClient from "../../api/client/xapi_fs_client";
import { Snapshot } from "../../api/resource/snapshot";
import { SnapshotEntry } from "../../api/resource/snapshot_entry";
import { RootState,AppThunk } from "../../app/store";


export interface SnapshotState{
    value:Snapshot;
    status: 'idle'|'loading'|'failed';
}

const initialState:SnapshotState = {
    status:'idle',
    value: {
        ancestors:[],
        children:[],
        entry:{
            aTime:123,
            id:"",
            mTime:0,
            mime:"",
            type:"file",
            "name":"name"
        }
    }
};


export const createFolder = createAsyncThunk(
    'snapshot/createFolder',
    async (payload:{parent:string,folderName:string})=>{
        const newFolder = await xapiClient.createDirectory(payload.parent,payload.folderName);
        return newFolder;
    }
);

export const getSnapshot = createAsyncThunk(
    "snapshot/get",
    async (context:string)=>{
        const snapshot =  await xapiClient.getSnapshot(context);
        return snapshot;
    }
)

export const deleteSnapshot = createAsyncThunk(
    "snapshot/delete",
    async (context:string)=>{
        const entry = await xapiClient.deleteSnapshot(context);
        console.log("deleting",entry);
        return entry;
    }
) 

export const snapshotSlice = createSlice({
    name:"snapshot",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createFolder.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(createFolder.fulfilled,(state,action)=>{
            state.status = "idle";
            state.value.children.push(action.payload);
        })
        .addCase(createFolder.rejected,(state)=>{
            state.status = 'failed';
        })
        .addCase(deleteSnapshot.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(deleteSnapshot.rejected,(state)=>{
            state.status = 'failed';
        })
        .addCase(deleteSnapshot.fulfilled,(state,action)=>{
            state.status = "idle";
            state.value.children = [...state.value.children.filter(e=>e.name!==action.payload.name)]
            console.log("deleting",state,action);
        })
        .addCase(getSnapshot.pending,(state,action)=>{
            state.status = 'loading';
        })
        .addCase(getSnapshot.rejected,(state)=>{
            state.status = "failed";
        })
        .addCase(getSnapshot.fulfilled,(state,action)=>{
            state.status = "idle";
            state.value.children = [...action.payload.children];
            state.value.entry = {...action.payload.entry};
            state.value.ancestors = [...action.payload.ancestors];
        })
    }
});

export const selectSnapshot = (state:RootState)=>state.snapshot;

export default snapshotSlice.reducer;