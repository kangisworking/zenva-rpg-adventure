/// <reference path="../typings/phaser.d.ts" />

import Phaser from 'phaser'
import config from './config'
import scenes from './scenes'

new Phaser.Game(
  Object.assign(config, {
    // scene: [GameScene],
    scene: scenes,
  })
).scene.start('Boot')

// this.tweens.add({
//   targets: logo,
//   y: 450,
//   duration: 2000,
//   ease: 'Power2',
//   yoyo: true,
//   loop: -1,
// })
