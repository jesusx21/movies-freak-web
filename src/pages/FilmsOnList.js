import React from 'react';
import { useParams } from 'react-router';
import Films from '../views/Films/Films';

function FilmsOnList() {
  const { listId } = useParams();

  return (
    <div className='films'>
      <Films listId={listId} />
    </div>
  )
}

export default FilmsOnList
