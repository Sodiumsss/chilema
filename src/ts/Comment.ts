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


export {
    comment
}
