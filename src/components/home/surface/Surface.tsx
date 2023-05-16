import { useEffect, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useScroll, useSpring } from '@react-spring/web'
import classNames from 'classnames'
import { ReactComponent as Stars } from 'svgs/stars.svg'
import StyledSurface from './Surface.styled'
import Ocean from './Ocean'

export default function Surface() {
  const { height, ref } = useResizeDetector()
  const [firstRender, setFirstRender] = useState(true)
  const [scroll, setScroll] = useState(0)

  const scrollMin = useMemo(
    () => ref.current?.offsetTop as number,
    [ref.current]
  )

  const scrollMax = useMemo(
    () => scrollMin + (height || 0),
    [scrollMin, height]
  )

  const inView = scroll >= scrollMin && scroll < scrollMax

  const [{ scrollSpring }, set] = useSpring(() => ({
    scrollSpring: 0,
    config: { duration: 0 }
  }))

  useScroll({
    onChange: ({ value: { scrollY } }) => setScroll(scrollY),
    config: { duration: 200 }
  })

  useEffect(() => {
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if (inView) {
      set({ scrollSpring: scroll })
    }
  }, [inView, scroll])

  return (
    <StyledSurface
      style={{
        backgroundColor: scrollSpring.to({
          range: [scrollMin, (scrollMax - scrollMin) / 3, (scrollMax * 3) / 4],
          output: ['#8ae5ff', '#fb9062', '#0c1445'],
          extrapolate: 'clamp'
        })
      }}
      ref={ref}
    >
      <Stars
        className="stars"
        style={{
          opacity:
            scrollSpring
              .to({
                range: [(scrollMax - scrollMin) / 2, (scrollMax * 2) / 3],
                output: [0, 1],
                extrapolate: 'clamp'
              })
              .get() || 0
        }}
      />
      <Ocean
        className={classNames('ocean', { in: !firstRender })}
        topColor={
          scrollSpring.to({
            range: [scrollMin, (scrollMax * 5) / 6],
            output: ['#47d5fc', '#4096ad'],
            extrapolate: 'clamp'
          }) as unknown as string
        }
        middleColor={
          scrollSpring.to({
            range: [scrollMin, (scrollMax * 5) / 6],
            output: ['#1cbeeb', '#1f8cab'],
            extrapolate: 'clamp'
          }) as unknown as string
        }
      />
    </StyledSurface>
  )
}
