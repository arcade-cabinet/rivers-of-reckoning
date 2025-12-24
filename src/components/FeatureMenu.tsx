/**
 * Feature Toggle Menu - Experimental and Debug Features
 */

import { Typography, Button, Container, Stack, FormControlLabel, Switch, Box } from '@mui/material'
import { ArrowBack, BugReport, Bolt, Shield, Map, GpsFixed } from '@mui/icons-material'
import { useGameStore } from '../store/gameStore'

export function FeatureMenu() {
  const { features, updateFeatures, setGameState, isInGame } = useGameStore()

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
            border: '2px solid #FF9800',
            boxShadow: '0 0 40px rgba(255, 152, 0, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '1.5rem',
              mb: 4,
              color: '#FF9800',
              textAlign: 'center',
            }}
          >
            FEATURES
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="overline" sx={{ color: '#FF9800', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BugReport fontSize="small" /> Experimental Toggles
              </Typography>
              
              <Stack spacing={1} sx={{ px: 2 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={features.debugMode} 
                      onChange={(e) => updateFeatures({ debugMode: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF9800' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF9800' },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BugReport sx={{ fontSize: '1rem', opacity: 0.7 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Debug Mode</Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch 
                      checked={features.infiniteStamina} 
                      onChange={(e) => updateFeatures({ infiniteStamina: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF9800' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF9800' },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Bolt sx={{ fontSize: '1rem', opacity: 0.7 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Infinite Stamina</Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch 
                      checked={features.invincibility} 
                      onChange={(e) => updateFeatures({ invincibility: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF9800' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF9800' },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Shield sx={{ fontSize: '1rem', opacity: 0.7 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Invincibility</Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch 
                      checked={features.showMiniMap} 
                      onChange={(e) => updateFeatures({ showMiniMap: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF9800' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF9800' },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Map sx={{ fontSize: '1rem', opacity: 0.7 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Show Mini-map</Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch 
                      checked={features.showCoordinates} 
                      onChange={(e) => updateFeatures({ showCoordinates: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF9800' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF9800' },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <GpsFixed sx={{ fontSize: '1rem', opacity: 0.7 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Show Coordinates</Typography>
                    </Box>
                  }
                />
              </Stack>
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
                background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
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
