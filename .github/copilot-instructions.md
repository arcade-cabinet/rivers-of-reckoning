# Copilot Instructions - Rivers of Reckoning [PYTHON STANDALONE]

## 🌊 The Saga of Rivers
Rivers of Reckoning is an atmospheric 2.5D procedural roguelike RPG built with **Python**, **Pygame-ce**, and **Pygbag**. It is a standalone game, distinct from any TypeScript versions, focused on the legend of the hero "Rivers" and his struggle against the "Reckoning."

## 🎯 Core Principles
1.  **Python Only**: This project uses ONLY Python dependencies. No Node.js, No TypeScript.
2.  **Web-First (WASM)**: Built for the browser via `pygbag`. All game loops MUST be asynchronous.
3.  **2.5D Perspective**: Depth is simulated via Y-sorting and height offsets on a grid. Do not use 3D libraries.
4.  **Procedural Destiny**: Worlds are generated from seeds using `opensimplex` noise.
5.  **The Reckoning**: Difficulty and world events escalate via the "Reckoning Meter."

## 🛠 Technology Stack
-   **Engine**: `pygame-ce` (the modern, community-driven Pygame).
-   **Web/WASM**: `pygbag` for browser deployment.
-   **Architecture**: `esper` for Entity Component System (ECS).
-   **Noise**: `opensimplex` for procedural generation.
-   **Tests**: `pytest` and `playwright-python` for E2E.

## 📁 Project Structure
-   `main.py`: The single entry point, must be async for `pygbag`.
-   `src/rivers_of_reckoning/`: Modular core logic.
    -   `engine.py`: Pygame abstraction and 2.5D rendering primitives.
    -   `game.py`: Main game state and orchestration.
    -   `assets.py`: Centralized asset loading and scaling (960x960 resolution).
    -   `world_gen.py`: Procedural map and biome logic.
-   `images/`: Character animations and object sprites.

## ✅ Writing Code
-   **Always Use Async**: Use `async def main()` and `await asyncio.sleep(0)` in loops.
-   **Logical Resolution**: 960x960. Use `pygame.SCALED` in `pygame.display.set_mode`.
-   **Y-Sorting**: Draw entities from top to bottom (based on Y-coordinate) for 2.5D depth.
-   **Juice**: Implement screen shake and visual feedback for every action.
-   **ECS Patterns**: Use `esper` components (dataclasses) and processors for clean logic.

## 🚫 What NOT to Do
-   **No 3D**: Do not use Three.js, React Three Fiber, or Strata APIs.
-   **No Blocking Calls**: Avoid `time.sleep()`, use `await asyncio.sleep(0)`.
-   **No Hardcoded Paths**: Use relative paths from the project root.
-   **No TypeScript**: This is a standalone Python project.
