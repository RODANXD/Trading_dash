import React from 'react'
import { Outlet } from 'react-router-dom'
import ColNav from './ColNav'
import Headers from './Headers'

const Design = () => {
  return (
    <div className='bg-gray-950 h-screen w-screen overflow-hidden flex flex-row'>
      <ColNav />
      <div className='flex flex-col flex-1'>
        
        <div className='flex flex-col flex-1 p-4 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Design