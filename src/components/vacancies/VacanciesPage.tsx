/* import { EmptyState } from '@/components/common components/emptyState/EmptyState'
import { VacPagination } from '@/components/common components/paginator/Paginator'
import Preloader from '@/components/common components/preloader/Preloader'
import { Form } from '@/components/vacancies/forms/FilterForm'
import { VacanciesBlock } from '@/components/vacancies/Vacancies'
import { useAppSelector } from '@/hooks/useAppHooks'
import { selectIsAuth } from '@/redux/authSlice'
import { selectQueryData, useGetVacanciesQuery } from '@/redux/vacanciesSlice'

import '@/styles/defaultStyles.css'
import s from './Vacancies.module.css'

export const VacanciesPage = () => {
  const isAuth = useAppSelector(selectIsAuth)

  if (!isAuth) return <Preloader isFS={false} />

  return (
    <div className={`_mainContentField ${s.vacanciesWrapperField}`}>
      <Form />
      <ContentField />
    </div>
  )
}

export const ContentField = () => {
  const query = useAppSelector(selectQueryData)

  const {
    isFetching,
    isSuccess,
    data: { total, vacancies } = { total: 0, vacancies: [] },
  } = useGetVacanciesQuery(query)

  const totalCount = total > 500 ? 500 : total

  if (isFetching) return <Preloader isFS={false} />
  if (totalCount === 0) return <EmptyState isFS={false} />

  return (
    isSuccess && (
      <div className={s.contentField}>
        <VacanciesBlock vacancies={vacancies} />
        <VacPagination query={query} totalCount={totalCount} />
      </div>
    )
  )
}
 */
