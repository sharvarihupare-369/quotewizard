import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import QuoteDashboard from './QuoteDashboard'
import PrivateRoute from '../components/PrivateRoute'

const Mainroutes = () => {
  return (
     <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/generator" element={
         <PrivateRoute>
        <QuoteDashboard/>
         </PrivateRoute>
         } />
     </Routes>
    )
}

export default Mainroutes