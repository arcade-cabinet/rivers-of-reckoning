# Configuration file for the Sphinx documentation builder.
# This builds the GAME MANUAL for players, not API documentation.

project = "Rivers of Reckoning - Game Manual"
copyright = "2025, Rivers of Reckoning Team"
author = "Rivers of Reckoning Team"
release = "0.5.0"

# No autodoc needed - this is a game manual, not library documentation
extensions = [
    "sphinx_rtd_theme",
]

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

html_theme = "sphinx_rtd_theme"
html_static_path = ["_static"]

# Game manual theme options
html_theme_options = {
    "navigation_depth": 3,
    "titles_only": False,
}

# Suppress warnings about missing references (we're not doing API docs)
suppress_warnings = ["ref.python"]
