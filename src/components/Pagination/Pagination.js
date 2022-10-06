import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './Pagination.css'
import { range } from 'lodash';

function MoviesFreakPagination(props) {
  const { totalItems, perPage } = props;
  const numberOfPages = Math.ceil(totalItems / perPage)
  const [currentPage, setCurrentPage] = useState(1);
  const [startAt, setStartAt] = useState(1);

  const onPageClick = (input) => {
    let page;

    switch(input.label) {
      case '<<':
        page = 1;
        break;
      case '<':
        page = currentPage > 1 ? currentPage - 1 : 1;
        break;
      case '>':
        page = currentPage === numberOfPages ? numberOfPages : currentPage + 1;
        break;
      case '>>':
        page = numberOfPages;
        break;
      default:
        page = Number(input.label);


        break;
      }

    setCurrentPage(page);

    props.onPageClick({
      limit: perPage,
      skip: (perPage * (page - 1))
    })

    if (numberOfPages <= 10) {
      return;
    }

    if (page === 1) {
      setStartAt(page);
    }
    if (page >= (startAt + 3 )) {
      setStartAt(page);
    }
    if (page >= (numberOfPages - 9)) {
      setStartAt(numberOfPages - 9);
    }
  };

  const isCurrentPage = (numberOfPage) => numberOfPage === currentPage;

  return (
    <div className='movies-freak-pagination'>
      <PaginationItem onClick={onPageClick} currentPage={false} label='<<' />
      <PaginationItem onClick={onPageClick} currentPage={false} label='<' />
      <PaginationItems
        totalPages={numberOfPages}
        onPageClick={onPageClick}
        isCurrentPage={isCurrentPage}
        startAt={startAt}
      />
      <PaginationItem onClick={onPageClick} currentPage={false} label='>' />
      <PaginationItem onClick={onPageClick} currentPage={false} label='>>' />
    </div>
  )
}

function PaginationItems({ totalPages, onPageClick, isCurrentPage, startAt }) {
  let lastNumberOfPage = 0;

  let items = range(0, Math.min(totalPages, 10))
    .map((index) => {
      const numberOfPage = startAt + index;
      lastNumberOfPage = numberOfPage;

      return (
        <PaginationItem
          index={index}
          onClick={onPageClick}
          currentPage={isCurrentPage(numberOfPage)}
          label={numberOfPage}
        />
      );
    });

  if (totalPages <= 10 || lastNumberOfPage === totalPages) {
    return items;
  }


  items[6] = (
    <PaginationItem onClick={onPageClick} disabled={true} label='...' />
  );
  items[7] = (
    <PaginationItem
      onClick={onPageClick}
      currentPage={isCurrentPage(totalPages - 2)}
      label={totalPages - 2}
    />
  );
  items[8] = (
    <PaginationItem
      onClick={onPageClick}
      currentPage={isCurrentPage(totalPages - 1)}
      label={totalPages - 1}
    />
  );
  items[9] = (
    <PaginationItem
      onClick={onPageClick}
      currentPage={isCurrentPage(totalPages)}
      label={totalPages}
    />
  );

  return items;
}

function PaginationItem({ currentPage, disabled, hidden, label, index, ...props }) {
  const onClick = () => {
    return props.onClick({ currentPage, label })
  };

  return (
    <Button
      variant='outline-secondary'
      onClick={onClick}
      key={index}
      disabled={currentPage || disabled}
      hidden={hidden}
    >
      {label}
    </Button>
  );
}

MoviesFreakPagination.defaultProps = {
  perPage: 20
};

MoviesFreakPagination.propTypes = {
  onPageClick: PropTypes.func.isRequired,
  perPage: PropTypes.number,
  totalItems: PropTypes.number
};

export default MoviesFreakPagination;
