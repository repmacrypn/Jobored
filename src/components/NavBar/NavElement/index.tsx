import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { INavElement } from './interface'

import s from './styles.module.scss'

export const NavElement = memo(({ classNameProp, text, to }: INavElement) => {
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
