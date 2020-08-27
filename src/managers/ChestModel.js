/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import StateMachine from 'javascript-state-machine'
import uuid from 'node-uuid'

export default class ChestModel {
  constructor(x, y, gold, spawnerId) {
    this.id = `${spawnerId}-${uuid.v4()}`
    this.spawnerId = spawnerId
    this.x = x
    this.y = y
    this.gold = gold
  }
}
