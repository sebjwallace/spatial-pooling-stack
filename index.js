// cd C:\Program Files (x86)\Google\Chrome\Application
// chrome.exe --disable-web-security --allow-file-access-from-files

const createContext = canvasSize => {
    const canvas = document.createElement('canvas')
    canvas.height = canvas.width = canvasSize
    document.body.appendChild(canvas)
    return canvas.getContext('2d')
}

const loadImage = (id,canvasSize) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = document.getElementById(id)
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img,0,0)
    const data = ctx.getImageData(0,0,img.width,img.height).data
    var i = 0
    const grid = []
    for(var y = 0; y < canvasSize; y++){
        grid[y] = []
        for(var x = 0; x < canvasSize; x++){
            i+=4
            if(!isNaN(data[i]))
                grid[y][x] = (data[i] / 255)
        }
    }
    return grid
}

var fieldSize = 3
var stack = new Stack({nLayers:2,inputSize:28,nColumns:28,nCells:12,fieldSize,noiseLevel:0.002})

var ctx = createContext(800)

var cell = stack.layers[0].column.cells[0]

setInterval(() => {

    var d = Math.floor(Math.random() * 4)
    var r = Math.floor(Math.random() * 3)
    var input = loadImage(d+'.'+r,28)

    ctx.clearRect(0,0,800,800)

    for(var cx = 0; cx < input.length; cx++){
        for(var cy = 0; cy < input[cx].length; cy++){
            ctx.fillStyle = 'rgba(0,0,0,'+(input[cy][cx])+')'
            ctx.fillRect((cx*2)+350,(cy*2)+10,2,2)
        }
    }

    stack.compute(input)

    var size = 2
    var dist = stack.layers[0].dist
    var nColumns = stack.layers[0].nColumns
    var column = stack.layers[0].column
    for(var cx = 0; cx < nColumns; cx++){
        for(var cy = 0; cy < nColumns; cy++){
            var field = column.getField(input,cx*dist,cy*dist)
            var cells = column.cells
            for(var i = 0; i < cells.length; i++){
                var overlap = cells[i].compute(field)
                ctx.fillStyle = 'rgba(0,0,0,'+(overlap)+')'
                ctx.fillRect(((cx)*size)+(i*58)+10,((cy)*size)+80,size,size)
            }
        }
    }

    for(var i = 0; i < column.cells.length; i++){
        var cell = column.cells[i]
        for(var x = 0; x < fieldSize; x++){
            for(var y = 0; y < fieldSize; y++){
                var w = cell.proximal[(x*fieldSize)+y]
                ctx.fillStyle = 'rgba(0,0,0,'+(w)+')'
                ctx.fillRect((y*5)+(i*58)+28,(x*5)+140,5,5)
            }
        }
    }

},100)