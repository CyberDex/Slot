import { GameObjects } from 'phaser'
import Slot from './slot'

export default class DragSlot extends Slot {
    constructor(scene, x, y, slots, slot = null) {
        super(scene, x, y, slots, slot)
        this.setScale(0.5)
        this.setOrigin(0.5)

        this.defaultX = x
        this.defaultY = y

        this.setInteractive()
        this.scene.input.setDraggable(this)
    }

    reset(){
        this.x = this.defaultX
        this.y = this.defaultY
    }
}