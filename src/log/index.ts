import axios from "axios";
import { getUserID } from "../ClientSide/Functions";

async function log(logType: number, Description: string) {
    console.log(logType, Description);
    
    // const url = `http://localhost:8080/api/v1/log/`;
    // const param = {
    //     "IDLogType": logType,
    //     "IDUser": getUserID(),
    //     "Description": Description
    // };
    // await axios.post(url, param);
}

const logger = {
    error: (Description: string) => log(1, Description),
    info: (Description: string) => log(2, Description),
    access: (Description: string) => log(3, Description),
    request: (Description: string) => log(4, Description),
    update: (Description: string) => log(5, Description)
};

export default logger;
