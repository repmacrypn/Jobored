import { NavElement } from '@/components/NavBar/NavElement'

import s from './styles.module.scss'

export const NavBar = () => {
  return (
    <nav className={s.nav}>
      <NavElement classNameProp='vacancies' text='Поиск Вакансий' to='vacancies' />
      <NavElement classNameProp='fav' text='Избранное' to='favourites' />
      <NavElement classNameProp='vacanciesIcon' text=' ' to='vacancies' />
      <NavElement classNameProp='favIcon' text='' to='favourites' />
    </nav>
  )
}
