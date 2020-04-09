import { GameObjects } from 'phaser'
import Slot from './slot'

export default class Reel extends GameObjects.Container {
    constructor(scene, x, y, config, slots) {
        super(scene, x, y - config.height / 2)

        this.scene = scene
        scene.add.existing(this)

        this._init(scene, config, slots)
    }

    _init(scene, config, slots){

        this.slotSize = config.slotSize
        this.slotsCount = config.slotsCount
        this.speed = config.speed
        this.stopDelay = config.stopDelay

        this.updSlotCount = 0
        this.slowdown = false
        this.resultSlots = []
        this.result = []

        this.setSize(config.width, config.height)        

        this._createMask(scene)
        this._fillWithSlots(scene, config.slotsCount, slots)
    }

    _createMask( scene ){
        let shape = scene.make.graphics()
        shape.fillRect(this.x, this.y, this.width, this.height)
        let mask = shape.createGeometryMask()        
        this.setMask(mask)
    }

    _fillWithSlots( scene, count, slots ){
        let x = this.width / 2
        let y = this.slotSize
        for(let i=0; i<=count; i++){
            this.add( new Slot(scene, x, y * i, slots) )
        }
    }

    _move(slot){
        slot.y += this.speed

        if(slot.y == this.slotSize * 4){
            let updateVal

            if( this.slowdown ){
                if(this.resultSlots[ this.updSlotCount ])
                    updateVal = this.resultSlots[ this.updSlotCount ]
                
                this.updSlotCount++
                
                if(this.updSlotCount > this.slotsCount){
                    this.rotating.remove()
                    this.slowdown = false
                    this.updSlotCount = 0
                }
            }

            this.result[ this.updSlotCount ] = slot.update(updateVal)
            slot.y = 0
        }
    }
    
    startSpin(){
        this.rotating = this.scene.time.addEvent({
            delay: 10,
            callback: this.spin,
            callbackScope: this,
            loop: true
        })
    }

    spin(){
        this.iterate(( slot ) => this._move( slot ))        
    }

    stopSpin(resultSlots, stopDelay){   
        
        this.resultSlots[0] = resultSlots[2] ? resultSlots[2] : 0
        this.resultSlots[1] = resultSlots[1] ? resultSlots[1] : 0
        this.resultSlots[2] = resultSlots[0] ? resultSlots[0] : 0
        
        setTimeout(()=> this.slowdown = true, stopDelay)
    }
    
}