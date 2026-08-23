export function createCoin(scene, x, y) {
  const coin = scene.physics.add.rectangle(x, y, 18, 18, 0xffff00);
  scene.physics.add.existing(coin, true);
  coin.isCoin = true;
  return coin;
}
