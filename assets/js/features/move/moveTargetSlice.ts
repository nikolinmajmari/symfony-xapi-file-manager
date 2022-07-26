import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import xapiClient from "../../api/client/xapi_fs_client";
import { Snapshot } from "../../api/resource/snapshot";
import { RootState } from "../../app/store";

export interface MoveTargetState{
    value:Snapshot;
    status: 'idle'|'loading'|'failed';
}

export const getSnapshot = createAsyncThunk(
    "moveTarget/getSnapshot",
    async (context:string)=>{
        const snapshot =  await xapiClient.getSnapshot(context);
        return snapshot;
    }
);

export const snapshotSlice = createSlice({
    name:"moveTarget",
    initialState:{ status:'idle',
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
    }},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getSnapshot.pending,(state,action)=>{
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

export const selectMoveTarget = (state:RootState)=>state.moveTarget;

export default snapshotSlice.reducer;