import classnames from 'classnames';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>Movies Freak</Link>
      <ul>
        <CustomLink to='/'>Home</CustomLink>
        <CustomLink to='/watchlists'>Watchlists</CustomLink>
        <CustomLink to='/films'>Films</CustomLink>
        <CustomLink to='/tv-shows'>TV Shows</CustomLink>
        <CustomLink to='/about'>About</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ children, to, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  const classNames = classnames({
    active: to === isActive
  });

  return (
    <li className={classNames}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar
