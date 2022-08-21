import React from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Pages } from './styles';

const Pagination = ({
  pokemonsPerPage,
  totalPokemons,
  currentPage,
  paginate,
}) => {
  Pagination.defaultProps = {
    pokemonsPerPage: 100,
    currentPage: 1,
  };

  Pagination.propTypes = {
    pokemonsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    totalPokemons: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
  };

  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  return (
    <Pages>
      <button type="button" onClick={() => paginate(currentPage - 1)}>
        <MdNavigateBefore size={25} />
      </button>
      <h3>
        {currentPage} de {totalPages}
      </h3>
      <button type="button" onClick={() => paginate(currentPage + 1)}>
        <MdNavigateNext size={25} />
      </button>
    </Pages>
  );
};

export default Pagination;
