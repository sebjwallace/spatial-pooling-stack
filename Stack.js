
class Stack{

    constructor(args){

        this.layers = []

        for(var i = 0; i < args.nLayers; i++)
            this.layers[i] = new Layer(args)

    }

    compute(input){

        this.layers[0].compute(input)

    }

}