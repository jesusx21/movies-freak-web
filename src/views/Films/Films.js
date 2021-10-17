import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as api from './api';
import Film from './Film';

function Films(props) {
  const [films, setFilms] = useState([]);
  const showFilms = !isEmpty(films);
  const { listId } = props;

  const getFilms = async (random) => {
    if (!listId) {
      const { data } = await api.getFilms();

      return data;
    }

    const { data } = await api.getFilmsOnList(listId);

    return data.map((item) => item.film)
  }

  useEffect(() => {
    (async function() {
      try {
        const data = await getFilms();

        setFilms(data);
      } catch(error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container>
      <Row>
        {showFilms && cards(films)}
      </Row>
    </Container>
  )
}

Films.propTypes = {
  id: PropTypes.number
};

function cards(films) {
  return films.map((film) => {
    return (
      <Col xs={6} md={5}>
        <Film
          id={film.id}
          name={film.name}
          title={film.title}
          poster={film.poster}
          year={film.year}
          rated={film.rated}
          genre={film.genre}
          plot={film.plot}
          rating={film.imdbRating}
          locations={film.locations}
        />
      </Col>
    );
  });
}

export default Films
