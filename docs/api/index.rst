API Reference
=============

Rivers of Reckoning is built with a modern TypeScript and React Three Fiber 
architecture. This section provides an overview of the key modules.

Core Modules
------------

* **App.tsx**: The main entry point for the 3D scene composition. It sets up 
  the Strata engine components and manages the main game loop.
* **gameStore.ts**: The central Zustand store that manages all game state, 
  including player stats, world state, and weather.
* **game.ts (Types)**: TypeScript definitions for the game's core data 
  structures and configurations.

UI Components
-------------

* **GameHUD**: The in-game overlay displaying health, gold, and other player stats.
* **TitleScreen**: The initial landing page for the game.
* **PauseMenu**: Handles game state transitions and provides options to resume or quit.
* **GameOverScreen**: Displays final statistics and allowed the player to restart.

Engine Integration
------------------

The game leverages the **@jbcom/strata** library for:

* **Terrain Generation**: Multi-octave FBM noise.
* **Vegetation**: Instanced rendering of grass and trees.
* **Weather**: Real-time atmospheric simulation.
* **AI**: Yuka-based entity management and steering.

For more detailed technical documentation on the Strata API, please refer to the 
`official Strata documentation <https://www.npmjs.com/package/@jbcom/strata>`_.
