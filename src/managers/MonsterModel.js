/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import StateMachine from 'javascript-state-machine'
import uuid from 'node-uuid'

export default class MonsterModel {
  constructor(x, y, gold, spawnerId, frame, health, attack) {
    this.id = `${spawnerId}-${uuid.v4()}`
    this.spawnerId = spawnerId
    this.x = x * 2
    this.y = y * 2
    this.gold = gold
    this.frame = frame
    this.health = health
    this.maxHealth = health
    this.attack = attack
  }

  loseHealth() {
    this.health -= 1
  }
}
