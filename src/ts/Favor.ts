import qs from "qs";

class Favor
{
    id : any;
    taste : string | number[];
    preference : string | number[];
    meals : string | number[];

    constructor(taste:number[],preference : number[],meals : number[],stringify:boolean=false)
    {
        this.id=null;
        if (stringify)
        {

            this.taste=qs.stringify(taste);
            this.preference=qs.stringify(preference);
            this.meals=qs.stringify(meals);
        }
        else
        {
            this.taste=taste;
            this.preference=preference;
            this.meals=meals;
        }
    }


}
export {Favor}
