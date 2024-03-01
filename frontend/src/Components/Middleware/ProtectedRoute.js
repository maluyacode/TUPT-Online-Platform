import React from 'react'
import { getUser, isAuthenticated } from '../../utils/helper'
import { Navigate } from 'react-router-dom'
import ToastEmmiter from '../Layout/ToastEmmiter'

const ProtectedRoute = ({ children, isAdmin = false }) => {

    if (isAuthenticated()) {

        if (!getUser().isEmailVerified && !getUser().isContactVerified) {
            ToastEmmiter.warning('Please verify you email and contact number!', 'top-center')
            return <Navigate to='/verification' />
        }

        if (isAdmin) {

            if (getUser().role !== 'admin') {

                ToastEmmiter.warning('You are not allowed to access the page!', 'top-center')
                return <Navigate to='/' />

            } else {

                return children

            }

        }

        return children

    } else {
        ToastEmmiter.warning('Please login first to access the page!', 'top-center')
        return <Navigate to='/login' />
    }

}

export default ProtectedRoute