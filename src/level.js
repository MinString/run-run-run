export function createLevel(scene) {
  const platforms = [];

  const data = [
    [400, 420, 800, 40],
    [250, 330, 180, 20],
    [600, 260, 160, 20],
    [950, 350, 260, 20],
    [1350, 280, 220, 20],
    [1750, 380, 300, 20]
  ];

  data.forEach(([x, y, w, h]) => {
    const p = scene.add.rectangle(x, y, w, h, 0x666666);
    scene.physics.add.existing(p, true);
    platforms.push(p);
  });

  return platforms;
}
