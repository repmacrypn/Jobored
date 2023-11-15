import { NavLink } from 'react-router-dom'

import { WorkCondition } from '@/pages/Vacancy/WorkCondition'

import { IVacancyData } from './interface'

import '@/styles/defaultStyles.css'
import s from './styles.module.scss'

export const VacancyData = ({ vacancy, isMainPage }: IVacancyData) => {
  const professionClassName = isMainPage ? ` titleSSemiBold` : `titleLBold`
  const townClassName = isMainPage ? s.townDefaultFont : 'textBaseMReg'

  return (
    <>
      <div className={`${s.profession} ${professionClassName}`}>
        {isMainPage ? (
          <NavLink to={`/vacancy/${vacancy.id}`}>{vacancy.profession}</NavLink>
        ) : (
          vacancy.profession
        )}
      </div>
      <WorkCondition isMainPage={isMainPage} vacancy={vacancy} />
      <div className={`${s.town} ${townClassName}`}>
        {vacancy.town?.title || 'Не указан'}
      </div>
    </>
  )
}
