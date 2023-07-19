import React from 'react'
import { useSelector } from 'react-redux'
import s from './Vacancies.module.css'
import { Form } from './forms/FilterForm'
import { Vacancies } from './Vacancies'
import { EmptyState } from '../common components/emptyState/EmptyState'
import Preloader from '../common components/preloader/Preloader'
import { VacPagination } from '../common components/paginator/Paginator'
import '../../styles/defaultStyles.css'
import { selectQueryData, useGetVacanciesQuery } from '../../redux/vacanciesSlice'
import { selectIsAuth } from '../../redux/authSlice'

export const VacanciesPage = () => {
    const isAuth = useSelector(selectIsAuth)
    if (!isAuth) return <Preloader />

    return (
        <div className={`_mainContentField ${s.vacanciesWrapperField}`}>
            <Form />
            <ContentField />
        </div>
    )
}

export const ContentField = () => {
    const query = useSelector(selectQueryData)

    const { isFetching, isSuccess, data: { total, vacancies } = { total: null, vacancies: [] } } = useGetVacanciesQuery(query)

    const totalCount = total > 500 ? 500 : total

    if (isFetching) return <Preloader />
    if (totalCount === 0) return <EmptyState />

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