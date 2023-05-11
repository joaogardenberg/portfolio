import styled from 'styled-components'
import Sun from './common/Sun'
import Ocean from './common/Ocean'

const StyledHome = styled.div`
  background-color: #8ae5ff;
  height: 100vh;
  position: relative;
  width: 100vw;

  > .sun {
    position: absolute;
    right: 0;
    top: 0;
    width: 20vmin;
  }

  > .ocean {
    bottom: 0;
    height: 20vh;
    left: 0;
    position: absolute;
    width: 100%;
  }
`

export default function Home() {
  return (
    <StyledHome>
      <Sun />
      <Ocean />
    </StyledHome>
  )
}
