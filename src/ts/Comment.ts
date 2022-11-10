import * as Connection from "@/ts/Connection";

class comment
{
    id :string;
    foodId :number;
    userId :number;
    content :string;
    rate :number;

    likeNum :number;
    senderName :string
    up :number;
    constructor(foodId:number=-1,userId:number=-1,content:string="",
                rate:number=-1,senderName:string ="",likeNum:number=0,
                up:number=-1,id:any=null) {
        this.id=id;
        this.foodId=foodId;
        this.userId=userId;
        this.senderName=senderName;
        this.content=content;
        this.rate=rate;
        this.likeNum=likeNum;
        this.up=up;
    }
}

class commentContentWithRate
{
    content :string;
    rate : number;

    constructor(content :string ,rate :number)
    {
        this.content=content;
        this.rate=rate;
    }

}


function getCommentList(foodId : string,token:string)
{
    const json=JSON.stringify(foodId);
    return Connection.post("comment","get",json,token);
}
function sendComment(object : comment,token:string)
{
    const json=JSON.stringify(object);
    return Connection.post("comment","add",json,token);
}
function deleteMyselfComment(foodId :any,token:string)
{
    const json=JSON.stringify(foodId);

    return Connection.post("comment","deleteMyself",json,token);
}
export {
    comment,getCommentList,commentContentWithRate,sendComment,deleteMyselfComment
}
