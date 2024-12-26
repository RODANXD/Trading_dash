import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ColNav from './ColNav'
import Headers from './Headers'
import {handleauth} from './auth'
import { useNavigate  } from 'react-router-dom';




const Design = () => {
  const navigate = useNavigate();

  const isAuthExpired = handleauth();
  console.log(isAuthExpired,'checktimestamp')

  {if (isAuthExpired) (
    navigate('/')
  )}
 
 
 
 
 
 
 

  
  return (


    <div className='bg-gray-950 h-screen w-screen overflow-hidden flex flex-row'>
      <ColNav />
      <div className='flex flex-col flex-1'>
        
        <div className='flex flex-col flex-1 h-screen py-6 max-xs:pt-14 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Design