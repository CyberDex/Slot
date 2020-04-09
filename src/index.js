import Phaser from 'phaser'
import BootScene from './scenes/boot'
import PreloadScene from './scenes/preload'
import GameScene from './scenes/game'
import GameScalePlugin from 'phaser-plugin-game-scale'
import {config} from './config'

let phaserConfig = config.phaser
phaserConfig.type = Phaser.AUTO
phaserConfig.scene = [BootScene, PreloadScene, GameScene]
phaserConfig.plugins = {
    global: [{
        key: 'GameScalePlugin',
        plugin: GameScalePlugin,
        mapping: 'gameScale',
        data: {
            debounce: false,
            debounceDelay: 50,   // Debounce interval, in ms
            maxHeight: Infinity,
            maxWidth: Infinity,
            minHeight: config.size.minHeight,
            minWidth: config.size.minWidth,
            mode: 'fit',
            resizeCameras: false, // Resize each scene camera when resizing the game
            snap: null, 
        }
    }]
}
phaserConfig.banner = { hidePhaser: true }
new Phaser.Game(phaserConfig)