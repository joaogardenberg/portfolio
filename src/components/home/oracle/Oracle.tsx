import { useEffect, useState } from 'react'
import { useScroll, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import Sun from './Sun'

const StyledOracle = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;

  svg {
    transition: all 150ms ease-in-out;

    path {
      filter: drop-shadow(0 0 1px #00000088);
    }
  }

  .sun {
    height: 20vh;
  }

  &:focus,
  &:hover {
    svg {
      filter: drop-shadow(0 0 1.25rem #00000088);
    }

    .sun {
      height: 25vh;
    }
  }
`

export default function Oracle() {
  const [height, setHeight] = useState(0)

  const [{ scrollSpring }, set] = useSpring(() => ({
    scrollSpring: 0,
    config: { duration: 0 }
  }))

  useScroll({
    onChange: ({ value: { scrollY } }) => set({ scrollSpring: scrollY })
  })

  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <StyledOracle className="oracle">
      <Sun
        className="sun"
        outerColor={
          scrollSpring.to({
            range: [0, (height * 5) / 6],
            output: ['#fdb813', '#e6680e'],
            extrapolate: 'clamp'
          }) as unknown as string
        }
        innerColor={
          scrollSpring.to({
            range: [0, (height * 5) / 6],
            output: ['#fce570', '#e68c0e'],
            extrapolate: 'clamp'
          }) as unknown as string
        }
      />
    </StyledOracle>
  )
}
