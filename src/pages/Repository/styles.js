import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueFilter = styled.div`
  margin-top: 20px;
  label {
    select {
      display: block;
      width: 100%;
      font-size: 14px;
      background-color: #7159c1;
      color: #fff;
      border-radius: 4px;
      height: 36px;
      width: 87px;

      &:after {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 100%;
        text-align: center;
        color: #7159c1;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }
  }
`;

export const IssueItem = styled.div.attrs((props) => ({
  state: props.state,
}))`
  flex: 1;
  margin-left: 15px;

  strong {
    font-size: 16px;

    a {
      text-decoration: none;
      color: #333;
      padding: 8px;

      &:hover {
        color: #7159c1;
      }
    }

    span {
      background-color: #eee;
      color: #333;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 600;
      height: 20px;
      padding: 3px 4px;
      margin-left: 10px;
    }
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }

  svg {
    color: ${(props) => (props.state === 'open' ? '#3fb950' : '#a371f7')};
    width: 18px;
    height: 18px;
  }
`;

export const Page = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const PageButton = styled.button.attrs((props) => ({
  type: 'button',
  firstPage: props.firstPage === 1,
  isPrevious: props.isPrevious === true,
}))`
  visibility: ${(props) =>
    props.isPrevious && props.firstPage ? 'hidden' : 'visible'};

  background-color: #7159c1;
  border: 0;
  padding: 10px;
  border-radius: 4px;
  width: 87px;
  color: #fff;
`;
