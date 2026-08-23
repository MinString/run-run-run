export function createEnemy(scene, x, y) {
  const enemy = scene.add.rectangle(x, y, 32, 32, 0xff0000);
  scene.physics.add.existing(enemy);
  enemy.body.setVelocityX(80);
  enemy.body.setCollideWorldBounds(true);
  return enemy;
}
