import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'Watchlists',
    path: '/watchlists',
    icon: <RiIcons.RiPlayList2Fill />,
    className: 'nav-text'
  },
  {
    title: 'Movies',
    path: '/movies',
    icon: <GiIcons.GiFilmSpool />,
    className: 'nav-text'
  }
];
