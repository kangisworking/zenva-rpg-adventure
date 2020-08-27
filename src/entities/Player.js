/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import StateMachine from 'javascript-state-machine'

export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)

    this.scene = scene
    this.setScale(2)
    this.scene.add.existing(this)
  }

  // preUpdate(time, delta) {
  //   super.preUpdate(time, delta)
  // }
  update(cursors) {
    // this.body.setVelocity(0)
    // if (cursors.left.isDown) {
    //   this.body.setVelocityX(-1600)
    // } else if (cursors.right.isDown) {
    //   this.body.setVelocityX(1600)
    // }
    // if (cursors.up.isDown) {
    //   this.body.setVelocityY(-1600)
    // } else if (cursors.down.isDown) {
    //   this.body.setVelocityY(1600)
    // }
  }
}
