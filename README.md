# Rivers of Reckoning

A retro-style RPG game built with Python and pygame-ce, featuring procedural generation, modern game mechanics, and web deployment via pygbag.

## 🎮 Features

- **Retro Aesthetics**: 960x960 pixel display with classic 16-color palette
- **Procedural Generation**: Dynamic maps, enemies, and quests
- **Modern Game Mechanics**: Weather system, particle effects, and quest system
- **Web Deployment**: Play in browser via pygbag on GitHub Pages
- **Cross-Platform**: Desktop (Windows, macOS, Linux) and Web

## 🛠️ Installation

### Prerequisites

- Python 3.10 or higher

### Install Dependencies

```bash
# Using pip
pip install pygame-ce

# For development (includes testing tools)
pip install -e ".[dev]"

# For web deployment
pip install -e ".[web]"
```

## 🎮 Running the Game

### Desktop

```bash
# Using the CLI
first-python-rpg

# Or using Python
python main.py
```

### Web

The game is automatically deployed to GitHub Pages via pygbag when changes are pushed to main.

To build locally for web:

```bash
pip install pygbag
python -m pygbag --build build/web .
```

## 🎲 Game Features

### Core Gameplay

- **Player Movement**: Arrow keys to move around the map
- **Feature Selection**: Choose which game features to enable
- **Random Events**: Treasure, traps, and encounters
- **Enemy Encounters**: Battle various creatures
- **Difficulty Levels**: Easy and Hard modes

### Enhanced Features

- **Procedural Dungeons**: Toggle between fixed and procedurally generated maps
- **Weather System**: Dynamic weather effects
- **Quest System**: Procedural quest generation with rewards
- **Particle Effects**: Visual enhancements and effects

## 🎮 Controls

- **Arrow Keys**: Move player
- **SPACE**: Toggle features / Select
- **ENTER**: Start game
- **ESC**: Pause / Resume / Quit
- **Q**: Quit to menu (when paused)
- **W**: Toggle weather display

### Boss Battles

- **A**: Attack
- **S**: Cast spell
- **ESC**: Flee from battle

## 📁 Project Structure

```
├── src/
│   └── first_python_rpg/
│       ├── __init__.py          # Package initialization
│       ├── cli.py               # CLI entry point
│       ├── engine.py            # Pygame-ce abstraction layer
│       ├── game.py              # Main game class
│       ├── player.py            # Player logic
│       ├── enemy.py             # Enemy logic
│       ├── map.py               # Map system
│       ├── map_data.py          # Game data and constants
│       ├── boss.py              # Boss encounters
│       ├── shop.py              # Shop system
│       ├── procedural_enemies.py # Procedural enemy generation
│       └── utils.py             # Utility functions
├── main.py                      # Desktop entry point
├── main_web.py                  # Web (pygbag) entry point
├── pyproject.toml               # Project configuration (Hatch)
└── README.md                    # This file
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest test_game_logic.py

# Run with verbose output
pytest -v
```

### Test Coverage

- ✅ Library structure and imports
- ✅ Player movement and damage
- ✅ Map generation and walkability
- ✅ Procedural vs fixed maps
- ✅ Feature flag simulation
- ✅ Game state transitions

## 🔧 Development

### Package Installation

```bash
# Install in development mode
pip install -e ".[dev]"

# Build package
python -m build

# Install from source
pip install -e .
```

### Architecture

- **Engine Abstraction**: Pygame-ce wrapped for easy game development
- **Async Support**: pygbag-compatible async main loop
- **Modular Design**: Separated concerns with clear interfaces
- **Feature Flags**: Toggle game features at runtime

## 🌐 Web Deployment

The game deploys to GitHub Pages using pygbag:

1. Push to main branch triggers the web-deployment workflow
2. pygbag compiles Python to WebAssembly
3. Static site is deployed to GitHub Pages

### Render.com Deployment

A `render.yaml` blueprint is provided for Render.com static site hosting.

## 📈 Technical Details

### Technology Stack

- **pygame-ce**: Modern fork of pygame for cross-platform 2D games
- **pygbag**: Python to WebAssembly compiler for browser deployment
- **Hatch**: Modern Python project management

### Game Engine Features

- **Resolution**: 960x960 pixel display (scaled from 256x256 logical)
- **Color Palette**: 16-color retro aesthetic
- **Performance**: 60 FPS target with async support
- **Input**: Keyboard with web touch support planned

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **pygame-ce Community**: For maintaining the excellent pygame fork
- **pygbag**: For enabling Python games in the browser
- **Contributors**: All contributors to the project

---

**Ready to play?** Run: `python main.py`
