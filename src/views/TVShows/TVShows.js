import React, { useEffect, useState } from 'react';

import * as api from './api';
import { AddTVShowModal, Search, TVShowCard } from '../../components';
import { notifyError } from '../../toast';
import './TVShows.css';

function TVShows(props) {
  const { session } = props;

  const [tvShows, setTVShows] = useState([]);
  const [showAddTVShow, setShowAddTVShow] = useState(false);

  const createTVShow = async (tvShow) => {
    try {
      const data = await api.createTVShow(tvShow, session);

      setTVShows([...tvShows, data]);

      return data;
    } catch(error) {
      notifyError('Error creating serie');
    }
  };

  const fetchTVShows = async (query = {}) => {
    try {
      const { items } = await api.getTVShows(query);

      setTVShows(items)
    } catch (error) {
      notifyError('Error fetching tv shows');
    }
  };

  useEffect(() => {
    fetchTVShows();
  }, []);

  const onSearchChange = (value) => {
    fetchTVShows({ q: value })
  }

  return (
    <>
      <Search
        onChange={onSearchChange}
        onClick={onSearchChange}
        onPlusClick={() => setShowAddTVShow(true)}
      />
      <div className='tv-show-cards'>
        {
          tvShows.map((item, index) => {
            return (
              <TVShowCard
                id={item.id}
                name={item.name}
                poster={item.poster}
                years={item.years}
                rated={item.rated}
                imdbRating={item.imdbRating}
                genre={item.genre}
                plot={item.plot}
                totalSeasons={item.totalSeasons}
                key={index}
                index={index}
              />
            );
          })
        }
      </div>
      <AddTVShowModal
        show={showAddTVShow}
        onCreateTVShow={createTVShow}
        onHide={() => setShowAddTVShow(!showAddTVShow)}
      />
    </>
  )
}

export default TVShows;
