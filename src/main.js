import { createLevel } from './level.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 }, debug: false }
  },
  scene: { create, update }
};

let player;
let cursors;

new Phaser.Game(config);

function create() {
  const scene = this;
  createLevel(scene);

  player = scene.physics.add.rectangle(120, 300, 32, 48, 0xffffff);
  scene.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  cursors = scene.input.keyboard.createCursorKeys();
}

function update() {
  if (!player) return;
  if (cursors.left.isDown) player.body.setVelocityX(-200);
  else if (cursors.right.isDown) player.body.setVelocityX(200);
  else player.body.setVelocityX(0);

  if (cursors.up.isDown && player.body.blocked.down) {
    player.body.setVelocityY(-450);
  }
}
