import React, { useState, useEffect } from 'react';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import getLists from './getLists';

function Playlists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const { data: lists } = await getLists();
        console.log(lists);

        setLists(lists);
      } catch(error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      {lists.map((list) => {
        return (
          <PlaylistCard
            name={list.name}
            description={list.description}
            type={list.type}
            numberOfFilms={list.numberOfFilms}
          />
        )
      })}
    </div>
  );
}

export default Playlists;
