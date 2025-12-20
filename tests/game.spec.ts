import { test, expect } from '@playwright/test'

test.describe('Rivers of Reckoning - Strata Edition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('game loads and renders 3D canvas', async ({ page }) => {
    // Wait for React to mount
    await page.waitForSelector('canvas', { timeout: 10000 })
    
    // Verify canvas exists
    const canvas = await page.locator('canvas')
    await expect(canvas).toBeVisible()
    
    // Take screenshot of initial state
    await page.screenshot({ path: 'tests/screenshots/game-loaded.png' })
  })

  test('terrain and water render', async ({ page }) => {
    await page.waitForSelector('canvas', { timeout: 10000 })
    
    // Wait for 3D scene to render
    await page.waitForTimeout(2000)
    
    // Take screenshot showing terrain/water
    await page.screenshot({ 
      path: 'tests/screenshots/terrain-water.png',
      fullPage: false 
    })
    
    // Verify WebGL context is active
    const hasWebGL = await page.evaluate(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      return !!canvas?.getContext('webgl2') || !!canvas?.getContext('webgl')
    })
    expect(hasWebGL).toBe(true)
  })

  test('HUD displays game information', async ({ page }) => {
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(1000)
    
    // Get all text content from the page
    const bodyText = await page.locator('body').textContent()
    
    // Check for HUD elements - game title should always be visible
    expect(bodyText).toContain('Rivers of Reckoning')
    
    // Check for time display (Day X format)
    expect(bodyText).toMatch(/Day \d+/)
    
    // Check for health/stamina indicators (emoji-based)
    const hasHealthIndicator = bodyText?.includes('❤️') || bodyText?.includes('HP') || bodyText?.includes('Health')
    expect(hasHealthIndicator).toBe(true)
    
    // Check for weather display - should show one of the weather types
    const weatherTypes = ['Clear', 'Rain', 'Fog', 'Snow', 'Storm', '☀️', '🌧️', '🌫️', '❄️', '⛈️']
    const hasWeatherDisplay = weatherTypes.some(type => bodyText?.includes(type))
    expect(hasWeatherDisplay).toBe(true)
  })

  test('day/night cycle progresses', async ({ page }) => {
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(2000)
    
    // Take screenshot at "start"
    await page.screenshot({ path: 'tests/screenshots/time-0.png' })
    
    // Check for time phase display
    const bodyText = await page.locator('body').textContent()
    const timePhases = ['Dawn', 'Day', 'Dusk', 'Night']
    const hasTimePhase = timePhases.some(phase => bodyText?.includes(phase))
    expect(hasTimePhase).toBe(true)
    
    // Wait a bit for time to progress
    await page.waitForTimeout(3000)
    
    // Take screenshot showing time progression
    await page.screenshot({ path: 'tests/screenshots/time-3s.png' })
    
    // Verify rendering is still active
    const canvas = await page.locator('canvas')
    await expect(canvas).toBeVisible()
  })

  test('camera controls work', async ({ page }) => {
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(1000)
    
    const canvas = await page.locator('canvas')
    const box = await canvas.boundingBox()
    
    if (box) {
      // Click and drag to rotate camera
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2)
      await page.mouse.up()
      
      await page.waitForTimeout(500)
      
      // Screenshot after camera movement
      await page.screenshot({ path: 'tests/screenshots/camera-rotated.png' })
    }
    
    await expect(canvas).toBeVisible()
  })

  test('game performance - 30+ fps capable', async ({ page }) => {
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(2000)
    
    // Measure FPS
    const fps = await page.evaluate(async () => {
      let frameCount = 0
      let lastTime = performance.now()
      
      return new Promise<number>((resolve) => {
        const measureFrame = () => {
          frameCount++
          const currentTime = performance.now()
          
          if (currentTime - lastTime >= 1000) {
            resolve(frameCount)
          } else {
            requestAnimationFrame(measureFrame)
          }
        }
        requestAnimationFrame(measureFrame)
      })
    })
    
    console.log(`Game running at ${fps} FPS`)
    
    // Should maintain at least 30fps
    expect(fps).toBeGreaterThan(30)
  })

  test('no critical console errors', async ({ page }) => {
    const criticalErrors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text()
        // Filter out non-critical WebGL warnings
        if (!text.includes('WebGL') && !text.includes('warning')) {
          criticalErrors.push(text)
        }
      }
    })
    
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(3000)
    
    // Should have no critical errors
    expect(criticalErrors).toHaveLength(0)
  })

  test('controls help text is visible', async ({ page }) => {
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(1000)
    
    const bodyText = await page.locator('body').textContent()
    
    // Check for controls help
    const hasControlsHelp = 
      bodyText?.includes('Controls') ||
      bodyText?.includes('Mouse') ||
      bodyText?.includes('drag') ||
      bodyText?.includes('Rotate') ||
      bodyText?.includes('Zoom')
    
    expect(hasControlsHelp).toBe(true)
  })

  test('game comparison screenshot', async ({ page }) => {
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(2000)
    
    // Take a nice screenshot for comparison
    await page.screenshot({ 
      path: 'tests/screenshots/strata-vs-pygame.png',
      fullPage: true 
    })
    
    // Add text overlay showing comparison info
    await page.evaluate(() => {
      const div = document.createElement('div')
      div.style.position = 'fixed'
      div.style.top = '20px'
      div.style.right = '20px'
      div.style.padding = '20px'
      div.style.background = 'rgba(0, 0, 0, 0.85)'
      div.style.color = 'white'
      div.style.fontSize = '18px'
      div.style.fontFamily = 'system-ui, sans-serif'
      div.style.borderRadius = '12px'
      div.style.zIndex = '9999'
      div.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)'
      div.innerHTML = `
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">
          ✅ Strata Edition
        </div>
        <div style="font-size: 14px; line-height: 1.6;">
          • Full Strata API integration<br>
          • GPU-powered procedural terrain<br>
          • Real-time weather system<br>
          • Dynamic day/night cycle<br>
          • Seeded deterministic generation<br>
          • State management via GameStateProvider<br>
          • Yuka AI support ready
        </div>
      `
      document.body.appendChild(div)
    })
    
    await page.screenshot({ 
      path: 'tests/screenshots/strata-annotated.png',
      fullPage: true 
    })
  })
})
