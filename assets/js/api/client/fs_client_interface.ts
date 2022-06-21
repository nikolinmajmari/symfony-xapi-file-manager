import { FSSnapshot } from "../resource/fs_snapshot";

export interface FSClientInterface{
    /**
     * 
     * @param id 
     */
    getSnapshot(id:string):FSSnapshot;
    /**
     * 
     * @param parent 
     */
    createDirectory(parent:string):void;
    
    /**
     * 
     * @param id 
     */
    getSnapshotData(id:string):any;

    /**
     * 
     * @param id 
     */
    getSnapshotCompressed(id:string):any;

    /**
     * 
     * @param id 
     */
    deleteSnapshot(id:string):void;

    /**
     * 
     * @param id 
     * @param parent 
     */
    moveSnapshot(id:string,parent:string):void;

    /**
     * 
     * @param id 
     */
    uploadIntoSnapshot(id:string):void;

    /**
     * 
     * @param id 
     */
    downloadSnapshot(id:string):void;

    /**
     * 
     * @param id 
     */
    removeSnapshotTag(id:string):void;

    /**
     * 
     * @param id 
     */
    addSnapshotTag(id:string):void;
}