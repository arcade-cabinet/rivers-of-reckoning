import {
  Box,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
  Button,
  Container,
  Paper,
} from '@mui/material'
import { VolumeUp, Settings as SettingsIcon, ArrowBack } from '@mui/icons-material'
import { useGameStore } from '../store/gameStore'

export function SettingsMenu() {
  const { settings, updateSettings, setGameState } = useGameStore()

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        color: 'white',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            p: 4,
            background: '#1e1e1e',
            color: 'white',
            borderRadius: 2,
            border: '1px solid #333',
          }}
        >
          <Box display="flex" alignItems="center" mb={4}>
            <SettingsIcon sx={{ mr: 2, color: '#4CAF50' }} />
            <Typography variant="h4" sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: '1.5rem' }}>
              SETTINGS
            </Typography>
          </Box>

          <Box mb={4}>
            <Typography gutterBottom display="flex" alignItems="center">
              <VolumeUp sx={{ mr: 1, fontSize: 20 }} /> Master Volume
            </Typography>
            <Slider
              value={settings.masterVolume}
              min={0}
              max={1}
              step={0.01}
              onChange={(_, val) => updateSettings({ masterVolume: val as number })}
              sx={{ color: '#4CAF50' }}
            />
          </Box>

          <Box mb={4}>
            <Typography gutterBottom>Music Volume</Typography>
            <Slider
              value={settings.musicVolume}
              min={0}
              max={1}
              step={0.01}
              onChange={(_, val) => updateSettings({ musicVolume: val as number })}
              sx={{ color: '#2196F3' }}
            />
          </Box>

          <Box mb={4}>
            <Typography gutterBottom>SFX Volume</Typography>
            <Slider
              value={settings.sfxVolume}
              min={0}
              max={1}
              step={0.01}
              onChange={(_, val) => updateSettings({ sfxVolume: val as number })}
              sx={{ color: '#FF9800' }}
            />
          </Box>

          <Box mb={4} display="flex" flexDirection="column" gap={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showFPS}
                  onChange={(e) => updateSettings({ showFPS: e.target.checked })}
                  color="primary"
                />
              }
              label="Show FPS Counter"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.invertY}
                  onChange={(e) => updateSettings({ invertY: e.target.checked })}
                  color="primary"
                />
              }
              label="Invert Y-Axis"
            />
          </Box>

          <Box mb={4}>
            <Typography gutterBottom>Mouse Sensitivity</Typography>
            <Slider
              value={settings.sensitivity}
              min={0.1}
              max={5}
              step={0.1}
              onChange={(_, val) => updateSettings({ sensitivity: val as number })}
              sx={{ color: '#9C27B0' }}
            />
          </Box>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<ArrowBack />}
            onClick={() => setGameState('title')}
            sx={{
              mt: 2,
              color: 'white',
              borderColor: '#4CAF50',
              '&:hover': { borderColor: '#81C784', background: 'rgba(76, 175, 80, 0.1)' },
            }}
          >
            BACK TO MENU
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}
