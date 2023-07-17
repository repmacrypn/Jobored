import React, { useEffect } from 'react';
import Preloader from '../common components/preloader/Preloader';
import { VacPagination } from '../common components/paginator/Paginator';
import FilterForm from "./forms/FilterForm";
import s from './Vacancies.module.css';
import '../../styles/defaultStyles.css';
import Vacancies from './Vacancies';
import EmptyState from '../common components/emptyState/EmptyState';
import { useLazyGetVacanciesQuery } from '../../redux/vacanciesSlice';

export const VacanciesContainer = () => {
    return (
        <div className={`_mainContentField ${s.vacanciesWrapperField}`}>
            <FilterForm />
            <ContentField />
        </div>
    );
};

export const ContentField = () => {
    const [getVacancies, { isFetching, data: vacancies }] = useLazyGetVacanciesQuery()
    const totalCount = vacancies.length > 500 ? 500 : vacancies.length

    useEffect(() => {
        getVacancies(4, 0, '', '', '', '');
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
};