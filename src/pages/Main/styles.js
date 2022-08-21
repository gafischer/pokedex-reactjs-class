import styled, { keyframes, css } from 'styled-components';
import TypeIcons from '../../utils/type-icons';
import { ReactComponent as PokeballSvg } from '../../svg/pokeball.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const types = {
  Normal: {
    icon: TypeIcons.normal,
    color: '#a0a29f',
  },
  Fire: {
    icon: TypeIcons.fire,
    color: '#fba54c',
  },
  Water: {
    icon: TypeIcons.water,
    color: '#539ddf',
  },
  Electric: {
    icon: TypeIcons.electric,
    color: '#f2d94e',
  },
  Grass: {
    icon: TypeIcons.grass,
    color: '#5fbd58',
  },
  Ice: {
    icon: TypeIcons.ice,
    color: '#75d0c1',
  },
  Fighting: {
    icon: TypeIcons.fighting,
    color: '#d3425f',
  },
  Poison: {
    icon: TypeIcons.poison,
    color: '#b763cf',
  },
  Ground: {
    icon: TypeIcons.ground,
    color: '#da7c4d',
  },
  Flying: {
    icon: TypeIcons.flying,
    color: '#a1bbec',
  },
  Psychic: {
    icon: TypeIcons.psychic,
    color: '#fa8581',
  },
  Bug: {
    icon: TypeIcons.bug,
    color: '#92bc2c',
  },
  Rock: {
    icon: TypeIcons.rock,
    color: '#c9bb8a',
  },
  Ghost: {
    icon: TypeIcons.ghost,
    color: '#5f6dbc',
  },
  Dragon: {
    icon: TypeIcons.dragon,
    color: '#0c69c8',
  },
  Dark: {
    icon: TypeIcons.dark,
    color: '#595761', // '#775544',
  },
  Steel: {
    icon: TypeIcons.steel,
    color: '#5695a3',
  },
  Fairy: {
    icon: TypeIcons.fairy,
    color: '#ee90e6',
  },
};

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${(props) =>
    props.loading &&
    css`
      svg {
        fill: #fff;
        margin: 10px;
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const PokeCard = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: inline-flex;
    margin: 10px;
  }
`;

export const PokeItem = styled.div`
  background-color: #4b4b4b;
  width: 150px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 0 10px ${(props) => types[props.type].color};
  color: #f3f3f3;
  position: relative;

  .title {
    width: 100%;
    font-weight: bolder;
    font-size: 20px;
    margin: 5px;
    z-index: 1;
  }

  .sub-title {
    width: 100%;
    font-weight: bold;
    z-index: 1;
  }

  .separator {
    width: 100%;
    height: 100px;
  }
`;

export const PokeSprite = styled.div.attrs((props) => ({
  style: {
    background: `url('${props.sprite}') no-repeat center center`,
  },
}))`
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 20px;
`;

export const PokeType = styled.div.attrs((props) => ({
  style: {
    backgroundColor: types[props.type].color,
  },
}))`
  display: flex;
  flex: 1 1 60px;
  margin: 5px;
  max-width: 50%;
  max-height: 20px;
  border-radius: 50px;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;

  img {
    content: url('${(props) => types[props.type].icon}');
    vertical-align: middle;
    width: 12px;
    margin-right: 5px;
  }
`;

export const PokeballIcon = styled(PokeballSvg)`
  position: absolute;
  fill: #fff;
  opacity: 0.05;
  z-index: 0;
`;

export const Filter = styled.div`
  width: 100%;
  height: 50px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchBox = styled.div`
  input[type='text'] {
    padding: 5px;
    width: 300px;
    text-align: center;
    border-radius: 15px;
    color: #333;
    margin-left: 5px;
  }
`;
