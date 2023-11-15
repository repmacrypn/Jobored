import { useEffect } from 'react'

import { NavBar } from '@/components/NavBar'
import { useAppDispatch } from '@/hooks/useAppHooks'
import { setIsAuth, useLazyLoginQuery } from '@/redux/authSlice'

import s from './styles.module.scss'

export const Header = () => {
  const dispatch = useAppDispatch()
  const [getLoginData] = useLazyLoginQuery()

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
        <NavBar />
      </div>
    </header>
  )
}
