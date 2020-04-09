import { GameObjects } from 'phaser'
import Slot from './slot'
import DragSlot from './dragSlot'

export default class DebugBar extends GameObjects.Container {
    constructor(scene, config) {        
        super(scene, 0, config.size.height)
        
        scene.add.existing(this)

        this.debugSlots = [[0,0,0],[0,0,0],[0,0,0]]

        this.scene = scene  
        this.gameConfig = config
        this.config = config.debugBar
        this.fixedMode = false
        
        this.setSize(this.config.width, this.config.height)

        this._addBG()
        this._addSwitchers()
        this._addSlotSelector()
        this._addDropZones()
    }

    _addBG(){
        this.add( 
            this.scene.add.sprite(
                0, 0, 
                this.config.bg.atlas,
                this.config.bg.sprite)
                .setOrigin(0) 
        )
    }

    _addSwitchers(){
        this.tableSwitcher = this.scene.add.bitmapText(
            15,
            this.gameConfig.size.height - 30,
            'freedom', 
            this.config.switcherText[0], 
            20
        )
        .setInteractive()
        .on('pointerup', () => this._showToggle() )
        this.tableSwitcher.input.hitArea.setSize(80, 27)

        this.modeSwitcher = this.scene.add.bitmapText(
            this.width / 2, 90, 'freedom', 
            this.config.switcherText[2]+': '+this.config.switcherText[3],
            20
        )
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerup', () => this._switchMode() )
        this.add(this.modeSwitcher)      
    }

    _switchMode(){
        if(this.fixedMode){
            this.fixedMode = false
            this.modeSwitcher.setText(this.config.switcherText[2]+': '+this.config.switcherText[3])
            this.resetSlotSelector()
        }else{
            this.fixedMode = true
            this.modeSwitcher.setText(this.config.switcherText[2]+': '+this.config.switcherText[4])
        }
    }

    _showToggle(){
        let blockPosY
        
        if(this.y == this.gameConfig.size.height){
            blockPosY = this.gameConfig.size.height - this.height
            this.tableSwitcher.setText(this.config.switcherText[1])
        } else {            
            blockPosY = this.gameConfig.size.height
            this.tableSwitcher.setText(this.config.switcherText[0])
        }

        this.scene.tweens.add({
            targets: this,
            y: blockPosY,
            ease: 'Cubic',
            duration: 300,
            repeat: 0,
            yoyo: false
        })
    }

    _addSlotSelector(){
        this.dragSlots = []
        let slots = this.gameConfig.game.slots,
            x = 25,
            y = 73
        slots.slotsList.forEach((sprite, i)=> {
            for( let j=0; j<this.gameConfig.game.machine.reelsCount; j++){
                let dragSlot = new DragSlot(this.scene, 80 * i + 80, 40, slots, sprite)
                this.add( dragSlot )
                this.dragSlots.push(dragSlot)
            }
        })
    }

    resetSlotSelector(){
        this.debugSlots = [[0,0,0],[0,0,0],[0,0,0]]
        this.dragSlots.forEach((dragSlot) => dragSlot.reset() )
    }

    _addDropZones(){        
        this.config.dropZones.forEach((reel, i)=>{
            reel.forEach((zone, j)=>{
                this._createDropZone( zone[0], this.height - zone[1], 40, i, j)
            })
        })

        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX
            gameObject.y = dragY
        })
        this.scene.input.on('drop', (pointer, gameObject, dropZone) => {
            gameObject.x = dropZone.x
            gameObject.y = dropZone.y

            if(dropZone.previousSlot) dropZone.previousSlot.reset()
            dropZone.previousSlot = gameObject
            
            if(gameObject.frame.name){
                this.fixedMode = true
                this.modeSwitcher.setText(this.config.switcherText[2]+': '+this.config.switcherText[4])
                this.debugSlots[dropZone.reel][dropZone.slot] = gameObject.frame.name
            }
        })
        this.scene.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped){
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })
    }

    _createDropZone(x, y, radius = 40, reel, slot){
        let zone = this.scene.add.zone(x,y).setCircleDropZone(radius)
        zone.input.dropZone = true
        zone.reel = reel
        zone.slot = slot
        this.add(zone)

        //  Just a visual display of the drop zone
        // let graphics = this.scene.add.graphics();
        // graphics.lineStyle(2, 0xffff00);
        // graphics.strokeCircle(zone.x, zone.y, zone.input.hitArea.radius);
        // this.add(graphics)
    }
}