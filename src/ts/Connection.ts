import axios from "axios";
import {Base64} from "js-base64";
const ip = "10.107.2.58";
const port = "6324";

async function get(kind :string,method :string,data :string="",token :string='-1',autoBase64 :boolean=false) {
    if (autoBase64)
    {
        return await axios.get("http://" + ip + ":" + port + "/api/" + kind + "/" + method, Base64.encode(data),
            {headers:{'Content-Type': 'application/json','userToken':token}});
    }
    else
    {
        return await axios.get("http://" + ip + ":" + port + "/api/" + kind + "/" + method, data,
            {headers:{'Content-Type': 'application/json','userToken':token}});
    }
}
async function post(kind: string, method: string, data: string = "",token :string='hehe', autoBase64: boolean = false) {
    if (autoBase64)
    {
        return await axios.post("http://" + ip + ":" + port + "/api/" + kind + "/" + method, Base64.encode(data),
            {headers:{'Content-Type': 'application/json','userToken':token}}

    );
    }
    else
    {
        return await axios.post("http://" + ip + ":" + port + "/api/" + kind + "/" + method, data,
            {headers:{'Content-Type': 'application/json','userToken':token}});
    }
}
export {get,post}
