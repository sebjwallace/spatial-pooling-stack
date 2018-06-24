
class Layer{

    constructor(args){

        this.dist = Math.floor(args.inputSize / args.nColumns)
        this.nColumns = args.nColumns
        this.column = new Column(args)

    }

    compute(input){

        const output = []

        for(var x = 0; x < this.nColumns; x++)
            for(var y = 0; y < this.nColumns; y++)
                this.column.compute(input,(x+1)*this.dist,(y+1)*this.dist)

    }

}