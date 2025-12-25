# AGENTS.md - Rivers of Reckoning [PYTHON STANDALONE]

> **Instructions for AI agents working on this dedicated Python-only procedural RPG**

## 🌊 Standalone Identity

**Rivers of Reckoning** is a browser-based roguelike RPG built exclusively with Python. It is a **standalone codebase** with its own branding, mechanics (River Flow, Reckoning Meter), and visual style.

### Mission Statement

*Create a special, standout Python experience that leverages the unique strengths of pygame-ce and procedural generation.*

## 🎯 Design Principles

| Principle | What It Means |
|-----------|---------------|
| **Python-Only** | Solely use Python dependencies. No TS/JS integration. |
| **River Flow** | Procedural water current mechanics are core to movement. |
| **The Reckoning** | A rising threat meter that scales world difficulty. |
| **Juicy Retro** | SATISFYING feedback: screen shake, animated UI, branded palette. |
| **Web-First** | Optimzed for `pygbag` WASM deployment. |

## 🛠 Technology

| Layer | Tech | Why |
|-------|------|-----|
| Engine | pygame-ce | Modern pygame fork, high performance 2D |
| Web | pygbag | Best-in-class Python-to-WASM compilation |
| Noise | opensimplex | Consistent noise for infinite procedural worlds |
| ECS | esper | Clean data/logic separation for RPGs |

## 📁 Structure

```
main.py                      # Single async entry point
src/rivers_of_reckoning/
├── engine.py                # "Juicy" engine with shake and scaling
├── game.py                  # Main loop with Reckoning meter logic
├── world_gen.py             # Procedural world with Flow fields
├── systems.py               # ECS components/processors
├── map.py                   # Infinite camera-based map
├── player.py                # Player stats and leveling
├── enemy.py                 # Enemy AI
└── map_data.py              # Themed constants and palette
```

## 🔧 Commands

```bash
python main.py          # Play test
pytest -v               # Run test suite
flake8 src/             # Lint check
python -m pygbag --build . # Build for web
```

## ✅ Agent Checklist

Before making changes:
- [ ] Verify you are adding Python code ONLY
- [ ] Understand the "Reckoning" and "Flow" unique mechanics
- [ ] Ensure any new UI has "juice" (shake, pulse, or animation)

When making changes:
- [ ] Keep the 16-color branded palette intact
- [ ] Ensure all loops are `async/await` compatible
- [ ] Follow conventional commit standards

## ❌ What NOT to Do

- **Don't** add any `npm`, `pnpm`, or Node.js dependencies
- **Don't** use synchronous/blocking `time.sleep()` calls
- **Don't** break the responsive `pygame.SCALED` system
- **Don't** use generic retro styles; use the unique "Rivers" branding

## 🎨 Visual Style

- **Palette**: Branded 16-color "Rivers of Reckoning" palette
- **Resolution**: 256x256 logical, auto-scaled
- **Vibe**: Atmospheric, moody, marshland-focused
- **Juice**: Visual confirmation for all actions via screen shake or color pulse

## 📝 Commit Format

```
feat(reckoning): increase threat based on river distance
fix(flow): correct water current direction logic
docs: update standalone branding guide
test: add test for procedural flow generation
chore: update pygame-ce dependency
```
