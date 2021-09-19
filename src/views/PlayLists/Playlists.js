import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import getLists from './getLists';

function Playlists() {
  const [lists, setLists] = useState([]);
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    (async function() {
      try {
        const { data: lists } = await getLists();

        setLists(lists);
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
    </Container>
  );
}

function cards(playlists) {
  return playlists.map((list) => {
    return (
      <Col xs={6} md={5}>
        <PlaylistCard
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
