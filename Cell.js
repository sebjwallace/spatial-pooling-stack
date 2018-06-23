
class Cell{

    constructor(args){

        this.learningRate = args.learningRate || 0.02

        this.proximal = new Array(args.fieldSize**2).fill(1)
        this.distal = []

    }

    compute(input){

        let overlap = 0

        for(var i = 0; i < this.proximal.length; i++)
            overlap += Math.round(input[i]) == Math.round(this.proximal[i]) ? 1 : -1

        return overlap / this.proximal.length

    }

    learn(input){

        for(var i = 0; i < this.proximal.length; i++)
            this.proximal[i] += (input[i] - this.proximal[i]) * this.learningRate

    }

    noisify(){

        for(var i = 0; i < this.proximal.length; i++){
            this.proximal[i] += (Math.random() - 0.5) * 0.005
            this.proximal[i] = this.proximal[i] > 1 ? 1 : this.proximal[i]
            this.proximal[i] = this.proximal[i] < 0 ? 0 : this.proximal[i]
        }

    }

}