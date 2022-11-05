import React, { useState, useEffect } from 'react';

import * as api from './api';
import { AddWatchListModal, Search, WatchListCard } from '../../components';
import { notifyError } from '../../toast';
import './WatchLists.css';

function WatchLists(props) {
  const { session } = props;

  const [watchLists, setWatchLists] = useState([]);
  const [showAddWatchList, setShowAddWatchList] = useState(false);

  const createWatchList = async (watchList) => {
    try {
      const { data } = await api.createWatchList(watchList, session)

      setWatchLists([...watchLists, data]);
    } catch(error) {
      notifyError('Error creating watch list');
    }
  }

  const fetchWatchLists = async (query = {}) => {
    try {
      const { data: items } = await api.getWatchLists(query, session, session);

      setWatchLists(items)
    } catch (error) {
      notifyError('Error fetching watch lists');
    }
  };

  useEffect(() => {
    fetchWatchLists();
  }, [])

  const onSearchChange = (value) => {
    fetchWatchLists({ q: value })
  }

  return (
    <>
      <Search onChange={onSearchChange} onClick={onSearchChange} onPlusClick={() => setShowAddWatchList(true)} />
      <div className='watchList-cards'>
        {
          watchLists.map((item, index) => {
            return (
              <WatchListCard
                id={item.id}
                name={item.name}
                description={item.description}
                type={item.type}
                key={index}
                index={index}
                numberOfFilms={item.numberOfFilms}
              />
            );
          })
        }
      </div>
      <AddWatchListModal
        show={showAddWatchList}
        onCreateWatchList={createWatchList}
        onHide={() => setShowAddWatchList(!showAddWatchList)}
      />
    </>
  )
}

export default WatchLists
