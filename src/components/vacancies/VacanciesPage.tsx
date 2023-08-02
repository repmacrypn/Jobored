import s from './Vacancies.module.css'
import { Form } from './forms/FilterForm'
import { Vacancies } from './Vacancies'
import { EmptyState } from '../common components/emptyState/EmptyState'
import Preloader from '../common components/preloader/Preloader'
import { VacPagination } from '../common components/paginator/Paginator'
import '../../styles/defaultStyles.css'
import { selectQueryData, useGetVacanciesQuery } from '../../redux/vacanciesSlice'
import { selectIsAuth } from '../../redux/authSlice'
import { useAppSelector } from '../../hooks/useAppHooks'

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

    const { isFetching, isSuccess, data: { total, vacancies } = { total: 0, vacancies: [] } } = useGetVacanciesQuery(query)

    const totalCount = total > 500 ? 500 : total

    if (isFetching) return <Preloader isFS={false} />
    if (totalCount === 0) return <EmptyState isButtonNeeded={false} />

    return isSuccess &&
        (
            <div className={s.contentField}>
                <Vacancies
                    vacancies={vacancies}
                />
                <VacPagination
                    query={query}
                    totalCount={totalCount}
                />
            </div>
        )
}