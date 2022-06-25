import { AxiosInstance } from "axios";
import axios from "axios";

export interface XapiFSManagerConfig{
    client: AxiosInstance
}
declare global {
    interface Window {
      xapiFSManager:XapiFSManagerConfig
    }
}
/**
 * @type{{XapiFsManagerConfig}}
 */
var config = {
    client: axios.create({})
};
window.xapiFSManager = config;