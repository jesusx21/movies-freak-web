import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'Lists',
    path: '/lists',
    icon: <RiIcons.RiPlayList2Fill />,
    className: 'nav-text'
  },
  {
    title: 'Films',
    path: '/films',
    icon: <GiIcons.GiFilmSpool />,
    className: 'nav-text'
  },
  {
    title: 'TV Series',
    path: '/tv-series',
    icon: <IoIcons.IoMdTv />,
    className: 'nav-text'
  },
  {
    title: 'Cinematic Universes',
    path: '/cinematic-universes',
    icon: <RiIcons.RiMovie2Fill />,
    className: 'nav-text'
  },
  {
    title: 'Specials',
    path: '/specials',
    icon: <BsIcons.BsShuffle />,
    className: 'nav-text'
  }
];
