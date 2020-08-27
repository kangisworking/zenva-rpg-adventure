/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import PlayerContainer from '../containers/PlayerContainer'
import Chest from '../entities/Chest'
import Monster from '../entities/Monster'
import Map from '../entities/Map'
import GameManager from '../managers/GameManager'

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
    this.createMap()
    this.createAudio()
    this.createGroups()
    // this.createChests()
    // this.createWall()
    // this.createPlayer()
    // this.addCollisions()
    this.createInput()
    this.createGameManager()
  }

  createMap() {
    this.map = new Map(this, 'map', 'background', 'background', 'blocked')
  }
  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound', {})
  }
  createGroups() {
    this.chests = this.physics.add.group()
    this.monsters = this.physics.add.group()
  }
  createPlayer(location) {
    this.player = new PlayerContainer(
      this,
      location[0] * 2,
      location[1] * 2,
      'characters',
      0
    )
  }
  // tilemap large_level.json 을 사용해서 더이상 불필요함.
  // createWall() {
  //   this.wall = this.physics.add.image(500, 100, 'button1').setImmovable()
  // }

  addCollisions() {
    this.physics.add.collider(this.player, this.map.blockedLayer)
    this.physics.add.overlap(
      this.player,
      this.chests,
      this.collectChest,
      null,
      this
    )
    this.physics.add.collider(this.monsters, this.map.blockedLayer)
    this.physics.add.overlap(
      this.player.weapon,
      this.monsters,
      this.enemyOverlap,
      null,
      this
    )
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  enemyOverlap(player, enemy) {
    if (this.player.playerAttacking && !this.player.swordHit) {
      this.player.swordHit = true
      // enemy.makeInactive()
      this.events.emit('monsterAttacked', enemy.id, this.player.id)
    }
  }

  collectChest(player, chest) {
    this.goldPickupAudio.play()
    this.score += chest.coins
    this.events.emit('updateScore', this.score)
    chest.makeInactive()
    // this.time.delayedCall(1000, this.spawnChest, [], this)
    this.events.emit('pickUpChest', chest.id)
  }

  // createChests() {
  //   this.chests = this.physics.add.group()
  //   this.chestPositions = [
  //     [100, 100],
  //     [200, 200],
  //     [300, 300],
  //     [400, 400],
  //     [500, 500],
  //   ] // NEW
  //   this.maxNumberOfChests = 3
  //   for (let i = 0; i < this.maxNumberOfChests; i++) {
  //     this.spawnChest()
  //   }
  // }

  createGameManager() {
    this.events.on('spawnPlayer', (location) => {
      this.createPlayer(location)
      this.addCollisions()
    })
    this.events.on('chestSpawned', (chest) => {
      this.spawnChest(chest)
    })
    this.events.on('monsterSpawned', (monster) => {
      this.spawnMonster(monster)
    })
    this.events.on('monsterRemoved', (monsterId) => {
      this.monsters.getChildren().forEach((monster) => {
        if (monster.id === monsterId) {
          monster.makeInactive()
        }
      })
    })
    this.gameManager = new GameManager(this, this.map.map.objects)
    this.gameManager.setup()
  }

  spawnMonster(monsterObject) {
    let monster = this.monsters.getFirstDead()
    if (!monster) {
      const monster = new Monster(
        this,
        monsterObject.x * 2,
        monsterObject.y * 2,
        'monsters',
        monsterObject.frame,
        monsterObject.id,
        monsterObject.health,
        monsterObject.maxHealth
      )
      this.monsters.add(monster)
    } else {
      monster.id = monsterObject.id
      monster.health = monsterObject.health
      monster.maxHealth = monsterObject.maxHealth
      monster.setTexture('monsters', monsterObject.frame)
      monster.setPosition(monsterObject.x * 2, monsterObject.y * 2)
      monster.makeActive()
    }
  }

  spawnChest(chestObject) {
    let chest = this.chests.getFirstDead()
    if (!chest) {
      chest = new Chest(
        this,
        chestObject.x * 2,
        chestObject.y * 2,
        'items',
        0,
        chestObject.gold,
        chestObject.id
      )
      this.chests.add(chest)
    } else {
      chest.coins = chestObject.gold
      chest.id = chestObject.id
      chest.setPosition(chestObject.x * 2, chestObject.y * 2)
      chest.makeActive()
    }
  }

  update(time, delta) {
    if (this.player) this.player.update(this.cursors)
  }
}

export default GameScene
