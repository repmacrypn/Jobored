import React, { useEffect } from 'react'
import s from './Vacancies.module.css'
import FilterForm from './forms/FilterForm'
import Vacancies from './Vacancies'
import EmptyState from '../common components/emptyState/EmptyState'
import Preloader from '../common components/preloader/Preloader'
import { VacPagination } from '../common components/paginator/Paginator'
import '../../styles/defaultStyles.css'
import { useLazyGetVacanciesQuery } from '../../redux/vacanciesSlice'
import { processNoAgreement } from '../../utilites/processNoAgreement'

export const VacanciesContainer = () => {
    return (
        <div className={`_mainContentField ${s.vacanciesWrapperField}`}>
            <FilterForm />
            <ContentField />
        </div>
    )
}

export const ContentField = () => {
    const [getVacancies, { isFetching, data: vacancies }] = useLazyGetVacanciesQuery()
    const totalCount = vacancies.length > 500 ? 500 : vacancies.length

    useEffect(() => {
        const agreed = processNoAgreement('', '')

        getVacancies(agreed, 4, 0, '', '', '', '');
    }, [getVacancies]);

    if (isFetching) return <Preloader />
    if (!vacancies.length) return <EmptyState />

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