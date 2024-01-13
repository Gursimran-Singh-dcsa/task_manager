import styled from 'styled-components'
import {WHITE} from './constants'

export const PageSubHeader = styled.div`
  background-color: ${WHITE};
  height: 72px;
  display: flex;
  align-items: center;
  padding: 16px 24px 16px 24px;
  line-height: 28px;
  .heading {
    color: var(--character-title-85, rgba(0, 0, 0, 0.85));
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    margin-right: 1rem;
    line-height: 28px;
  }
  .sub-heading {
    color: var(--character-title-45, rgba(0, 0, 0, 0.45));
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
  }
  .buttonContainter {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      margin-right: 8px;
    }
  }
`
