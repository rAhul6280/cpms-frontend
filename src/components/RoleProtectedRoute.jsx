import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContextProvider'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

function RoleProtectedRoute({ children, allowedRoles }) {
    const { user, authLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (authLoading) return
        if (user && !allowedRoles.includes(user.role)) {
            navigate('/dashboard')
        }
    }, [user, authLoading, allowedRoles])

    if (authLoading) return <Loading />
    if (!user || !allowedRoles.includes(user.role)) return <Loading />

    return children
}

export default RoleProtectedRoute