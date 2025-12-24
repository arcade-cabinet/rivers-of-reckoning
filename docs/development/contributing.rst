Contributing Guide
==================

Thank you for your interest in contributing to **Rivers of Reckoning**! This 
document provides an overview of the project's modern architecture and 
guidelines for developers.

Architecture Overview
=====================

The game is built with a highly decoupled, component-based architecture using 
React Three Fiber and the Strata engine.

Strata Engine Integration
-------------------------

We use the **@jbcom/strata** library for all heavy-lifting procedural tasks:

- **Terrain**: Generated using the `fbm()` (Fractal Brownian Motion) function.
- **Vegetation**: Efficiently rendered using instanced components (`GrassInstances`, `TreeInstances`).
- **Weather**: Procedural sky, rain, and snow components.
- **Post-Processing**: Integrated cinematic effects for a polished look.

State Management
----------------

Game state is managed via **Zustand**, providing a fast and simple way to share 
state across React components without unnecessary re-renders.

- **Store**: Located in `src/store/gameStore.ts`.
- **Selectors**: Use selectors to subscribe only to the state you need.

Project Structure
=================

.. code-block:: text

   /
   ├── src/
   │   ├── App.tsx             # Main 3D scene composition
   │   ├── components/         # UI components (HUD, Menus)
   │   ├── store/              # Zustand state management
   │   ├── types/              # TypeScript definitions
   │   ├── constants/          # Game constants and config
   │   └── events/             # Decoupled event system
   ├── docs/                   # Documentation (Sphinx)
   ├── tests/                  # Playwright E2E tests
   └── public/                 # Static assets

Development Workflow
====================

Coding Standards
----------------

- **TypeScript Strict Mode**: All new code must be fully typed.
- **Functional Components**: Use React functional components and hooks.
- **Seeded Randomness**: Always use the provided seeded RNG for procedural generation to ensure reproducibility.
- **Performance First**: Be mindful of the render loop; use `useFrame` sparingly and optimize heavy computations.

Testing
-------

We use **Playwright** for end-to-end testing to ensure the game runs correctly 
across different browsers.

.. code-block:: bash

   pnpm test:e2e

Commands Summary
----------------

- `pnpm dev`: Start the development server.
- `pnpm build`: Create a production build.
- `pnpm lint`: Run ESLint.
- `pnpm typecheck`: Run the TypeScript compiler in no-emit mode.
- `pnpm test:e2e`: Run E2E tests.

Continuous Integration
----------------------

GitHub Actions are configured to run linting, typechecking, and E2E tests on 
every pull request. Ensure your changes pass all checks before submitting.
