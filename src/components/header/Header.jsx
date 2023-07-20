import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import { setIsAuth, useLazyLoginQuery } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'

export const Header = () => {
    const [getLoginData] = useLazyLoginQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            if (!localStorage.getItem('accessToken')) {
                const { data: { access_token, refresh_token }, isSuccess } = await getLoginData()

                if (isSuccess) {
                    localStorage.setItem('accessToken', access_token)
                    localStorage.setItem('refreshToken', refresh_token)
                }
            }
            dispatch(setIsAuth(true))
        })()
    }, [getLoginData, dispatch])

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
        </header >
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