import { createLevel } from './level.js';
import { createEnemy } from './enemy.js';
import { createHUD } from './ui.js';
import { createCoin } from './coin.js';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;
const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 450;

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#87ceeb',
  scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
  physics: { default: 'arcade', arcade: { gravity: { y: 900 }, debug: false } },
  scene: { create, update }
};

let player, cursors, keys, hud;
let coins = 0;
const touch = { left: false, right: false, jump: false };
const activePointers = new Map();
const startPoint = { x: 120, y: 300 };

new Phaser.Game(config);

function create() {
  const scene = this;
  scene.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  scene.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  const platforms = createLevel(scene);
  player = scene.add.rectangle(startPoint.x, startPoint.y, 32, 48, 0xffffff);
  scene.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);
  platforms.forEach(platform => scene.physics.add.collider(player, platform));

  [createCoin(scene, 500, 220), createCoin(scene, 1000, 300), createCoin(scene, 1500, 230)].forEach(coin => {
    scene.physics.add.overlap(player, coin, () => { coin.destroy(); coins++; if (hud) hud.setText(`Coins: ${coins}`); });
  });

  const enemy = createEnemy(scene, 900, 350);
  scene.physics.add.collider(enemy, platforms[0]);
  scene.physics.add.overlap(player, enemy, () => restart(scene));

  const flag = scene.add.rectangle(2200, 350, 20, 80, 0xff0000);
  scene.physics.add.existing(flag, true);
  scene.physics.add.overlap(player, flag, () => console.log('You win!'));

  hud = createHUD(scene);
  scene.cameras.main.startFollow(player, true);
  cursors = scene.input.keyboard.createCursorKeys();
  keys = scene.input.keyboard.addKeys('W,A,S,D');
  setupTouchControls();

  scene.scale.on('resize', gameSize => scene.cameras.main.setSize(gameSize.width, gameSize.height));
}

function setupTouchControls() {
  ['left', 'right', 'jump'].forEach(name => {
    const button = document.getElementById(name);
    if (!button) return;

    const press = pointerId => {
      activePointers.set(pointerId, name);
      touch[name] = true;
    };

    const release = pointerId => {
      if (activePointers.get(pointerId) !== name) return;
      activePointers.delete(pointerId);
      touch[name] = false;
    };

    // Pointer Events are used, but Firefox may cancel a pointer when the
    // browser loses capture or when another pointer becomes active. Handle
    // every termination path and never rely on pointerleave alone.
    button.addEventListener('pointerdown', event => {
      event.preventDefault();
      press(event.pointerId);
      try { button.setPointerCapture(event.pointerId); } catch (_) {}
    }, { passive: false });

    button.addEventListener('pointerup', event => {
      event.preventDefault();
      release(event.pointerId);
      try { button.releasePointerCapture(event.pointerId); } catch (_) {}
    }, { passive: false });

    button.addEventListener('pointercancel', event => release(event.pointerId));
    button.addEventListener('lostpointercapture', event => release(event.pointerId));
  });

  // Safety net: if Firefox loses pointer events while the button is held,
  // release all virtual keys when the page/window loses focus.
  window.addEventListener('blur', clearTouch);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTouch();
  });
}

function clearTouch() {
  touch.left = false;
  touch.right = false;
  touch.jump = false;
  activePointers.clear();
}

function restart(scene) {
  player.x = startPoint.x;
  player.y = startPoint.y;
  player.body.setVelocity(0, 0);
}

function update() {
  if (!player || !cursors || !keys) return;
  const left = cursors.left.isDown || keys.A.isDown || touch.left;
  const right = cursors.right.isDown || keys.D.isDown || touch.right;
  const jump = cursors.up.isDown || keys.W.isDown || touch.jump;

  if (left && !right) player.body.setVelocityX(-220);
  else if (right && !left) player.body.setVelocityX(220);
  else player.body.setVelocityX(0);

  if (jump && player.body.blocked.down) player.body.setVelocityY(-450);
  if (player.y > WORLD_HEIGHT + 50) restart(this);
}
