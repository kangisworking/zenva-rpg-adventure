/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    this.loadImages()
    this.loadSpritesheets()
    this.loadAudio()
  }

  loadImages() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png')
    this.load.image('button2', 'assets/images/ui/blue_button02.png')
  }
  loadSpritesheets() {
    this.load.spritesheet('items', 'assets/images/items.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('characters', 'assets/images/characters.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }
  loadAudio() {
    this.load.audio('goldSound', ['assets/audio/pickup.wav'])
  }

  create() {
    console.log('starting game')
    this.scene.start('Title')
  }

  update() {}
}

export default BootScene
