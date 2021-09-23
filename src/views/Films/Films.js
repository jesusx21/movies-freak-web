import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as api from './api';
import Film from './Film';

function Films() {
  const [films, setFilms] = useState([]);
  const showFilms = !isEmpty(films);

  useEffect(() => {
    (async function() {
      try {
        const { data } = await api.getFilms();

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
