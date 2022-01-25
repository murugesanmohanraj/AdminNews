import React from 'react'
import AllNews from './views/base/allnews/AllNews'
import NewsCategory from './views/base/newscategory/NewsCategory'
import NewsSpeciality from './views/base/newsspeciality/NewsSpeciality'
import UserList from './views/base/user/userList'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
// const Video = React.lazy(() => import('./views/base/video/Video'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/base/allnews', name: 'AllNews', component: AllNews },
  { path: '/base/newscategory', name: 'NewsCategory', component: NewsCategory },
  { path: '/base/newsspeciality', name: 'NewsSpeciality', component: NewsSpeciality },
  { path: '/base/userlist', name: 'UserList', component: UserList },
  // { path: '/base/video', name: 'Video', component: Video },
]

export default routes
