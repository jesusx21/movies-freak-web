import React from 'react';
import classnames from 'classnames';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import { SidebarData } from './SidebarData';
import './Navbar.css';
import Session from '../../models/Session';
import User from '../../models/User';

function Navbar() {
  const session = Session.get();
  const user = User.get();
  
  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>Movies Freak</Link>
      <ul>
        {
          SidebarData.map((item, index) => {
            return (
              <CustomLink key={index} index={index} to={item.path} className={item.className}>
                {item.title}
              </CustomLink>
            );
          })
        }
        <CustomLink to='/sign-in' className='nav-text' show={!user}>
          Sign In
        </CustomLink>
        <CustomLink to='/sign-out' className='nav-text' show={!!user}>
          Sign Out
        </CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink(props) {
  const { to, children, index, show = true } = props;
  const resolvedPath = useResolvedPath(to);
  const currentPath = useMatch({ path: resolvedPath.pathname, end: true });

  const classNames = classnames(
    props.className,
    { active: to === currentPath?.pathnameBase }
  );

  return (
    <li className={classNames} key={index} hidden={!show}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar
