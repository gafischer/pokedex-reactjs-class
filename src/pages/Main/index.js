import React, { Component } from 'react';
import { RiLoader3Fill, RiSearchLine } from 'react-icons/ri';
import api from '../../services/api';

import Pagination from '../../components/Pagination/index';

import {
  PokeCard,
  PokeItem,
  PokeSprite,
  PokeType,
  PokeballIcon,
  Loading,
  Filter,
  SearchBox,
} from './styles';

// eslint-disable-next-line no-extend-native
String.prototype.capitalizeFirstLetter = function capitalizeFirstLetter() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// eslint-disable-next-line no-extend-native
Number.prototype.padLeft = function padLeft(width, pad) {
  let padChar = '';

  for (let i = 0; i < width; i++) {
    padChar += pad;
  }
  return (padChar + this).slice(-width);
};

export default class Main extends Component {
  state = {
    loading: true,
    searchPokemon: '',
    pokemons: [],
    totalPokemons: 0,
    currentPage: 1,
    pokemonsPerPage: 102,
  };

  async componentDidMount() {
    await this.loadPokemons();
  }

  loadPokemons = async () => {
    const pokedexData = await api.getPokedexByName(1);
    const totalPokemons = pokedexData.pokemon_entries.length;

    const interval = {
      offset: 0,
      limit: totalPokemons,
    };

    const pokemonList = await api.getPokemonsList(interval);

    const pokemons = await Promise.all(
      pokemonList.results.map(async (pokemon) => api.resource(pokemon.url))
    );

    await this.setState({
      loading: false,
      totalPokemons,
      pokemons: pokemons.map((pokemon) => {
        return {
          id: pokemon.id.padLeft(3, '0'),
          name: pokemon.species.name.capitalizeFirstLetter(),
          types: pokemon.types.map((type) =>
            type.type.name.capitalizeFirstLetter()
          ),
          sprites: {
            normal: `https://play.pokemonshowdown.com/sprites/xyani/${pokemon.species.name.replace(
              '-',
              ''
            )}.gif`,
            shiny: `https://play.pokemonshowdown.com/sprites/xyani-shiny/${pokemon.species.name.replace(
              '-',
              ''
            )}.gif` /* ,
            mega: `https://play.pokemonshowdown.com/sprites/xyani/${pokemon.species.name.replace(
              '-',
              ''
            )}-mega.gif`,
            megaShiny: `https://play.pokemonshowdown.com/sprites/xyani-shiny/${pokemon.species.name.replace(
              '-',
              ''
            )}-mega.gif`, */,
          },
        };
      }),
    });
  };

  handleInputChange = async (e) => {
    await this.setState({ searchPokemon: e.target.value });
  };

  handlePaginate = (page) => {
    const { totalPokemons, pokemonsPerPage } = this.state;
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

    if (page < 1 || page > totalPages) return;

    this.setState({ searchPokemon: '', currentPage: page });
  };

  renderPokemonsList = () => {
    const { pokemons, searchPokemon, currentPage, pokemonsPerPage } =
      this.state;

    const pokemonsList = [];
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    pokemons.forEach((pokemon) => {
      if (!pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())) {
        return;
      }

      pokemonsList.push(
        <li key={String(pokemon.id)}>
          <PokeItem type={pokemon.types[0]}>
            <PokeballIcon />
            <PokeSprite sprite={pokemon.sprites.shiny} />
            <div className="title">{pokemon.name}</div>
            <div className="separator" />
            <div className="sub-title">#{pokemon.id}</div>
            {pokemon.types.map((type) => (
              <PokeType key={String(pokemon.id) + type} type={type}>
                <img alt="" /> {type}
              </PokeType>
            ))}
          </PokeItem>
        </li>
      );
    });

    return (
      <PokeCard>
        {searchPokemon
          ? pokemonsList
          : pokemonsList.slice(indexOfFirstPokemon, indexOfLastPokemon)}
      </PokeCard>
    );
  };

  render() {
    const {
      loading,
      searchPokemon,
      pokemonsPerPage,
      totalPokemons,
      currentPage,
    } = this.state;
    if (loading) {
      return (
        <Loading loading={loading ? 'true' : undefined}>
          <RiLoader3Fill size={50} />
        </Loading>
      );
    }

    return (
      <>
        <Filter>
          <RiSearchLine size={25} />
          <SearchBox>
            <input
              type="text"
              placeholder="Enter a pokemon name..."
              value={searchPokemon}
              onChange={this.handleInputChange}
            />
            <span />
          </SearchBox>
        </Filter>
        {this.renderPokemonsList()}
        {searchPokemon ? undefined : (
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            currentPage={currentPage}
            totalPokemons={totalPokemons}
            paginate={this.handlePaginate}
          />
        )}
      </>
    );
  }
}
