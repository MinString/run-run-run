export function createHUD(scene) {
  return scene.add.text(16, 16, 'Coins: 0  HP: 3', {
    fontSize: '20px',
    fill: '#ffffff'
  }).setScrollFactor(0);
}
