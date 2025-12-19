"""ECS Components for Rivers of Reckoning.

Inspired by Otterfall's component architecture.
Components are pure data structures - no methods.
"""

from dataclasses import dataclass, field
from typing import Optional
from enum import Enum, auto


class BiomeType(Enum):
    """Available biome types in the game world."""
    MARSH = auto()      # Starting biome - waterlogged, reeds
    FOREST = auto()     # Dense trees, moderate difficulty
    DESERT = auto()     # Hot, resource-scarce
    TUNDRA = auto()     # Cold, stamina drain
    CAVES = auto()      # Underground, procedural dungeons


class WeatherType(Enum):
    """Weather conditions affecting gameplay."""
    CLEAR = auto()
    RAIN = auto()
    FOG = auto()
    SNOW = auto()
    STORM = auto()


class TimePhase(Enum):
    """Time of day phases."""
    DAWN = auto()
    DAY = auto()
    DUSK = auto()
    NIGHT = auto()


class EntityState(Enum):
    """Entity behavioral states."""
    IDLE = auto()
    WANDERING = auto()
    CHASING = auto()
    FLEEING = auto()
    ATTACKING = auto()
    DEAD = auto()


class CombatArchetype(Enum):
    """Combat style archetypes for balanced gameplay."""
    TANK = auto()       # High HP, low dodge
    AGILE = auto()      # Low HP, high dodge
    BALANCED = auto()   # Medium stats


@dataclass
class Position:
    """2D position component."""
    x: float = 0.0
    y: float = 0.0


@dataclass
class Velocity:
    """Movement velocity component."""
    dx: float = 0.0
    dy: float = 0.0
    max_speed: float = 1.0


@dataclass
class Health:
    """Health component for damageable entities."""
    current: int = 10
    maximum: int = 10
    regeneration: float = 0.0  # HP per second


@dataclass
class Stamina:
    """Stamina component for actions."""
    current: int = 100
    maximum: int = 100
    regeneration: float = 5.0  # Per second


@dataclass
class Combat:
    """Combat stats component."""
    archetype: CombatArchetype = CombatArchetype.BALANCED
    attack_damage: int = 2
    armor: float = 0.0      # Damage reduction (0-1)
    dodge_chance: float = 0.1  # Chance to avoid attack (0-1)
    attack_cooldown: float = 0.0  # Seconds until next attack


@dataclass
class Player:
    """Tag component identifying the player entity."""
    gold: int = 0
    score: int = 0
    level: int = 1
    experience: int = 0
    exp_to_next: int = 10
    mana: int = 5
    max_mana: int = 5


@dataclass
class Enemy:
    """Enemy component with AI state."""
    name: str = "Goblin"
    state: EntityState = EntityState.IDLE
    detection_range: float = 3.0
    attack_range: float = 1.0
    is_boss: bool = False


@dataclass
class Species:
    """Species definition for enemies."""
    species_id: str = "goblin"
    display_name: str = "Goblin"
    is_predator: bool = True
    size: str = "medium"  # tiny, small, medium, large


@dataclass
class Renderable:
    """Visual rendering component."""
    color: int = 8  # Color palette index
    size: int = 8   # Sprite size
    visible: bool = True


@dataclass
class Tile:
    """Map tile component."""
    tile_type: str = "."
    walkable: bool = True
    biome: BiomeType = BiomeType.MARSH


@dataclass
class TimeOfDay:
    """Global time component (singleton)."""
    hour: float = 6.0  # 0-24
    phase: TimePhase = TimePhase.DAWN
    time_scale: float = 1.0  # Speed multiplier


@dataclass
class Weather:
    """Global weather component (singleton)."""
    current: WeatherType = WeatherType.CLEAR
    intensity: float = 0.5
    duration: float = 300.0  # Seconds remaining
    wind_speed: float = 0.0
    wind_direction: float = 0.0  # Radians


@dataclass
class WorldState:
    """Global world state component (singleton)."""
    current_biome: BiomeType = BiomeType.MARSH
    difficulty_scale: float = 1.0
    enemies_defeated: int = 0
    bosses_defeated: int = 0


# Biome stat modifiers
BIOME_MODIFIERS = {
    BiomeType.MARSH: {
        "stamina_drain": 1.1,
        "movement_speed": 0.85,
        "visibility": 0.7,
        "enemy_spawn_rate": 0.3,
        "colors": {"ground": 4, "accent": 11, "water": 12},
    },
    BiomeType.FOREST: {
        "stamina_drain": 1.0,
        "movement_speed": 0.9,
        "visibility": 0.6,
        "enemy_spawn_rate": 0.4,
        "colors": {"ground": 3, "accent": 11, "water": 12},
    },
    BiomeType.DESERT: {
        "stamina_drain": 1.5,
        "movement_speed": 1.0,
        "visibility": 1.0,
        "enemy_spawn_rate": 0.2,
        "colors": {"ground": 10, "accent": 9, "water": 12},
    },
    BiomeType.TUNDRA: {
        "stamina_drain": 1.3,
        "movement_speed": 0.7,
        "visibility": 0.8,
        "enemy_spawn_rate": 0.25,
        "colors": {"ground": 7, "accent": 12, "water": 1},
    },
    BiomeType.CAVES: {
        "stamina_drain": 1.0,
        "movement_speed": 0.8,
        "visibility": 0.4,
        "enemy_spawn_rate": 0.5,
        "colors": {"ground": 5, "accent": 13, "water": 1},
    },
}


# Combat archetype stats
COMBAT_STATS = {
    CombatArchetype.TANK: {
        "max_health": 15,
        "max_stamina": 80,
        "armor": 0.3,
        "dodge_chance": 0.05,
        "attack_damage": 3,
    },
    CombatArchetype.AGILE: {
        "max_health": 8,
        "max_stamina": 120,
        "armor": 0.05,
        "dodge_chance": 0.35,
        "attack_damage": 2,
    },
    CombatArchetype.BALANCED: {
        "max_health": 10,
        "max_stamina": 100,
        "armor": 0.15,
        "dodge_chance": 0.15,
        "attack_damage": 2,
    },
}
