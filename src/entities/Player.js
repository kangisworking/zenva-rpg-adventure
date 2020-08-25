/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import StateMachine from 'javascript-state-machine'

class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)

    this.scene = scene
    this.velocity = 160

    this.scene.physics.world.enable(this)
    this.setImmovable(false)

    this.setScale(1.5)
    this.setCollideWorldBounds(true)
    this.scene.add.existing(this)
  }

  // preUpdate(time, delta) {
  //   super.preUpdate(time, delta)
  // }
  update(cursors) {
    this.body.setVelocity(0)
    if (cursors.left.isDown) {
      this.body.setVelocityX(-160)
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(160)
    }

    if (cursors.up.isDown) {
      this.body.setVelocityY(-160)
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(160)
    }
  }
}

export default Player
