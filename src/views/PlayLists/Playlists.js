import React, { useState, useEffect } from 'react';
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
    <div className='container'>
      <div className='row'>
        {showCard && cards(lists)}
      </div>
    </div>
  );
}

function cards(playlists) {
  return playlists.map((list) => {
    return (
      <PlaylistCard
        name={list.name}
        description={list.description}
        type={list.type}
        numberOfFilms={list.numberOfFilms}
      />
    );
  });
}

export default Playlists;
