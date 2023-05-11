import { useEffect, useState } from 'react'
import { range, sample } from 'lodash'
import { animated, easings, useInView, useSpring } from '@react-spring/web'

interface SunProps {
  className?: string
  outerColor?: string
  innerColor?: string
  animationDuration?: number
}

const OUTER_PATHS = [
  'M0 108.2C-12 108.2 -24 108.2 -33.4 102.9C-42.9 97.6 -49.7 87 -57.6 79.3C-65.5 71.5 -74.4 66.6 -81.7 59.4C-89 52.1 -94.8 42.4 -98.9 32.1C-103.1 21.8 -105.6 10.9 -108.2 0L0 0Z',
  'M0 108.2C-11.7 107.7 -23.4 107.3 -33.4 102.9C-43.4 98.5 -51.6 90.1 -60 82.5C-68.3 74.9 -76.7 68.1 -81.7 59.4C-86.7 50.7 -88.4 40.2 -92.3 30C-96.1 19.8 -102.1 9.9 -108.2 0L0 0Z',
  'M0 108.2C-11.1 105.7 -22.2 103.2 -32.1 98.9C-42.1 94.6 -50.9 88.6 -60 82.5C-69 76.5 -78.1 70.4 -85.8 62.3C-93.4 54.2 -99.4 44.1 -102.9 33.4C-106.3 22.7 -107.3 11.4 -108.2 0L0 0Z',
  'M0 108.2C-11.5 106.4 -23 104.6 -32.4 99.9C-41.9 95.1 -49.4 87.5 -59.4 81.7C-69.4 75.9 -81.9 72.1 -87.5 63.6C-93.1 55.1 -91.9 42 -94.2 30.6C-96.4 19.2 -102.3 9.6 -108.2 0L0 0Z',
  'M0 108.2C-10.6 105.2 -21.2 102.2 -32.1 98.9C-43 95.6 -54.2 92.1 -61.7 84.9C-69.2 77.8 -73 66.9 -80.1 58.2C-87.2 49.4 -97.6 42.8 -102.9 33.4C-108.1 24.1 -108.1 12 -108.2 0L0 0Z'
]

const INNER_PATHS = [
  'M0 54.1C-6 54.1 -12 54.1 -16.7 51.4C-21.4 48.8 -24.9 43.5 -28.8 39.6C-32.7 35.8 -37.2 33.3 -40.9 29.7C-44.5 26 -47.4 21.2 -49.5 16.1C-51.5 10.9 -52.8 5.5 -54.1 0L0 0Z',
  'M0 54.1C-5.9 53.9 -11.7 53.6 -16.7 51.4C-21.7 49.2 -25.8 45.1 -30 41.3C-34.1 37.5 -38.3 34 -40.9 29.7C-43.4 25.3 -44.2 20.1 -46.1 15C-48 9.9 -51.1 4.9 -54.1 0L0 0Z',
  'M0 54.1C-5.5 52.8 -11.1 51.6 -16.1 49.5C-21.1 47.3 -25.5 44.3 -30 41.3C-34.5 38.2 -39.1 35.2 -42.9 31.2C-46.7 27.1 -49.7 22.1 -51.4 16.7C-53.2 11.4 -53.6 5.7 -54.1 0L0 0Z',
  'M0 54.1C-5.7 53.2 -11.5 52.3 -16.2 49.9C-21 47.6 -24.7 43.7 -29.7 40.9C-34.7 38 -40.9 36 -43.8 31.8C-46.6 27.5 -45.9 21 -47.1 15.3C-48.2 9.6 -51.2 4.8 -54.1 0L0 0Z',
  'M0 54.1C-5.3 52.6 -10.6 51.1 -16.1 49.5C-21.5 47.8 -27.1 46.1 -30.9 42.5C-34.6 38.9 -36.5 33.5 -40 29.1C-43.6 24.7 -48.8 21.4 -51.4 16.7C-54.1 12 -54.1 6 -54.1 0L0 0Z'
]

export default function Sun({
  className,
  outerColor = '#fdb813',
  innerColor = '#fce570',
  animationDuration = 2000
}: SunProps) {
  const [ref, inView] = useInView()
  const [currentPath, setCurrentPath] = useState(0)

  const [{ d: outer }, setOuter] = useSpring(() => ({
    d: OUTER_PATHS[0],
    config: { duration: animationDuration, easing: easings.easeOutSine }
  }))

  const [{ d: inner }, setInner] = useSpring(() => ({
    d: INNER_PATHS[0],
    config: { duration: animationDuration, easing: easings.easeInOutSine }
  }))

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        const paths = range(OUTER_PATHS.length)
        paths.splice(currentPath, 1)
        const newPath = sample(paths) as number

        setOuter({ d: OUTER_PATHS[newPath] })
        setInner({ d: INNER_PATHS[newPath] })
        setCurrentPath(newPath)
      }, animationDuration)

      return () => clearInterval(timeout)
    }
  }, [inView, currentPath])

  return (
    <svg
      viewBox="0 0 110 110"
      preserveAspectRatio="none"
      className={className}
      ref={ref}
    >
      {inView && (
        <g transform="translate(110, 0)">
          <animated.path d={outer} fill={outerColor} className="outer" />
          <animated.path d={inner} fill={innerColor} className="inner" />
        </g>
      )}
    </svg>
  )
}
