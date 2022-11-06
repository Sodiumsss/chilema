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
    clicks :any;
    createTime :any;
    updateTime :any;
    beLike :any;

    constructor(id :any=null,userid :any=null,senderName :string="",title :string="",
                edit :any=0,likes :any=0,reply:any=0,createTime :any=null
                ,text :any="",updateTime :any=null,clicks :any=0,beLike :any=false)
    {
        this.id=id;
        this.userId=userid;
        this.title=title;
        this.reply=reply;
        this.edit=edit;
        this.senderName=senderName;
        this.text=text;
        this.clicks=clicks;
        this.likes=likes;
        this.createTime=createTime;
        this.updateTime=updateTime;
        this.beLike=beLike;
    }

    post(token :string)
    {
        const json=JSON.stringify(this);
        return Connection.post("hollow","post",json,token);
    }


}
class UserHollowText {
    userID :number;
    threadID :number;
    text :string;
    senderName :string
    constructor(u:any,tid:any,t:any,n:any) {
        this.userID=u;
        this.threadID=tid;
        this.text=t;
        this.senderName=n;
    }
}

class UserIDWithHollowID
{
    hollowID:any;
    userID:any;
    constructor(h:any,i:any)
    {
        this.hollowID=h;
        this.userID=i;
    }
}

class HollowReply
{
    id :number;
    replyId:number;
    threadId:number;
    createTime:string;
    text:string;
    senderName:string;
    constructor(id :number,replyId:number,threadId:number,createTime:string,text:string,senderName:string)
    {
        this.id=id;
        this.replyId=replyId;
        this.threadId=threadId;
        this.text=text;
        this.senderName=senderName;
        this.createTime=createTime;
    }
}

class HollowThreadWithReply
{
    hollowThread:HollowThread;
    hollowReplyList:HollowReply[];
    constructor(hollowThread:any=null,hollowReplyList:any=null)
    {
        this.hollowThread=hollowThread;
        this.hollowReplyList=hollowReplyList;
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

function setLike(object :UserIDWithHollowID, token:string)
{
    const json=JSON.stringify(object);
    return Connection.post("hollow","setLike",json,token);
}

function cancelLike(object :UserIDWithHollowID, token:string)
{
    const json=JSON.stringify(object);
    return Connection.post("hollow","cancelLike",json,token);
}

function getSingleHollow(object :UserIDWithHollowID, token:string)
{
    const json=JSON.stringify(object);
    return Connection.post("hollow","getSingleHollow",json,token);
}

function reply(object :UserHollowText, token:string)
{
    const json=JSON.stringify(object);
    return Connection.post("hollow","reply",json,token);
}
export {HollowReply,HollowThreadWithReply,reply,UserHollowText,setLike,cancelLike,UserIDWithHollowID
    ,getSingleHollow,getHollowByDesc,HollowThread,getHollowByAsc}
