import { GameObjects, Utils } from 'phaser'

export default class Slot extends GameObjects.Sprite {
    constructor(scene, x, y, slots, slot = null) {
        super(scene, x, y, slots.atlasName)
        this._init(slots, slot)
    }

    _init(slots, slot){        
        this.setOrigin(0.5, 1)
        this.setScale(0.85)

        this.slots = slots.slotsList

        this.update(slot)
    }

    update(slot){
        if( !slot ) slot = Utils.Array.GetRandom(this.slots)
        this.setFrame( slot )
        return slot
    }
}