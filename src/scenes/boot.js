import { Scene } from 'phaser'

export default class BootScene extends Scene {
    constructor() { super({ key: 'Boot' }) }

    preload() {
        this.load.image('logo', './assets/logo.png')
    }

    create(){   
        this.scene.start('Preload')
    }

}