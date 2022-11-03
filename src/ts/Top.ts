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

export {topObjects,topObject}
