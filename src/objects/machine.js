import Reel from './reel'

export default class Machine{
    constructor(scene, x, y, config, payTable) {        
        this.config = config.machine
        this.scene = scene

        this.x = x - this.config.width / 2
        this.y = y - this.config.height / 2

        this.reelsCount = this.config.reelsCount
        this.reelsCount = this.config.reelsCount
        this.payTable = payTable
        this.reels = []
        this.result = [[],[],[]]
        this.winLines = []

        this._addElements(scene, config)
    }
    
    _addElements(scene, config){        

        scene.add.sprite(
            this.x + this.config.width + 70, 
            this.y + 70, 
            this.config.atlasName, 
            this.config.sprites.right)
            .setOrigin(0.5)            

        scene.add.sprite(
            this.x + 15, 
            this.y + this.config.height - 35, 
            this.config.atlasName, 
            this.config.sprites.left)
            .setOrigin(0.5)

        scene.add.sprite(
            this.x, this.y, 
            this.config.atlasName, 
            this.config.sprites.bottom)
            .setOrigin(0)

        this._fillWithReels(scene, this.reelsCount, config)    
        
        scene.add.sprite(
            this.x, this.y, 
            this.config.atlasName, 
            this.config.sprites.top)
            .setOrigin(0)
    }

    _fillWithReels( scene, count, config){
        let x = this.x + this.config.reelsFirstOffset
        let y = this.y + this.config.height / 2
        
        for(let i=0; i<count; i++){
            if(i) x += ( config.reel.width + this.config.reelsOffset )
            this.reels.push( new Reel(scene, x, y, config.reel, config.slots) )
        }
    }

    startSpin(){
        this.locked = true
        this.reels.forEach( (reel) => reel.startSpin() )
        setTimeout(()=> this._stopSpin(), this.config.stopDelay)
    }

    _stopSpin(){
        setTimeout(()=> this._finish(), 
            this.config.reelStopDelay * this.reels.length)

        this.reels.forEach( (reel, i) => reel.stopSpin( this.resultSlots[i], 
            this.config.reelStopDelay * i ) )
    }

    _finish(){
        this.locked = false
        this.reels.forEach( (reel,i) => {
            this.result[0][i] = reel.result[3]
            this.result[1][i] = reel.result[2]
            this.result[2][i] = reel.result[1]
        } )

        this._checkWinCombinations()
    }

    _checkWinCombinations(){
        this.winSum = 0
        this.result.forEach((line, i) => {
            if((line[0] == line[1]) && (line[0] == line[2])){                
                if(this.payTable.combinationOf3[line[0]]){
                    console.log(`${i} line win ${this.payTable.combinationOf3[line[0]][i]}`)
                    this.winLines[i] = this.payTable.combinationOf3[line[0]][i]
                    this.winSum += this.payTable.combinationOf3[line[0]][i]
                    this._highlight(i)
                }
            }else{
                this.payTable.onlyThisSlotsCombination.forEach((combination, j) => {
                    let win = true

                    if( combination[0].indexOf(line[0]) == -1 ) win = false
                    if( combination[0].indexOf(line[1]) == -1 ) win = false
                    if( combination[0].indexOf(line[2]) == -1 ) win = false
                    
                    if(win){
                        console.log(`${i} line win ${this.payTable.onlyThisSlotsCombination[j][1]}`)
                        this.winLines[i] = this.payTable.onlyThisSlotsCombination[j][1]
                        this.winSum += this.payTable.onlyThisSlotsCombination[j][1]
                        this._highlight(i)
                    }
                })
            }
        })
    }

    _highlight(line){ 
        let y = this.y + 80,
            height = 100  

        let graphics = this.scene.add.graphics({ 
            fillStyle: { color: 0xe41c27, alpha: 0.5 }, 
            lineStyle: { width: 5, color: 0xbc8b26 }
        })
        graphics.fillRoundedRect(
            this.x + 28,
            y + height * line,
            this.config.width - 60,
            10,
            5)
        
        this.scene.tweens.add({
            targets: graphics,
            alpha: 0.5,
            ease: 'Linear',
            duration: 500,
            repeat: 2,
            yoyo: true,
            onComplete: () => graphics.destroy()
        });
    }
    
    setResultSlots(resultSlots){
        this.resultSlots = resultSlots
    }
}