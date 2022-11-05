import * as Connection from "@/ts/Connection";

class HollowThread{
    id :any;
    userId :number;
    senderName :string;
    title :string;
    text :string;
    edit :number;
    likes :number;
    reply :number;
    createTime :any;
    updateTime :any;


    constructor(id :any=null,userid :any=null,senderName :string="",title :string="",
                edit :any=0,likes :any=0,reply:any=0,createTime :any=null
                ,text :any="",updateTime :any=null)
    {
        this.id=id;
        this.userId=userid;
        this.title=title;
        this.reply=reply;
        this.edit=edit;
        this.senderName=senderName;
        this.text=text;
        this.likes=likes;
        this.createTime=createTime;
        this.updateTime=updateTime;
    }

    post(token :string)
    {
        const json=JSON.stringify(this);
        return Connection.post("hollow","post",json,token);
    }


}
function getHollowByDesc(page :number, token:string)
{
    const json=JSON.stringify(page);
    return Connection.post("hollow","getHollowByDesc",json,token);
}
function getHollowByAsc(page :number, token:string)
{
    const json=JSON.stringify(page);
    return Connection.post("hollow","getHollowByAsc",json,token);
}
export {getHollowByDesc,HollowThread,getHollowByAsc}
