import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { FavStar, VacancyData } from './Vacancies'
import s from './Vacancies.module.css'
import Preloader from '../common components/preloader/Preloader'
import { useGetVacancyQuery } from '../../redux/vacanciesSlice'
import { IVacancy } from '../../types/vacancy.interface'

export const Vacancy = () => {

    const { vacancyId } = useParams()
    const { data: vacancy, isLoading, isSuccess } = useGetVacancyQuery(vacancyId!)

    let vacancyRichText

    if (isSuccess) vacancyRichText = parse(vacancy.vacancyRichText || '')
    if (isLoading) return <Preloader />

    return (
        <div>
            <div className={s.pageWrapper}>
                <div className={`${s.vacancy} ${s.curVac}`}>
                    <VacancyData
                        isDefault={false}
                        obj={vacancy as IVacancy}
                    />
                    <FavStar
                        obj={vacancy as IVacancy}
                    />
                </div>
                <div className={s.vacancyPageWrapper}>
                    {vacancyRichText}
                </div>
            </div>
        </div>
    )
}