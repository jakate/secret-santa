import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navigation = () =>  {
  const path = useSelector(state => state.router.location.pathname)
  const currentPath = path.split('/').join('')
  const routes = [{
    path: '/',
    title: 'Home'
  },{
    path: '/test',
    title: 'Testi'
  }]

  return (
    <div className="Navigation Container">
      <ul>
        {routes.map((route) => {
          return (
            <li
              key={route.path}
              className={currentPath === route.path.replace(/^\//, '') ? 'active' : ''}>
              <Link to={route.path}>
                {route.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Navigation
