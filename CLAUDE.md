# CLAUDE.md - Rivers of Reckoning [PYTHON STANDALONE]

> **An immersive, procedurally generated roguelike RPG built exclusively for Python web play**

## 🌊 The Standalone Vision

**Rivers of Reckoning** is a browser-based adventure where players explore an infinite, ever-changing world of marshes, forests, deserts, and tundra. This is a **pure Python implementation** designed to stand apart from TypeScript alternatives through unique mechanics and a deep retro aesthetic.

### Unique Standalone Goals

1. **The Reckoning**: A persistent threat system unique to this version.
2. **Adaptive Flow**: Procedural water currents that influence movement.
3. **Python Optimized**: Leveraging `pygame-ce` and `pygbag` for peak performance.
4. **Retro Juice**: Screen shake, particle-based animations, and a branded 16-color palette.
5. **Instant Play**: Click and you're in. Zero setup via `pygbag` WASM.

### The World

- **Biomes** flow naturally into each other based on temperature and moisture
- **Weather** changes dynamically - rain slows you, storms are dangerous
- **Day/Night** cycle affects visibility and enemy behavior
- **River Flow** physically moves objects and characters in water tiles
- **The Reckoning** increases world danger based on time and distance

## 🛠 Technology Stack (Python Solely)

```
pygame-ce     → Modern 2D engine (the core)
pygbag        → Python → WebAssembly compiler
opensimplex   → Procedural world generation noise
esper         → Lightweight ECS for clean logic
```

## 📁 Project Structure

```
main.py                      # THE entry point (async, pygbag-ready)
src/rivers_of_reckoning/
├── engine.py                # Responsive pygame with auto-scaling & juice
├── game.py                  # Game states, update/draw loops, Reckoning
├── world_gen.py             # Procedural biomes & Adaptive Flow
├── systems.py               # ECS components & processors
├── map.py                   # Infinite scrolling camera
├── player.py                # Player mechanics & stats
├── enemy.py                 # Enemy AI and spawning
└── map_data.py              # Branded palette, items, events
```

## 🎯 Development Commands

```bash
# Play the game
python main.py

# Run tests
pytest -v

# Lint
flake8 src/

# Build for web deployment
python -m pygbag --build .

# Update dependencies
pip install -e .
```

## ⚡ Key Technical Decisions

### Python Only
No TypeScript, no Node.js, no JavaScript. This is a dedicated Python experience.

### Responsive Juice
Renders at 256x256 logical pixels with `pygame.SCALED`. Includes screen shake, animated HUD bars, and pulse effects for a high-quality feel.

### The Reckoning Mechanic
Game state includes a rising `reckoning_level` that scales enemy strength and environmental hazards, creating unique tension.

### Adaptive Water Flow
Water tiles are walkable but procedural noise defines a "flow" direction that pushes the player, integrated into the movement system.

## 🎨 Visual Identity

- **Palette**: Branded 16-color "Rivers" aesthetic
- **Resolution**: 256x256 logical, auto-scales to any display
- **Style**: Juicy pixel art with particle-based animations
- **Feedback**: Dynamic screen shake, color flashes, pulse UI

## Before Making Changes

1. Ask: "Does this enhance the standalone Python experience?"
2. Run tests: `pytest -v`
3. Ensure no JS/TS dependencies are introduced
4. Test in browser if possible

## Coding Standards

- Python 3.10+
- No blocking/synchronous patterns (pygbag compatible)
- No Node.js artifacts
- Conventional commits (feat/fix/docs/test/chore)
