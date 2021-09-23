import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Playlist from './Playlist';
import * as api from './api';
import Menu from './Menu';
import { isEmpty } from 'lodash';

function Playlists() {
  const [lists, setLists] = useState([]);
  const showCard = !isEmpty(lists);

  const createList = async (list) => {
    try {
      const { data } = await api.createList(list)

      setLists([...lists, data]);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async function() {
      try {
        const { data } = await api.getLists();

        setLists(data);
      } catch(error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container>
      <Row>
        {showCard && cards(lists)}
      </Row>
      <Menu onCreateList={createList}/>
    </Container>
  );
}

function cards(playlists) {
  return playlists.map((list) => {
    return (
      <Col xs={6} md={5}>
        <Playlist
          id={list.id}
          name={list.name}
          description={list.description}
          type={list.type}
          numberOfFilms={list.numberOfFilms}
        />
      </Col>
    );
  });
}

export default Playlists;
