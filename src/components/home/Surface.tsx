import { useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { animated, useScroll, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import Ocean from 'components/common/Ocean'

const StyledSurface = styled(animated.section)`
  background-color: #8ae5ff;
  height: 100vh;
  position: relative;

  .ocean {
    bottom: 0;
    height: 30vh;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 20;

    path {
      filter: drop-shadow(0 0 1px #00000088);
    }

    &__top {
      fill: #47d5fc;
    }

    &__middle {
      fill: #1cbeeb;
    }
  }
`

export default function Surface() {
  const { height, ref } = useResizeDetector()
  const scrollMin = useMemo(() => ref.current?.offsetTop, [height])
  const scrollMax = useMemo(() => scrollMin + height, [scrollMin, height])

  const [{ scroll }, set] = useSpring(() => ({
    scroll: 0,
    config: { duration: 0 }
  }))

  useScroll({ onChange: ({ value: { scrollY } }) => set({ scroll: scrollY }) })

  return (
    <StyledSurface
      style={{
        backgroundColor: scroll.to({
          range: [scrollMin, (scrollMax - scrollMin) / 5, (scrollMax * 5) / 6],
          output: ['#8ae5ff', '	#fb9062', '#0c1445']
        })
      }}
      ref={ref}
    >
      <Ocean
        className="ocean"
        topColor={
          scroll.to({
            range: [scrollMin, (scrollMax * 5) / 6],
            output: ['#47d5fc', '#4096ad']
          }) as unknown as string
        } //
        middleColor={
          scroll.to({
            range: [scrollMin, (scrollMax * 5) / 6],
            output: ['#1cbeeb', '#1f8cab']
          }) as unknown as string
        }
      />
    </StyledSurface>
  )
}
