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
let flag;

new Phaser.Game(config);

function create() {
  const scene = this;

  scene.physics.world.setBounds(0, 0, 2400, 450);
  scene.cameras.main.setBounds(0, 0, 2400, 450);

  const platforms = createLevel(scene);

  player = scene.physics.add.rectangle(120, 300, 32, 48, 0xffffff);
  scene.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  platforms.forEach(platform => {
    scene.physics.add.collider(player, platform);
  });

  flag = scene.physics.add.rectangle(2200, 350, 20, 80, 0xff0000);
  scene.physics.add.existing(flag, true);

  scene.physics.add.overlap(player, flag, () => {
    console.log('You win!');
  });

  scene.cameras.main.startFollow(player, true);
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
