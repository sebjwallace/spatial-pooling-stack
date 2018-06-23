
class Column{

    constructor(args){

        this.cells = []
        this.fieldSize = args.fieldSize

        for(var i = 0; i < args.nCells; i++)
            this.cells[i] = new Cell(args)

    }

    compute(input,x,y){

        const field = this.getField(input,x,y)
        let winner = {overlap:-Infinity,cell:null}

        for(var i = 0; i < this.cells.length; i++){
            this.cells[i].noisify()
            const overlap = this.cells[i].compute(field)
            if(overlap > winner.overlap)
                winner = {overlap,cell:this.cells[i]}
        }

        winner.cell.learn(field)

    }

    getField(input,x,y){

        const field = []
        const r = Math.floor(this.fieldSize/2)

        for(var yi = (y - r); yi <= (y + r); yi++){
            for(var xi = (x - r); xi <= (x + r); xi++){
                const isNull = input[yi] == null || input[yi][xi] == null
                field.push(isNull ? 0 : input[yi][xi])
            }
        }

        return field

    }

}