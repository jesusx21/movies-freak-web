import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';
import { useMatch, useResolvedPath, useLocation } from 'react-router-dom';

import * as api from './api';
import SessionContext from '../../context';

const WATCH_LIST_ROUTES = {
  '/watch-lists': 'Watch List'
};

const FILMS_ROUTES = {
  '/films': 'Films'
};

function Breadcrumbs() {
  const location = useLocation();
  const [, setResource] = useState();
  const [, resourceName, resourceId] = location.pathname.split('/');

  const session = useContext(SessionContext);

  const getShowOnRoutes = () => [
    ...Object.keys(FILMS_ROUTES),
    ...Object.keys(WATCH_LIST_ROUTES)
  ];

  const fetchWatchList = async () => {
    if (!resourceId || WATCH_LIST_ROUTES.length > 2) {
      return;
    }

    try {
      const { data } = await api.getWatchListById(resourceId);

      setResource(data)

      WATCH_LIST_ROUTES[`/${resourceName}/${resourceId}`] = data.name;
    } catch (error) {
      const { data } = error.response;
      console.warning(data);
    }
  };

  useEffect(() => {
    if (resourceName === 'watch-lists')  {
      fetchWatchList();
    }
  }, []);

  if (!getShowOnRoutes().includes(location.pathname)) {
    return (<></>);
  }

  const routes = location.pathname.includes('films') ? FILMS_ROUTES : WATCH_LIST_ROUTES;

  return (
    <Breadcrumb hidden={!session}>
      {
        Object.keys(routes).map((route, index) => {
          return (
            <BreadcrumbItem to={route} key={index} index={index}>
              {routes[route]}
            </BreadcrumbItem>
          );
        })
      }
    </Breadcrumb>
  );
}

function BreadcrumbItem({ children, index, to, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const location = useLocation();
  const currentPath = useMatch({ path: resolvedPath.pathname, end: true });

  const active = to === currentPath?.pathnameBase;
  const show = location.pathname.includes(to);
  return (
    <Breadcrumb.Item
      href={to}
      key={index}
      active={active}
      hidden={!show}
      {...props}
    >
      {children}
    </Breadcrumb.Item>
  );
}

Breadcrumbs.propTypes = {
  currentPath: PropTypes.string,
  viewActived: PropTypes.bool,
  watchListName: PropTypes.string
};

export default Breadcrumbs;
