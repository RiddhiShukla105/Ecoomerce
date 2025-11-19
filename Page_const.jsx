import React from 'react'
import Nav from './Nav'
import Sidenav from './Sidenav'


const Page_const = () => {
  return (
    <div>
      <Nav/>
      <div className='flex'>
        <Sidenav/>
        <h1>Page Under Construction</h1>
      </div>
    </div>
  )
}

export default Page_const
