import React, { useState } from 'react';
import classnames from 'classnames';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import { SidebarData } from './SidebarData';
import './Navbar.css';

function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>Movies Freak</Link>
      <ul>
        {
          SidebarData.map((item, index) => {
            return (
              <CustomLink to={item.path} className={item.className} key={index}>
                {item.title}
              </CustomLink>
            );
          })
        }
      </ul>
    </nav>
  );
}

function CustomLink(props) {
  const { to, children, key } = props;
  const resolvedPath = useResolvedPath(to);
  const currentPath = useMatch({ path: resolvedPath.pathname, end: true });

  const classNames = classnames(
    props.className,
    { active: to === currentPath }
  );

  return (
    <li className={classNames} key={key}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar
