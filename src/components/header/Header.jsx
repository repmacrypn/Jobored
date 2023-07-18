import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import { useLazyLoginQuery } from '../../redux/authSlice'

export const Header = () => {
    const [getLoginData, { data: tokens }] = useLazyLoginQuery()

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            try {
                getLoginData()

                localStorage.setItem('access_token', tokens.access_token)
                localStorage.setItem('refresh_token', tokens.refresh_token)
            } catch (e) {
                console.warn(e, 'login error')
            }
        }
    }, [getLoginData, tokens?.access_token, tokens?.refresh_token])

    return (
        <header className={s.headerWrapper}>
            <div className={s.header}>
                <div className={s.logoTitle}>
                    Jobored
                </div>
                <nav className={s.nav}>
                    <HeaderNavItem
                        className='vacancies'
                        text='Поиск Вакансий'
                        to='vacancies'
                    />
                    <HeaderNavItem
                        className='fav'
                        text='Избранное'
                        to='favourites'
                    />
                    <HeaderNavItem
                        className='vacanciesIcon'
                        text=' '
                        to='vacancies'
                    />
                    <HeaderNavItem
                        className='favIcon'
                        text=''
                        to='favourites'
                    />
                </nav>
            </div>
        </header>
    )
}

const HeaderNavItem = React.memo(({ className, text, to }) => {
    return (
        <NavLink
            className={({ isActive }) => `${isActive ? s.active : s.nonActive}`}
            to={`/${to}`}
        >
            <div className={s[className]}>
                {text}
            </div>
        </NavLink>
    )
})