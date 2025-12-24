import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Container,
  Paper,
  Grid,
} from '@mui/material'
import { AutoAwesome, ArrowBack } from '@mui/icons-material'
import { useGameStore } from '../store/gameStore'
import { GameFeatures } from '../types/game'

export function FeatureMenu() {
  const { features, toggleFeature, setGameState } = useGameStore()

  const featureLabels: Record<keyof GameFeatures, string> = {
    postProcessing: 'Post-Processing Effects',
    shadows: 'Real-time Shadows',
    vegetation: 'Dense Vegetation',
    waterReflections: 'Water Reflections',
    dynamicWeather: 'Dynamic Weather System',
    dayNightCycle: 'Day/Night Cycle',
  }

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
            <AutoAwesome sx={{ mr: 2, color: '#2196F3' }} />
            <Typography variant="h4" sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: '1.5rem' }}>
              FEATURES
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 4, opacity: 0.7 }}>
            Toggle game features and experimental systems. These settings affect both performance and gameplay experience.
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {(Object.keys(features) as Array<keyof GameFeatures>).map((key) => (
              <Grid item xs={12} key={key}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1,
                    px: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body1">{featureLabels[key]}</Typography>
                  <Switch
                    checked={features[key]}
                    onChange={() => toggleFeature(key)}
                    color="secondary"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<ArrowBack />}
            onClick={() => setGameState('title')}
            sx={{
              mt: 2,
              color: 'white',
              borderColor: '#2196F3',
              '&:hover': { borderColor: '#64B5F6', background: 'rgba(33, 150, 243, 0.1)' },
            }}
          >
            BACK TO MENU
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}
