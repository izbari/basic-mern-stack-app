
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Member List',
    path: '/Dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
},
{
  title: 'Create Member',
  path: '/createmember',
  icon: <FaIcons.FaCartPlus />,
  cName: 'nav-text'
},
  {
    title: 'Edit Members',
    path: '/editmembers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

];