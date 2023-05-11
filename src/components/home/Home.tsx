import styled from 'styled-components'
import Oracle from './Oracle'
import Surface from './Surface'
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
