
class Stack{

    constructor(args){

        this.layers = []

        for(var i = 0; i < args.nLayers; i++)
            this.layers[i] = new Layer(args)

    }

    compute(input){

        var l1 = this.layers[0].compute(input)

    }

}