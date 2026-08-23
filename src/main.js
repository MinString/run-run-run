import { createLevel } from './level.js';
import { createEnemy } from './enemy.js';

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
let startPoint = { x: 120, y: 300 };

new Phaser.Game(config);

function create() {
  const scene = this;

  scene.physics.world.setBounds(0, 0, 2400, 450);
  scene.cameras.main.setBounds(0, 0, 2400, 450);

  const platforms = createLevel(scene);

  player = scene.physics.add.rectangle(startPoint.x, startPoint.y, 32, 48, 0xffffff);
  scene.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  platforms.forEach(platform => {
    scene.physics.add.collider(player, platform);
  });

  const enemy = createEnemy(scene, 900, 350);
  scene.physics.add.collider(enemy, platforms[0]);
  scene.physics.add.overlap(player, enemy, () => restart(scene));

  const flag = scene.physics.add.rectangle(2200, 350, 20, 80, 0xff0000);
  scene.physics.add.existing(flag, true);
  scene.physics.add.overlap(player, flag, () => console.log('You win!'));

  scene.cameras.main.startFollow(player, true);
  cursors = scene.input.keyboard.createCursorKeys();
}

function restart(scene) {
  player.x = startPoint.x;
  player.y = startPoint.y;
  player.body.setVelocity(0, 0);
}

function update() {
  if (!player) return;

  if (cursors.left.isDown) player.body.setVelocityX(-200);
  else if (cursors.right.isDown) player.body.setVelocityX(200);
  else player.body.setVelocityX(0);

  if (cursors.up.isDown && player.body.blocked.down) {
    player.body.setVelocityY(-450);
  }

  if (player.y > 500) restart(this);
}
