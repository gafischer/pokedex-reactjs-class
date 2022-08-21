import styled from 'styled-components';

export const Pages = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #242424;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #eee;
    margin: 15px;

    &:hover {
      opacity: 0.7;
    }

    svg {
      fill: #fff;
    }
  }
`;
