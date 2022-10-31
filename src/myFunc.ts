import {ComponentInternalInstance, getCurrentInstance} from "vue"

const test=true;
const ip = "localhost";
const port = "6324";
function getThis() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    return appContext.config.globalProperties
}
function clearAccountCookies(_ :any)
{
    _.remove("username");
    _.remove("password");
    _.remove("nickname");
}

function getCookies()
{
    return getThis().$cookies;
}

class comment
{
    id :number;
    food_id :number;
    user_id :number;
    content :string;
    rate :number;
    create_time :string;
    like_num :number;
    up :number;
    constructor(id:number,food_id:number,user_id:number,content:string,rate:number,create_time:string,like_num:number,
                up:number) {
        this.id=id;
        this.food_id=food_id;
        this.user_id=user_id;
        this.content=content;
        this.rate=rate;
        this.create_time=create_time;
        this.like_num=like_num;
        this.up=up;
    }
}


class topObject{
    id : number;
    name : string;

    constructor(id :number=-1,name :string= "null") {
        this.id=id;
        this.name=name;
    }
}

class topObjects{
    name : string;
    list : Array<topObject>;

    constructor() {
        this.name="";
        this.list = [];
    }
}


class food{
    id :number;
    name :string;
    acid :number;
    sweet :number;
    spicy :number;
    pepper :number;
    salt :number;
    supply_time :string;
    pic :any;
    description :string;
    constructor(id:number,name:string,acid:number,sweet:number,spicy:number,pepper:number,salt:number,supply_time:string
                ,pic:any,description :string) {
        this.id=id;
        this.name=name;
        this.acid=acid;
        this.sweet=sweet;
        this.spicy=spicy;
        this.pepper=pepper;
        this.salt=salt;
        this.supply_time=supply_time;
        this.pic=pic;
        this.description=description;
    }



}

class R
{
    code :number;
    message :string;
    data :object;
    constructor(receiveData :any)
    {
        this.code=receiveData.data.code;
        this.message=receiveData.data.message;
        this.data=receiveData.data.data;
    }

    success()
    {
        return this.code === 1;
    }
    getMessage()
    {
        return this.message;
    }


}

class UserAccount
{
    id :any;
    username :string;
    password :string;
    schoolId :number;
    birthYear :number;
    nickname :string;
    credit :number;

    constructor(username :string="",password :string="",schoolId :any=-1,birthYear :any=-1,nickname :string=""
                ,credit:number=0)
    {
        this.id=null;
        this.username=username;
        this.password=password;
        this.schoolId=schoolId;
        this.birthYear=birthYear;
        this.nickname=nickname;
        this.credit=credit;
    }


}

class Favor
{
    id : any;
    username: string;
    step1 : number[];
    step2 : number[];
    step3 : boolean[];
    step4 : number[];

    constructor(username:string,step1:number[],step2 : number[],step3 : boolean[],step4 : number[])
    {
        this.id=null;
        this.username=username;
        this.step1=step1;
        this.step2=step2;
        this.step3=step3;
        this.step4=step4;
    }


}

export {
    ip,port,getThis,R,UserAccount,Favor,clearAccountCookies,getCookies,topObject,test,topObjects

}
