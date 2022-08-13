import React from 'react'
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'

function ProtectedRoute() {

    const { user } = useSelector(
        (state) => state.auth
    )
  
    const [admin, setAdmin] = useState(user.accountType === "admin" ? true : null)

    return admin ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute