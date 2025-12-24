import React, { useEffect, useRef, useState } from 'react'
import nipplejs from 'nipplejs'
import { useGameStore } from '../store/gameStore'

interface VirtualJoystickProps {
  size?: number
  position?: { bottom: string | number; left?: string | number; right?: string | number }
  color?: string
  type?: 'move' | 'look'
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  size = 120,
  position = { bottom: '40px', left: '40px' },
  color = 'white',
  type = 'move',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const managerRef = useRef<nipplejs.JoystickManager | null>(null)
  const { setJoystickInput, setLookInput } = useGameStore()
  const [isVisible, setIsVisible] = useState(() => {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  })

  // Detect touch support and keyboard usage
  useEffect(() => {
    const handleKeyDown = () => {
      // If keyboard is detected, we could hide the joystick
      // but only if we're not currently using it
      setIsVisible(false)
    }

    const handleTouchStart = () => {
      setIsVisible(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !isVisible) {
      if (managerRef.current) {
        managerRef.current.destroy()
        managerRef.current = null
      }
      return
    }

    const manager = nipplejs.create({
      zone: containerRef.current,
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: color,
      size: size,
      restOpacity: 0.5,
      catchDistance: 150,
    })

    managerRef.current = manager

    manager.on('move', (_, data) => {
      if (data.vector) {
        if (type === 'move') {
          setJoystickInput({
            x: data.vector.x,
            y: -data.vector.y, // Inverse Y for moveZ
          })
        } else {
          setLookInput({
            x: data.vector.x,
            y: data.vector.y,
          })
        }
      }
    })

    manager.on('start', () => {
      if ('vibrate' in navigator) {
        navigator.vibrate(10)
      }
    })

    manager.on('end', () => {
      if (type === 'move') {
        setJoystickInput({ x: 0, y: 0 })
      } else {
        setLookInput({ x: 0, y: 0 })
      }
      if ('vibrate' in navigator) {
        navigator.vibrate(5)
      }
    })

    return () => {
      manager.destroy()
    }
  }, [isVisible, setJoystickInput, setLookInput, size, color, type])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        width: size,
        height: size,
        zIndex: 1000,
        touchAction: 'none',
        pointerEvents: 'auto',
      }}
    />
  )
}
