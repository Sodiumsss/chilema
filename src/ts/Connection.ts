import axios from "axios";
import {Base64} from "js-base64";
const ip = "localhost";
const port = "6324";

async function get(kind :string,method :string,data :string="",autoBase64 :boolean=false) {
    if (autoBase64)
    {
        return await axios.get("http://" + ip + ":" + port + "/api/" + kind + "/" + method, Base64.encode(data));
    }
    else
    {
        return await axios.get("http://" + ip + ":" + port + "/api/" + kind + "/" + method, data);
    }
}
async function post(kind: string, method: string, data: string = "", autoBase64: boolean = false) {
    if (autoBase64)
    {
        return await axios.post("http://" + ip + ":" + port + "/api/" + kind + "/" + method, Base64.encode(data),
            {headers:{'Content-Type': 'application/json'}}

    );
    }
    else
    {
        return await axios.post("http://" + ip + ":" + port + "/api/" + kind + "/" + method, data,
            {headers:{'Content-Type': 'application/json'}});
    }

}

// post("user","test").then((res)=>{
//
//
//
// })


export {get,post}
