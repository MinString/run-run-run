# Run Run Run

A 2D side-scrolling platformer made with **Godot 4**.

## Project structure

```text
run-run-run/
├── .github/              # GitHub configuration
├── assets/               # Pixel-art assets (currently kept as source sheets)
├── scenes/               # Godot scenes
├── scripts/              # GDScript gameplay logic
├── project.godot         # Godot project configuration
└── README.md
```

## Assets

The PNG files in the repository are **sprite sheets / atlases**, not individual sprites. They must be sliced into frames before being used by the game.

- `hero.png` — player sprite sheet
- `enemy.png` — enemy sprite sheet
- `coin.png` — coin animation sheet
- `chest.png` — chest states / animation sheet
- `terrain.png` — terrain tile sheet
- `bg_sky.png` — sky background
- `bg_mountains.png` — mountain/background layer
- `bg_foreground.png` — foreground layer

The gameplay scenes will use Godot's `SpriteFrames`, `AnimatedSprite2D`, regions, and/or tile atlases to select the appropriate parts of these sheets.

## Controls

- `A / D` — move left / right
- `W` or `Space` — jump
- Arrow keys are also available where configured

## Development

Open the project with **Godot 4** and run `scenes/main.tscn`.
