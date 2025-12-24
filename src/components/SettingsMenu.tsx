/**
 * Settings Menu - Volume and Game Controls
 */

import { Typography, Button, Container, Stack, Slider, FormControlLabel, Switch, Box } from '@mui/material'
import { ArrowBack, VolumeUp, Visibility } from '@mui/icons-material'
import { useGameStore } from '../store/gameStore'

export function SettingsMenu() {
  const { settings, updateSettings, setGameState, isInGame } = useGameStore()

  const handleBack = () => {
    if (isInGame) {
      setGameState('paused')
    } else {
      setGameState('title')
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            background: 'linear-gradient(180deg, #1e1e1e 0%, #2d2d2d 100%)',
            borderRadius: '12px',
            padding: '40px',
            border: '2px solid #2196F3',
            boxShadow: '0 0 40px rgba(33, 150, 243, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '1.5rem',
              mb: 4,
              color: '#2196F3',
              textAlign: 'center',
            }}
          >
            SETTINGS
          </Typography>

          <Stack spacing={4}>
            {/* Volume Controls */}
            <Box>
              <Typography variant="overline" sx={{ color: '#2196F3', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <VolumeUp fontSize="small" /> Audio
              </Typography>
              
              <Box sx={{ px: 2 }}>
                <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, fontSize: '0.7rem' }}>Master Volume</Typography>
                <Slider
                  value={settings.masterVolume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(_, value) => updateSettings({ masterVolume: value as number })}
                  sx={{ color: '#2196F3' }}
                />

                <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, fontSize: '0.7rem' }}>Music Volume</Typography>
                <Slider
                  value={settings.musicVolume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(_, value) => updateSettings({ musicVolume: value as number })}
                  sx={{ color: '#2196F3' }}
                />

                <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, fontSize: '0.7rem' }}>SFX Volume</Typography>
                <Slider
                  value={settings.sfxVolume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(_, value) => updateSettings({ sfxVolume: value as number })}
                  sx={{ color: '#2196F3' }}
                />
              </Box>
            </Box>

            {/* Graphics Controls */}
            <Box>
              <Typography variant="overline" sx={{ color: '#2196F3', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Visibility fontSize="small" /> Graphics
              </Typography>
              
              <Box sx={{ px: 2 }}>
                <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, fontSize: '0.7rem' }}>Field of View (FOV)</Typography>
                <Slider
                  value={settings.fov}
                  min={40}
                  max={100}
                  step={1}
                  onChange={(_, value) => updateSettings({ fov: value as number })}
                  sx={{ color: '#2196F3' }}
                />

                <FormControlLabel
                  control={
                    <Switch 
                      checked={settings.showFPS} 
                      onChange={(e) => updateSettings({ showFPS: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#2196F3' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#2196F3' },
                      }}
                    />
                  }
                  label={<Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Show FPS Counter</Typography>}
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              startIcon={<ArrowBack />}
              onClick={handleBack}
              sx={{
                mt: 2,
                py: 1.5,
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '0.7rem',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              }}
            >
              BACK
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  )
}
