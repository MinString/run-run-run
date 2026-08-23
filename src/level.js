export function createLevel(scene) {
  const platforms = [
    [400, 420, 800, 40],
    [250, 330, 180, 20],
    [600, 260, 160, 20]
  ];

  platforms.forEach(([x, y, w, h]) => {
    const p = scene.add.rectangle(x, y, w, h, 0x666666);
    scene.physics.add.existing(p, true);
  });
}
