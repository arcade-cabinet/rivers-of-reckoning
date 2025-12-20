# End-to-End Tests with Playwright

These tests actually **run the game** and verify it works.

## Run Tests

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run all tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Debug mode
pnpm test:e2e:debug
```

## What Gets Tested

1. **Game loads** - Canvas renders, WebGL initializes
2. **Terrain & Water** - 3D scene renders correctly
3. **Day/Night Cycle** - Time progression works
4. **Weather System** - Dynamic weather changes
5. **Camera Controls** - Mouse interaction works
6. **Performance** - 60+ FPS capability
7. **No Errors** - Console stays clean

## Screenshots

All tests generate screenshots in `tests/screenshots/`:
- `game-loaded.png` - Initial render
- `terrain-water.png` - Terrain and water visible
- `time-0.png` / `time-3s.png` - Time progression
- `camera-rotated.png` - After camera movement
- `strata-annotated.png` - Annotated comparison shot

## vs Python/pygame

The Python version had **ZERO** end-to-end tests. We couldn't even verify if it worked.

With Strata + Playwright: **Complete test coverage in 5 minutes.**
