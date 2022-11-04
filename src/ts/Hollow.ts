import * as Connection from "@/ts/Connection";

class HollowThread{
    id :any;
    userId :number;
    senderName :string;
    title :string;
    text :string;
    click :number;
    edit :number;
    reply :number;
    createTime :any;
    updateTime :any;


    constructor(id :any=null,userid :number=-1,senderName :string="",title :string="",
                click :number=0,edit :number=0,reply:number=0,createTime :any=null
                ,text :string="",updateTime :any=null)
    {
        this.id=id;
        this.userId=userid;
        this.title=title;
        this.click=click;
        this.reply=reply;
        this.edit=edit;
        this.senderName=senderName;
        this.text=text;
        this.createTime=createTime;
        this.updateTime=updateTime;
    }

    post()
    {
        const json=JSON.stringify(this);
        return Connection.post("hollow","post",json);
    }


}
function getHollow(page :number)
{
    const json=JSON.stringify(page);
    return Connection.post("hollow","get",json);
}
export {getHollow,HollowThread}
