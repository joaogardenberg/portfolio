import { animated } from '@react-spring/web'
import styled from 'styled-components'

export default styled(animated.section)`
  background-color: #8ae5ff;
  height: 100vh;
  position: relative;

  .stars {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .ocean {
    bottom: 0;
    height: 30vh;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 20;

    &.in {
      transition: transform 1s ease-in-out, opacity 1s ease-in-out;
    }

    &:not(.in) {
      left: 100%;
      opacity: 0;
      transform: translateY(100%);
    }

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
