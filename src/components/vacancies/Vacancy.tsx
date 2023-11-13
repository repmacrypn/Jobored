import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import Preloader from '@/components/common components/preloader/Preloader'
import { FavStar, VacancyData } from '@/components/vacancies/Vacancies'
import { useGetVacancyQuery } from '@/redux/vacanciesSlice'
import { IVacancy } from '@/types/vacancy.interface'

import s from './Vacancies.module.css'

export const Vacancy = () => {
  const { vacancyId } = useParams()
  const { data: vacancy, isLoading, isSuccess } = useGetVacancyQuery(vacancyId!)

  let vacancyRichText

  if (isSuccess) vacancyRichText = parse(vacancy.vacancyRichText || '')
  if (isLoading) return <Preloader isFS />

  return (
    <div>
      <div className={s.pageWrapper}>
        <div className={`${s.vacancy} ${s.curVac}`}>
          <VacancyData isDefault={false} obj={vacancy as IVacancy} />
          <FavStar obj={vacancy as IVacancy} />
        </div>
        <div className={s.vacancyPageWrapper}>{vacancyRichText}</div>
      </div>
    </div>
  )
}
