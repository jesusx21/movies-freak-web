import React from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../../components/FilmCard/FilmCard';

function Film(props) {
  const { id: filmId, poster, year, rated, genre, plot, rating, locations } = props;
  const name = props.title || props.name;

  return (
    <FilmCard
      name={name}
      poster={poster}
      year={year}
      rated={rated}
      genre={genre}
      plot={plot}
      rating={rating}
      locations={locations}
    />
  )
}

Film.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string,
  year: PropTypes.string,
  rated: PropTypes.string,
  genre: PropTypes.string,
  plot: PropTypes.string,
  rating: PropTypes.string,
  locations: PropTypes.array
};

export default Film
