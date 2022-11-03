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

function getResult(data:any)
{
    return new R(data);
}

export {getResult}
