/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import Player from '../entities/Player'
import Chest from '../entities/Chest'

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init(data) {
    this.scene.launch('Ui')
    this.score = 0
  }

  preload() {}

  create(data) {
    this.createAudio()
    this.createPlayer()
    this.createChests()
    this.createWall()
    this.addCollisions()
    this.createInput()
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound', {})
  }
  createPlayer() {
    this.player = new Player(
      this,
      this.scale.width / 2,
      this.scale.height / 2,
      'characters',
      0
    )
  }
  createWall() {
    this.wall = this.physics.add.image(500, 100, 'button1').setImmovable()
  }
  addCollisions() {
    this.physics.add.collider(this.player, this.wall)
    this.physics.add.overlap(
      this.player,
      this.chests,
      this.collectChest,
      null,
      this
    )
  }
  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }
  collectChest(player, chest) {
    this.goldPickupAudio.play()
    this.score += chest.coins
    this.events.emit('updateScore', this.score)
    chest.makeInactive()
    this.time.delayedCall(1000, this.spawnChest, [], this)
  }
  createChests() {
    this.chests = this.physics.add.group()
    this.chestPositions = [
      [100, 100],
      [200, 200],
      [300, 300],
      [400, 400],
      [500, 500],
    ] // NEW
    this.maxNumberOfChests = 3
    for (let i = 0; i < this.maxNumberOfChests; i++) {
      this.spawnChest()
    }
  }
  spawnChest() {
    const location = this.chestPositions[
      Math.floor(Math.random() * this.chestPositions.length)
    ]
    // get first array object
    let chest = this.chests.getFirstDead()
    if (!chest) {
      const chest = new Chest(this, location[0], location[1], 'items', 0)
      this.chests.add(chest)
    } else {
      chest.setPosition(location[0], location[1])
      chest.makeActive()
    }
  }

  update(time, delta) {
    this.player.update(this.cursors)
  }
}

export default GameScene
