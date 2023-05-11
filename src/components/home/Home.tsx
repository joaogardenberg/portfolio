import styled from 'styled-components'
import Oracle from './oracle/Oracle'
import Surface from './surface/Surface'
import Shallow from './Shallow'

const StyledHome = styled.div``

export default function Home() {
  return (
    <StyledHome>
      <Oracle />
      <main>
        <Surface />
        <Shallow />
      </main>
    </StyledHome>
  )
}
