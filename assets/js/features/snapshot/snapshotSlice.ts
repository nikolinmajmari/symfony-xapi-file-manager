import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { act } from "react-dom/test-utils";
import { FSSnapshot } from "../../api/resource/fs_snapshot";
import { FSSnapshotEntry } from "../../api/resource/fs_snapshot_entry";
import { RootState,AppThunk } from "../../app/store";


export interface SnapshotState{
    value:FSSnapshot;
    status: 'idle'|'loading'|'failed';
}

const initialState:SnapshotState = {
    status:'idle',
    value: {
        ancestors:[],
        childrens:[],
        id:"/",
        name:"root",
        mime:"Folder",
        parent:"/",
        path:"/",
        tags:[],
        type:"folder"
    }
};


export const createFolder = createAsyncThunk(
    'snapshot/createFolder',
    async (parent:string)=>{
        console.log("creating folder");
        return {
            id:parent,
            name:"name",
            parent:parent,
             mime:"Folder",
            path:"/name",
            tags:[],
            type:"folder",
        } as FSSnapshotEntry;
    }
);

export const deleteSnapshot = createAsyncThunk(
    "snapshot/delete",
    async (id:string)=>{
        console.log("DELETING SNAPSHOT");
        return {
            id:id,
        }
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
            state.value.childrens.push(action.payload);
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
            state.value.childrens = [...state.value.childrens.filter(e=>e.id!==action.payload.id)]
        })
    }
});

export const selectSnapshot = (state:RootState)=>state.snapshot;

export default snapshotSlice.reducer;