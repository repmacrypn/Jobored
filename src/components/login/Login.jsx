import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import s from './LoginPage.module.css'
import { selectIsAuth } from '../../redux/authSlice'
import { LoginForm } from './LoginForm'

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    if (isAuth) return <Navigate to='/vacancies' />

    return (
        <div className={`${s.loginPageWrapper} defaultFontS`}>
            <LoginDataField />
        </div>
    )
}

const LoginDataField = () => {
    return (
        <div className={s.loginFormWrapper}>
            <div className={s.dataWrapper}>
                <LoginData />
            </div>
            <LoginForm />
        </div>
    )
}

const LoginData = () => {
    return (
        <div className={s.loginDataWrapper}>
            <LoginDataProp
                title='Email: '
                value='artik3267@gmail.com'
            />
            <LoginDataProp
                title='Password: '
                value='VGcf6498'
            />
        </div>
    )
}

const LoginDataProp = ({ title, value }) => {
    return (
        <div>
            <span className='bold600'>
                {title}
            </span>
            <span className='regular400'>
                {value}
            </span>
        </div>
    )
}
