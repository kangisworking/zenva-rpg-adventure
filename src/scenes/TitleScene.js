/// <reference path="../../typings/phaser.d.ts" />

import Phaser from 'phaser'
import UiButton from '../entities/UiButton'

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' })
  }

  init(data) {}

  preload() {}

  create() {
    this.titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      'Zenva MMORPG',
      { fontSize: '64px', fill: '#fff' }
    )
    this.titleText.setOrigin(0.5)
    this.button = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.65,
      'button1',
      'button2',
      'Start',
      this.startScene.bind(this, 'Game')
    )

    setTimeout(() => {
      this.scene.start('Game')
    }, 2000)
  }

  startScene(targetScene) {
    this.scene.start(targetScene)
  }

  update(time, delta) {}
}

export default TitleScene
