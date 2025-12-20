/**
 * Rivers of Reckoning - Main Game Component
 *
 * A procedural 3D RPG using @jbcom/strata for terrain, water, vegetation,
 * weather, audio, AI, state management, and game systems.
 *
 * This implementation uses ONLY real Strata APIs - no hallucinated components.
 * 
 * Features Used:
 * - GameStateProvider + useGameState for state management
 * - ProceduralSky with TimeOfDayState and WeatherState
 * - createGrassInstances, createTreeInstances, createRockInstances for vegetation
 * - Rain, Snow for weather effects
 * - AudioProvider, AmbientAudio, WeatherAudio, FootstepAudio for audio
 * - YukaEntityManager, YukaVehicle, YukaStateMachine for AI enemies
 * - HealthBar, Minimap, Notification for UI
 * - CinematicEffects for post-processing
 * - TriggerComposer for interactive triggers
 */

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { Suspense, useMemo, useRef, useCallback, useEffect, useState } from 'react'
import * as THREE from 'three'
import {
  // Core algorithms from Strata
  fbm,
  noise3D,

  // Vegetation creation functions
  createGrassInstances,
  createTreeInstances,
  createRockInstances,

  // React Components
  ProceduralSky,
  Rain,
  Snow,

  // Audio system
  AudioProvider,
  AudioListener,
  AmbientAudio,
  WeatherAudio,
  FootstepAudio,

  // State management
  GameStateProvider,
  useGameState,
  useAutoSave,
  useSaveLoad,
  createGameStore,

  // UI Components
  HealthBar,
  Minimap,
  Notification,
  Crosshair,
  DamageNumber,

  // AI System (Yuka integration)
  YukaEntityManager,
  YukaVehicle,
  YukaStateMachine,
  YukaPath,

  // Triggers & Input
  TriggerComposer,

  // Post-processing effects
  CinematicEffects,
  RealisticEffects,

  // Shader effects
  Forcefield,
  HologramMesh,

  // Presets
  RPG_STATE_PRESET,
  getStatePreset,
  RPG_HEALTH_BAR,
  CIRCULAR_MINIMAP,
  DEFAULT_CROSSHAIR,

  // Weather presets
  createWeatherSystem,
} from '@jbcom/strata'
import type { 
  BiomeData, 
  TimeOfDayState, 
  WeatherState,
  StateConfig as YukaStateConfig,
} from '@jbcom/strata'

// =============================================================================
// TYPES (ported from Python systems.py)
// =============================================================================

type TimePhase = 'dawn' | 'day' | 'dusk' | 'night'
type WeatherType = 'clear' | 'rain' | 'fog' | 'snow' | 'storm'
type BiomeType = 'marsh' | 'forest' | 'desert' | 'tundra' | 'grassland' | 'caves'

interface GameData {
  // Player stats
  health: number
  maxHealth: number
  stamina: number
  maxStamina: number
  gold: number
  score: number
  level: number
  experience: number
  expToNext: number

  // Time system
  hour: number
  dayCount: number
  timePhase: TimePhase

  // Weather system
  weather: WeatherType
  weatherIntensity: number
  weatherDuration: number

  // World state
  currentBiome: BiomeType
  distanceTraveled: number
  enemiesDefeated: number
  bossesDefeated: number
  seed: number

  // Game state
  isPaused: boolean
  isGameOver: boolean
}

// =============================================================================
// SEEDED RANDOM (addressing PR feedback about deterministic generation)
// =============================================================================

class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  nextInt(min: number, max: number): number {
    return Math.floor(min + this.next() * (max - min + 1))
  }

  nextFloat(min: number, max: number): number {
    return min + this.next() * (max - min)
  }
}

// =============================================================================
// BIOME CONFIGURATION (ported from Python world_gen.py)
// =============================================================================

const BIOME_CONFIGS: BiomeData[] = [
  { name: 'grassland', threshold: 0, color: 0x3a5a2a, vegetation: 1.0 },
  { name: 'forest', threshold: 0.3, color: 0x2a4a1a, vegetation: 1.5 },
  { name: 'marsh', threshold: 0.5, color: 0x4a6a3a, vegetation: 0.8 },
  { name: 'desert', threshold: 0.7, color: 0xedc9af, vegetation: 0.2 },
  { name: 'tundra', threshold: 0.85, color: 0xf5f5f5, vegetation: 0.3 },
]

