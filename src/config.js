/// <reference path="../typings/phaser.d.ts" />

import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'game',
  // backgroundColor: '#33A5E7',
  backgroundColor: '#000',
  scale: {
    width: 800,
    height: 600,
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // render: {
  //   pixelArt: true,
  // },
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
      debugShowVelocity: true,
      debugShowBody: true,
      debugShowStaticBody: true,
    },
  },
}
