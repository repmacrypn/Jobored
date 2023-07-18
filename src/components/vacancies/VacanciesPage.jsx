import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import s from './Vacancies.module.css'
import { Form } from './forms/FilterForm'
import { Vacancies } from './Vacancies'
import { EmptyState } from '../common components/emptyState/EmptyState'
import Preloader from '../common components/preloader/Preloader'
import { VacPagination } from '../common components/paginator/Paginator'
import '../../styles/defaultStyles.css'
import { useLazyGetVacanciesQuery } from '../../redux/vacanciesSlice'
import { processNoAgreement } from '../../utilites/processNoAgreement'
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
    const [getVacancies, { isFetching, data: { total, vacancies } = { total: null, vacancies: [] } }] = useLazyGetVacanciesQuery()
    const totalCount = total > 500 ? 500 : total

    useEffect(() => {
        const agreed = processNoAgreement('', '')

        getVacancies({ agreed, count: 4, page: 0, catalogue: '', paymentFrom: '', paymentTo: '', searchKeyWord: '' })
    }, [getVacancies]);

    if (isFetching) return <Preloader />
    if (totalCount === 0) return <EmptyState />

    return (
        <div className={s.contentField}>
            <Vacancies
                vacancies={vacancies}
            />
            <VacPagination
                totalCount={totalCount}
                getVacancies={getVacancies}
            />
        </div>
    )
}