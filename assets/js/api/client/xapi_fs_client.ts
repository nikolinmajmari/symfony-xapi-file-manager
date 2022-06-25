import { Snapshot } from "../resource/snapshot";
import { SnapshotEntry } from "../resource/snapshot_entry";
import "./client";
const client = window.xapiFSManager.client;

interface XapiFSClientInterface{
    getSnapshot(context:string|undefined):Promise<Snapshot>;
    createDirectory(context:string,name:string):Promise<SnapshotEntry>;
    downloadFile(context:string):Promise<void>;
    deleteSnapshot(context:string):Promise<SnapshotEntry>;
}

const host = window.location.host;

const xapiClient:XapiFSClientInterface =   {
    async createDirectory(context,name): Promise<SnapshotEntry> {
        const resposne = await client.post(
            `/snapshot/create_dir?context=${context}&name=${name}`,
            {},{});
        if(resposne.status==200){
            return resposne.data.data as SnapshotEntry;
        }else{
            throw "An error occured";
        }
    },
    async downloadFile(context){
       window.open(`/snapshot/download?context=${context}`);
    },
    async getSnapshot(context):Promise<Snapshot> {
        const response = await client.get(
            `/snapshot?context=${context}`,{}
        );
        if(response.status == 200){
            return response.data.data as Snapshot;
        }
        throw "An error occured";
    },
    async deleteSnapshot(context):Promise<SnapshotEntry>{
        const response = await client.delete(
            `/snapshot/delete?context=${context}`,{}
        );
        if(response.status == 200){
            return response.data.data as SnapshotEntry;
        }
        throw "An error occured";
    }
};

export default xapiClient;