import { Scene } from 'phaser'
import { config } from '../config'

export default class PreloadScene extends Scene {
    constructor() { super({ key: 'Preload' }) }

    preload() {
        this.load.atlas('atlas', 
            `./assets/${config.size.grafics}.png`, 
            `./assets/${config.size.grafics}.json`)

        this.load.bitmapFont('freedom', 
            './assets/font.png', 
            './assets/font.fnt')        
    }

    init(){
        this.logo = this.add.image(
            config.size.centerX,
            config.size.centerY,
            'logo')

        this.tweens.add({
            targets: this.logo,
            scaleX: '-=.01',
            scaleY: '-=.01',
            ease: 'Linear',
            duration: 300,
            repeat: -1,
            yoyo: true
        })            
    }

    create(){
        this.scene.start('Game')
    }    
}