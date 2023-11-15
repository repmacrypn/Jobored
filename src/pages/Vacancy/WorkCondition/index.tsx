import { processSalaryFieldAccom } from '@/utils/helpers/processSalary'

import { IVacancyData } from './interface'

import s from './styles.module.scss'

export const WorkCondition = ({ isMainPage, vacancy }: IVacancyData) => {
  const salaryClassName = isMainPage ? s.salaryDefaultFont : 'titleSBold'
  const typeOfWorkClassName = isMainPage ? s.typeOfWork : s.typeOfWorkNotDef

  return (
    <div className={s.workConditField}>
      <div className={`${s.salary} ${salaryClassName}`}>
        {processSalaryFieldAccom(vacancy.payment_from, vacancy.payment_to)}
        {vacancy.currency}
      </div>
      <div className={s.point}>•</div>
      <div className={typeOfWorkClassName}>{vacancy.type_of_work?.title}</div>
    </div>
  )
}
