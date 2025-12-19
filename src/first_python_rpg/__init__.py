"""First Python RPG - Rivers of Reckoning - A retro-style RPG game built with Pygame-ce."""

__version__ = "0.3.0"
__author__ = "Your Name"
__email__ = "you@example.com"
__description__ = "A Python RPG game built with Pygame-ce, featuring procedural generation and web deployment via pygbag."

from .game import Game
from .player import Player
from .enemy import Enemy

__all__ = ["Game", "Player", "Enemy"]
