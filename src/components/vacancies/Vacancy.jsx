import React from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { FavStar, VacancyData } from './Vacancies'
import s from './Vacancies.module.css'
import Preloader from '../common components/preloader/Preloader'
import { useGetVacancyQuery } from '../../redux/vacanciesSlice'

export const Vacancy = () => {

    const { vacancyId } = useParams()
    const { data: vacancy, isLoading } = useGetVacancyQuery(vacancyId)

    const vacancyRichText = parse(vacancy.vacancyRichText ? vacancy.vacancyRichText : '')

    if (isLoading) return <Preloader />

    return (
        <div>
            <div className={s.pageWrapper}>
                <div className={`${s.vacancy} ${s.curVac}`}>
                    <VacancyData
                        isDefault={false}
                        obj={vacancy}
                    />
                    <FavStar
                        obj={vacancy}
                    />
                </div>
                <div className={s.vacancyPageWrapper}>
                    {vacancyRichText}
                </div>
            </div>
        </div>
    )
}