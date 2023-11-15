import { EmptyState } from '@/components/common components/emptyState/EmptyState'
import { VacPagination } from '@/components/common components/paginator/Paginator'
import { Loader } from '@/components/Loader'
import { useAppSelector } from '@/hooks/useAppHooks'
import { VacancyData } from '@/pages/Vacancy/Data'
import { FavStar } from '@/pages/Vacancy/FavStar'
import { selectQueryData, useGetVacanciesQuery } from '@/redux/vacanciesSlice'

import s from './styles.module.scss'

export const VacanciesBlock = () => {
  const query = useAppSelector(selectQueryData)

  const { isFetching, data: { total, vacancies } = { total: 0, vacancies: [] } } =
    useGetVacanciesQuery(query)

  const totalCount = total > 500 ? 500 : total

  if (isFetching) return <Loader isFS={false} />
  if (totalCount === 0) return <EmptyState isFS={false} />

  return (
    <div className={s.wrapper}>
      <div>
        {vacancies.map((v) => {
          return (
            <div className={s.vacancy} key={v.id}>
              <VacancyData isMainPage vacancy={v} />
              <FavStar vacancy={v} />
            </div>
          )
        })}
      </div>
      <VacPagination query={query} totalCount={totalCount} />
    </div>
  )
}
