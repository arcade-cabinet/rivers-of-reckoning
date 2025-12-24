Installation Guide
==================

This guide covers how to set up the development environment for **Rivers of Reckoning** 
using the modern TypeScript and Strata architecture.

Prerequisites
=============

- **Node.js 18.x** or higher
- **pnpm** (recommended) or **npm**
- A modern web browser with WebGL 2 support

Installing Dependencies
=======================

The game depends on several key libraries:

- **@jbcom/strata**: The core engine for procedural 3D terrain, vegetation, and weather.
- **React Three Fiber**: A React renderer for Three.js.
- **Zustand**: A lightweight state management library.
- **Material-UI**: For the game's user interface.

You can install all dependencies using the following command:

.. code-block:: bash

   pnpm install

Development Setup
=================

1. Clone the repository:

   .. code-block:: bash

      git clone https://github.com/jbcom/nodejs-rivers-of-reckoning.git
      cd nodejs-rivers-of-reckoning

2. Install dependencies:

   .. code-block:: bash

      pnpm install

3. Run the game locally in development mode:

   .. code-block:: bash

      pnpm dev

This will start a development server (usually at ``http://localhost:3000``).

Production Build
================

To create an optimized production build:

.. code-block:: bash

   pnpm build

The build artifacts will be generated in the ``dist/`` directory.

Web Deployment
==============

Rivers of Reckoning is a "Web-First" game and can be hosted on any static web server.

Local Preview
-------------

You can preview the production build locally:

.. code-block:: bash

   pnpm preview

Deploying to Render
-------------------

The repository includes a ``render.yaml`` blueprint for easy deployment:

1. Connect your GitHub repository to **Render.com**.
2. Render will automatically detect the blueprint and use the following settings:
   - **Build Command**: ``pnpm install && pnpm build``
   - **Publish Directory**: ``dist``

Mobile Deployment
=================

For native mobile deployment (iOS/Android), we use **Capacitor** to wrap the web 
build.

1. Build the web version:

   .. code-block:: bash

      pnpm build

2. Sync with Capacitor:

   .. code-block:: bash

      npx cap sync

3. Open the project in Xcode (iOS) or Android Studio (Android):

   .. code-block:: bash

      npx cap open ios
      npx cap open android