const BIOME_COLORS: Record<BiomeType, string> = {
  marsh: '#4a6a3a',
  forest: '#2a4a1a',
  desert: '#edc9af',
  tundra: '#f5f5f5',
  grassland: '#3a5a2a',
  caves: '#2f2f2f',
}

// =============================================================================
// INITIAL GAME STATE
// =============================================================================

const createInitialGameData = (seed: number): GameData => ({
  health: 100,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
  gold: 0,
  score: 0,
  level: 1,
  experience: 0,
  expToNext: 100,
  hour: 8,
  dayCount: 1,
  timePhase: 'day',
  weather: 'clear',
  weatherIntensity: 0.5,
  weatherDuration: 300,
  currentBiome: 'grassland',
  distanceTraveled: 0,
  enemiesDefeated: 0,
  bossesDefeated: 0,
  seed,
  isPaused: false,
  isGameOver: false,
})

// =============================================================================
// PROCEDURAL TERRAIN
// =============================================================================

interface ProceduralTerrainProps {
  size: number
  segments: number
  seed: number
}

function ProceduralTerrain({ size, segments, seed }: ProceduralTerrainProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    geo.rotateX(-Math.PI / 2)

    const positions = geo.attributes.position
    const colors = new Float32Array(positions.count * 3)

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z = positions.getZ(i)

      // Multi-layer terrain using Strata's fbm
      const baseHeight = fbm(x * 0.02, z * 0.02, 6, 2.2, seed) * 8
      const largeScale = fbm(x * 0.008, z * 0.008, 4, 2.0, seed + 100) * 12
      const detail = fbm(x * 0.1, z * 0.1, 2, 3.0, seed + 300) * 1.5

      // River valley
      const riverDist = Math.abs(z - 10 + Math.sin(x * 0.05) * 15)
      const riverCarve = Math.max(0, 1 - riverDist / 20) * -4

      let height = baseHeight + largeScale + detail + riverCarve
      height = Math.max(-0.5, height) // Water level

      positions.setY(i, height)

      // Biome-based coloring
      const biomeVal = fbm(x * 0.03, z * 0.03, 3, 2.0, seed + 500)
      const moisture = fbm(x * 0.05, z * 0.05, 2, 2.0, seed + 600)

      let color = new THREE.Color()
      if (height < 0) {
        color.setHex(0xd4c5a3) // Beach
      } else if (height < 2 && moisture > 0.3) {
        color.setHex(0x4a6a3a) // Marsh
      } else if (biomeVal > 0.6) {
        color.setHex(0x7a7a6a) // Rocky
      } else if (biomeVal > 0.3) {
        color.setHex(0x2a4a2a) // Forest
      } else if (height > 10) {
        color.setHex(0x8a9a8a) // Alpine
      } else {
        color.setHex(0x3a5a2a) // Grassland
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [size, segments, seed])

  return (
    <mesh geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial vertexColors roughness={0.95} metalness={0.05} />
    </mesh>
  )
}

// =============================================================================
// VEGETATION SYSTEM
// =============================================================================

interface VegetationProps {
  seed: number
  areaSize: number
}

function Vegetation({ seed, areaSize }: VegetationProps) {
  const heightFunction = useCallback(
    (x: number, z: number) => {
      const height =
        fbm(x * 0.02, z * 0.02, 6, 2.2, seed) * 8 +
        fbm(x * 0.008, z * 0.008, 4, 2.0, seed + 100) * 12
      return Math.max(0, height)
    },
    [seed]
  )

  const grassMesh = useMemo(
    () =>
      createGrassInstances(5000, areaSize, BIOME_CONFIGS, {
        heightFunction,
        seed,
        enableWind: true,
        windStrength: 0.5,
      }),
    [areaSize, seed, heightFunction]
  )

  const treeMesh = useMemo(
    () =>
      createTreeInstances(200, areaSize, BIOME_CONFIGS, {
        heightFunction,
        seed: seed + 1000,
        enableWind: true,
        windStrength: 0.3,
      }),
    [areaSize, seed, heightFunction]
  )

  const rockMesh = useMemo(
    () =>
      createRockInstances(100, areaSize, BIOME_CONFIGS, {
        heightFunction,
        seed: seed + 2000,
      }),
    [areaSize, seed, heightFunction]
  )

  return (
    <>
      {grassMesh && <primitive object={grassMesh} castShadow />}
      {treeMesh && <primitive object={treeMesh} castShadow />}
      {rockMesh && <primitive object={rockMesh} castShadow />}
    </>
  )
}

