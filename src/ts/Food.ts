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
    constructor(id:number=-1,name:string="",acid:number=-1,sweet:number=-1,spicy:number=-1,pepper:number=-1
                ,salt:number=-1,supply_time:string=""
        ,pic:any="",description :string="") {
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
export {food}
