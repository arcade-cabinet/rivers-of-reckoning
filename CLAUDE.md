# CLAUDE.md - Rivers of Reckoning [PYTHON STANDALONE]

> **"A hero's legacy is written in the steps they take against the Reckoning."**

## 🌊 The Standalone Vision: The Legend of Rivers

**Rivers of Reckoning** is a personal tribute turned into an atmospheric roguelike. All development is guided by the [Game Bible](GAME_BIBLE.md). This is the **Python standalone** version - there are no TypeScript dependencies, no Node.js, no web frameworks. This is **pure Python** using pygame-ce for the **Saga of Rivers**—a character-driven journey through a world that actively reacts to your progress.

## 📜 The Genesis: From Curses to 2.5D

**Rivers of Reckoning** evolved from a `curses` terminal project into this 2.5D Python saga. This project is **Python-only** and uses pygame-ce for 2.5D rendering, committed to the **2.5D Perspective**—preserving the readability and logic-first approach of its origins.

### How we differ from other roguelikes:
1.  **The Protagonist's Burden**: The game is about the character "Rivers" and his struggle against the **Reckoning**.
2.  **2.5D Spatial Logic**: We use grid-based depth rather than full 3D geometry. This keeps the code accessible for those learning game logic.
3.  **The Reckoning Meter**: A unique "destiny" mechanic.
4.  **Fate's Pull**: Physical force representing the world's attempt to steer Rivers off his path.
5.  **Legendary Aesthetic**: High-contrast, moody colors.

### Unique Standalone Goals

1.  **Character Growth**: Focus on the leveling and gear progression of Rivers.
2.  **Destiny Events**: The Reckoning triggers "Trials" (surges) that test the player's resolve.
3.  **Personalized UI**: A "Chronicle" style HUD that tracks the legend of the current run.
4.  **Juice & Feedback**: Aggressive screen shake and tactical "impact" frames to make every victory feel hard-earned.

## 🛠 Technology Stack (Python Solely)

```
pygame-ce     → The heart of the engine
pygbag        → Bringing the legend to the web (WASM)
opensimplex   → Procedural fate-generation
esper         → ECS for managing the world's entities
pytest        → Validating the saga's logic
playwright    → E2E testing of the web legend
```

## 📁 Project Structure

```
src/
├── rivers_of_reckoning/
│   ├── engine.py     # Pygame-ce abstraction, 2.5D primitives
│   ├── game.py       # Main saga state and orchestration
│   ├── assets.py     # Loading the legend's visual style
│   ├── world_gen.py  # Procedural destiny and biomes
│   └── map.py        # 2.5D rendering logic
├── main.py           # Async web-friendly entry point
└── tests/            # Automated chronicles of correctness
```

## 🎯 Technical Manifesto

1.  **Async or Bust**: All loops must be `async def` for `pygbag`.
2.  **2.5D Soul**: Depth is achieved through Y-sorting and height offsets.
3.  **The Reckoning**: Mechanics must tie into the escalating difficulty of the run.
4.  **Responsive Juice**: Scaling is handled by `pygame.SCALED`. Screenshake is mandatory for impact.
5.  **Pure Python**: No Node.js. No TypeScript. No exceptions.

## 🎨 Visual Identity

- **Resolution**: 960x960 logical (scaled to fit).
- **Palette**: Custom 16-color "Rivers" high-contrast palette.
- **Animations**: Frame-based character sprites (idle, run, etc.).

## 🔧 Workflow Commands

```bash
python main.py          # Start the saga locally
pytest                  # Verify the logic
python -m pygbag .      # Forge the web legend (build)
```
