import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const token = JSON.parse(localStorage.getItem('auth'))
const interfaces = token.interface

const _nav =
  interfaces === 'editor'
    ? [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          component: CNavTitle,
          name: 'News',
        },
        {
          component: CNavGroup,
          name: 'News Manage',
          to: '/base',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'News Category',
              to: '/base/newscategory',
            },
            {
              component: CNavItem,
              name: 'News Speciality',
              to: '/base/newsspeciality',
            },
            {
              component: CNavItem,
              name: 'All News',
              to: '/base/allnews',
            },
          ],
        },
      ]
    : interfaces === 'superadmin'
    ? [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          component: CNavTitle,
          name: 'News',
        },
        {
          component: CNavGroup,
          name: 'News Manage',
          to: '/base',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'News Category',
              to: '/base/newscategory',
            },
            {
              component: CNavItem,
              name: 'News Speciality',
              to: '/base/newsspeciality',
            },
            {
              component: CNavItem,
              name: 'All News',
              to: '/base/allnews',
            },
          ],
        },
        {
          component: CNavGroup,
          name: 'Users',
          to: '/base',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'User List',
              to: '/base/userlist',
            },
          ],
        },
      ]
    : interfaces === 'admin'
    ? [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          component: CNavTitle,
          name: 'News',
        },
        {
          component: CNavGroup,
          name: 'News Manage',
          to: '/base',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'News Category',
              to: '/base/newscategory',
            },
            {
              component: CNavItem,
              name: 'News Speciality',
              to: '/base/newsspeciality',
            },
            {
              component: CNavItem,
              name: 'All News',
              to: '/base/allnews',
            },
          ],
        },
      ]
    : null

export default _nav
