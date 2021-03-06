/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser'
import StateMachine from 'javascript-state-machine'
import { SpawnerType, getTiledProperty } from '../utils'
import Spawner from './Spawner'

export default class GameManager {
  constructor(scene, mapData) {
    this.scene = scene
    this.mapData = mapData

    this.spawners = {}
    this.chests = {}
    this.monsters = {}

    this.playerLocations = []
    this.chestLocations = {}
    this.monsterLocations = {}
  }

  setup() {
    this.parseMapData()
    this.setupEventListener()
    this.setupSpawners()
    this.spawnPlayer()
  }

  parseMapData() {
    this.mapData.forEach((layer) => {
      if (layer.name === 'player_locations') {
        layer.objects.forEach((obj) => {
          this.playerLocations.push([
            obj.x + obj.width / 2,
            obj.y - obj.height / 2,
          ])
        })
      } else if (layer.name === 'chest_locations') {
        layer.objects.forEach((obj) => {
          var spawner = getTiledProperty(obj, 'spawner')
          if (this.chestLocations[spawner]) {
            this.chestLocations[spawner].push([
              obj.x + obj.width / 2,
              obj.y - obj.height / 2,
            ])
          } else {
            this.chestLocations[spawner] = [
              [obj.x + obj.width / 2, obj.y - obj.height / 2],
            ]
          }
        })
      } else if (layer.name === 'monster_locations') {
        layer.objects.forEach((obj) => {
          var spawner = getTiledProperty(obj, 'spawner')
          if (this.monsterLocations[spawner]) {
            this.monsterLocations[spawner].push([
              obj.x + obj.width / 2,
              obj.y - obj.height / 2,
            ])
          } else {
            this.monsterLocations[spawner] = [
              [obj.x + obj.width / 2, obj.y - obj.height / 2],
            ]
          }
        })
      }
    })
  }

  setupEventListener() {
    this.scene.events.on('pickUpChest', (chestId) => {
      if (this.chests[chestId]) {
        this.spawners[this.chests[chestId].spawnerId].removeObject(chestId)
      }
    })
    this.scene.events.on('monsterAttacked', (monsterId, playerId) => {
      if (this.monsters[monsterId]) {
        this.monsters[monsterId].loseHealth()

        if (this.monsters[monsterId].health <= 0) {
          this.spawners[this.monsters[monsterId].spawnerId].removeObject(
            monsterId
          )
          this.scene.events.add('monsterRemoved', monsterId)
        }
      }
    })
  }

  setupSpawners() {
    const config = {
      spawnInterval: 3000,
      limit: 3,
      objectType: SpawnerType.CHEST,
    }
    Object.keys(this.chestLocations).forEach((key) => {
      config.id = `chest-${key}`
      const spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this)
      )
      this.spawners[spawner.id] = spawner
    })

    Object.keys(this.monsterLocations).forEach((key) => {
      config.id = `monster-${key}`
      config.spawnerType = SpawnerType.MONSTER
      const spawner = new Spawner(
        config,
        this.monsterLocations[key],
        this.addMonster.bind(this),
        this.deleteMonster.bind(this)
      )
      this.spawners[spawner.id] = spawner
    })
  }

  spawnPlayer() {
    const location = this.playerLocations[
      Math.floor(Math.random() * this.playerLocations.length)
    ]
    this.scene.events.emit('spawnPlayer', location)
  }

  addChest(chestId, chest) {
    // console.log('chest :>> ', chestId, chest)
    this.chests[chestId] = chest
    this.scene.events.emit('chestSpawned', chest)
  }

  deleteChest(chestId) {
    delete this.chests[chestId]
  }

  addMonster(monsterId, monster) {
    this.monsters[monsterId] = monster
    this.scene.events.emit('monsterSpawned', monster)
  }
  deleteMonster(monsterId) {
    delete this.monsterLocations[monsterId]
  }
}