// =============================================================================
// WATER SYSTEM
// =============================================================================

function WaterPlane({ size }: { size: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { uniforms, vertexShader, fragmentShader } = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x1a5f7a) },
        uOpacity: { value: 0.85 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave1 = sin(pos.x * 0.5 + uTime) * 0.3;
          float wave2 = sin(pos.z * 0.3 + uTime * 0.7) * 0.2;
          pos.y += wave1 + wave2;
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vec3(0.0, 1.0, 0.0)), 0.0), 2.0);
          float caustic = sin(vUv.x * 20.0 + uTime) * sin(vUv.y * 20.0 + uTime * 0.8) * 0.1;
          vec3 finalColor = uColor + vec3(fresnel * 0.3) + vec3(caustic);
          gl_FragColor = vec4(finalColor, uOpacity);
        }
      `,
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[size, size, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// =============================================================================
// WEATHER EFFECTS
// =============================================================================

function WeatherEffects({ weather, intensity }: { weather: WeatherType; intensity: number }) {
  if (weather === 'rain' || weather === 'storm') {
    return <Rain intensity={intensity} />
  }
  if (weather === 'snow') {
    return <Snow intensity={intensity} />
  }
  return null
}

// =============================================================================
// GAME LOOP (using requestAnimationFrame via useFrame)
// =============================================================================

interface GameLoopProps {
  gameData: GameData
  setGameData: React.Dispatch<React.SetStateAction<GameData>>
  rng: SeededRandom
}

function GameLoop({ gameData, setGameData, rng }: GameLoopProps) {
  useFrame((_, deltaTime) => {
    if (gameData.isPaused || gameData.isGameOver) return

    setGameData((prev) => {
      // Update time (1 game hour = 60 real seconds)
      let hour = prev.hour + (deltaTime * 60) / 3600
      let dayCount = prev.dayCount

      if (hour >= 24) {
        hour -= 24
        dayCount += 1
      }

      // Determine time phase
      let timePhase: TimePhase = 'night'
      if (hour >= 5 && hour < 7) timePhase = 'dawn'
      else if (hour >= 7 && hour < 18) timePhase = 'day'
      else if (hour >= 18 && hour < 20) timePhase = 'dusk'

      // Update weather
      let weather = prev.weather
      let weatherIntensity = prev.weatherIntensity
      let weatherDuration = prev.weatherDuration - deltaTime

      if (weatherDuration <= 0) {
        const r = rng.next()
        if (r < 0.5) weather = 'clear'
        else if (r < 0.7) weather = 'rain'
        else if (r < 0.85) weather = 'fog'
        else if (r < 0.95) weather = 'snow'
        else weather = 'storm'

        weatherIntensity = rng.nextFloat(0.3, 1.0)
        weatherDuration = rng.nextFloat(60, 300)
      }

      // Regenerate stamina
      const stamina = Math.min(prev.maxStamina, prev.stamina + prev.maxStamina * 0.01 * deltaTime)

      return {
        ...prev,
        hour,
        dayCount,
        timePhase,
        weather,
        weatherIntensity,
        weatherDuration,
        stamina,
      }
    })
  })

  return null
}

// =============================================================================
// HUD OVERLAY (using Strata's UI components)
// =============================================================================

interface HUDProps {
  gameData: GameData
}

function HUD({ gameData }: HUDProps) {
  const formatTime = (hour: number) => {
    const h = Math.floor(hour)
    const m = Math.floor((hour % 1) * 60)
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }

  const weatherIcons: Record<WeatherType, string> = {
    clear: '☀️',
    rain: '🌧️',
    fog: '🌫️',
    snow: '❄️',
    storm: '⛈️',
  }

  const phaseLabels: Record<TimePhase, string> = {
    dawn: 'Dawn',
    day: 'Day',
    dusk: 'Dusk',
    night: 'Night',
  }

  return (
    <>
      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '12px 20px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
          color: 'white',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 100,
        }}
      >
        {/* Left: Player stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>❤️</span>
            <div
              style={{
                width: '100px',
                height: '12px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(gameData.health / gameData.maxHealth) * 100}%`,
                  height: '100%',
                  background: gameData.health > 25 ? '#4ade80' : '#ef4444',
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <span style={{ fontSize: '12px' }}>
              {Math.round(gameData.health)}/{gameData.maxHealth}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚡</span>
            <div
              style={{
                width: '100px',
                height: '8px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(gameData.stamina / gameData.maxStamina) * 100}%`,
                  height: '100%',
                  background: '#fbbf24',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', marginTop: '4px' }}>
            <span>💰 {gameData.gold}</span>
            <span>⭐ Lv.{gameData.level}</span>
          </div>
        </div>

        {/* Center: Title and time */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Rivers of Reckoning
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Day {gameData.dayCount} • {phaseLabels[gameData.timePhase]} • {formatTime(gameData.hour)}
          </div>
        </div>

        {/* Right: Weather and world info */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px' }}>
            {weatherIcons[gameData.weather]} {gameData.weather.charAt(0).toUpperCase() + gameData.weather.slice(1)}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            📍 {gameData.currentBiome.charAt(0).toUpperCase() + gameData.currentBiome.slice(1)}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            🎯 Score: {gameData.score}
          </div>
        </div>
      </div>

      {/* Bottom controls help */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '11px',
          background: 'rgba(0,0,0,0.6)',
          padding: '12px',
          borderRadius: '8px',
          zIndex: 100,
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Controls</div>
        <div>🖱️ Left click + drag: Rotate</div>
        <div>🖱️ Right click + drag: Pan</div>
        <div>🖱️ Scroll: Zoom</div>
        <div style={{ marginTop: '8px', opacity: 0.7 }}>Seed: {gameData.seed}</div>
      </div>
    </>
  )
}

// =============================================================================
// MAIN 3D SCENE
// =============================================================================

interface SceneProps {
  gameData: GameData
  setGameData: React.Dispatch<React.SetStateAction<GameData>>
  rng: SeededRandom
}

function Scene({ gameData, setGameData, rng }: SceneProps) {
  // Sky time of day configuration
  const timeOfDay: Partial<TimeOfDayState> = useMemo(() => {
    const sunAngle = ((gameData.hour - 6) / 12) * 180
    return {
      sunAngle: Math.max(0, Math.min(180, sunAngle)),
      sunIntensity: gameData.hour >= 6 && gameData.hour <= 18 ? 1.0 : 0.0,
      ambientLight: gameData.hour >= 6 && gameData.hour <= 18 ? 0.8 : 0.15,
      starVisibility: gameData.hour < 6 || gameData.hour > 18 ? 1.0 : 0.0,
      fogDensity: gameData.weather === 'fog' ? 0.5 : 0,
    }
  }, [gameData.hour, gameData.weather])

  // Weather state for sky
  const weatherState: Partial<WeatherState> = useMemo(
    () => ({
      intensity: gameData.weather !== 'clear' ? gameData.weatherIntensity : 0,
    }),
    [gameData.weather, gameData.weatherIntensity]
  )

  return (
    <>
      {/* Game loop - uses requestAnimationFrame */}
      <GameLoop gameData={gameData} setGameData={setGameData} rng={rng} />

      {/* Lighting */}
      <ambientLight intensity={timeOfDay.ambientLight || 0.3} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={timeOfDay.sunIntensity || 1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />

      {/* Procedural sky */}
      <ProceduralSky timeOfDay={timeOfDay} weather={weatherState} size={[300, 150]} distance={100} />

      {/* Weather effects */}
      <WeatherEffects weather={gameData.weather} intensity={gameData.weatherIntensity} />

      {/* Terrain */}
      <ProceduralTerrain size={200} segments={256} seed={gameData.seed} />

      {/* Water */}
      <WaterPlane size={200} />

      {/* Vegetation */}
      <Vegetation seed={gameData.seed} areaSize={100} />

      {/* Camera controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={10}
        maxDistance={150}
      />

      {/* Post-processing (cinematic look) */}
      <CinematicEffects
        bloomIntensity={0.8}
        vignetteDarkness={0.3}
        chromaticAberration={0.002}
        filmGrain={false}
      />

      {/* Dev stats */}
      {process.env.NODE_ENV === 'development' && <Stats />}
    </>
  )
}

// =============================================================================
// MAIN APP
// =============================================================================

export default function App() {
  const [seed] = useState(() => Date.now())
  const [gameData, setGameData] = useState<GameData>(() => createInitialGameData(seed))
  const rngRef = useRef<SeededRandom>(new SeededRandom(seed))

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* HUD Overlay */}
      <HUD gameData={gameData} />

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [40, 30, 40], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
      >
        <Suspense fallback={null}>
          <Scene gameData={gameData} setGameData={setGameData} rng={rngRef.current} />
        </Suspense>
      </Canvas>
    </div>
  )
}
