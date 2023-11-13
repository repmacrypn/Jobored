import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '@/hooks/useAppHooks'
import { setIsAuth, useLazyLoginQuery } from '@/redux/authSlice'

import s from './Header.module.css'

export const Header = () => {
  const [getLoginData] = useLazyLoginQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      if (!localStorage.getItem('accessToken')) {
        const { data, isSuccess } = await getLoginData(null)

        if (isSuccess) {
          localStorage.setItem('accessToken', data.access_token)
          localStorage.setItem('refreshToken', data.refresh_token)
        }
      }
      dispatch(setIsAuth(true))
    })()
  }, [getLoginData, dispatch])

  return (
    <header className={s.headerWrapper}>
      <div className={s.header}>
        <div className={s.logoTitle}>Jobored</div>
        <nav className={s.nav}>
          <HeaderNavItem classNameProp='vacancies' text='Поиск Вакансий' to='vacancies' />
          <HeaderNavItem classNameProp='fav' text='Избранное' to='favourites' />
          <HeaderNavItem classNameProp='vacanciesIcon' text=' ' to='vacancies' />
          <HeaderNavItem classNameProp='favIcon' text='' to='favourites' />
        </nav>
      </div>
    </header>
  )
}

interface IHeaderNavItemProps {
  classNameProp: string
  text: string
  to: string
}

const HeaderNavItem = React.memo(({ classNameProp, text, to }: IHeaderNavItemProps) => {
  return (
    <NavLink
      className={({ isActive }: { isActive: boolean }) =>
        `${isActive ? s.active : s.nonActive}`
      }
      to={`/${to}`}
    >
      <div className={s[classNameProp]}>{text}</div>
    </NavLink>
  )
})
