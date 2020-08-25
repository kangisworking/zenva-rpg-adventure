/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import StateMachine from 'javascript-state-machine'

export default class UiButton extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, hoverKey, text, targetCallback) {
    super(scene, x, y)
    this.scene = scene
    this.x = x
    this.y = y
    this.key = key
    this.hoverKey = hoverKey
    this.text = text
    this.targetCallback = targetCallback

    this.createButton()
    this.scene.add.existing(this)
  }
  createButton() {
    this.button = this.scene.add.image(this.x, this.y, 'button1')
    this.button.setInteractive()
    this.button.setScale(1.4)

    this.buttonText = this.scene.add.text(0, 0, this.text, {
      fontSize: '26px',
      fill: '#fff',
    })
    Phaser.Display.Align.In.Center(this.buttonText, this.button)

    this.button.on('pointerdown', () => {
      this.targetCallback()
    })
    this.button.on('pointerover', () => {
      this.button.setTexture(this.hoverKey)
    })
    this.button.on('pointerout', () => {
      this.button.setTexture(this.key)
    })
  }
}
