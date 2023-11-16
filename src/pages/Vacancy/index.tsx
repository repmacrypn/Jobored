import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { Loader } from '@/components/Loader'
import { VacancyData } from '@/pages/Vacancy/Data'
import { FavStar } from '@/pages/Vacancy/FavStar'
import { useGetVacancyQuery } from '@/redux/vacanciesSlice'

import s from './styles.module.scss'

export const Vacancy = () => {
  const { vacancyId } = useParams()
  const { data: vacancy, isLoading, isSuccess } = useGetVacancyQuery(vacancyId!)

  if (isLoading) return <Loader isFS />

  return (
    isSuccess && (
      <div>
        <div className={s.wrapper}>
          <div className={`${s.vacancy} ${s.curVac}`}>
            <VacancyData isMainPage={false} vacancy={vacancy} />
            <FavStar vacancy={vacancy} />
          </div>
          <div className={s.vacancyText}>{parse(vacancy.vacancyRichText || '')}</div>
        </div>
      </div>
    )
  )
}
