import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import s from './Vacancies.module.css'
import '../../styles/defaultStyles.css'
import { modifyFavArray } from '../../redux/favSlice'
import { processSalaryFieldAccom } from '../../utilites/processSalary'
import { selectFav } from '../../redux/favSlice'

export const Vacancies = ({ vacancies }) => {
    const mappedVacancies = vacancies.map(obj => {
        return (
            <div
                className={s.vacancy}
                key={obj.id}
            >
                <VacancyData
                    isDefault={true}
                    obj={obj}
                />
                <FavStar
                    obj={obj}
                />
            </div>
        )
    })

    return <div>{mappedVacancies}</div>
}

export const VacancyData = ({ obj, isDefault }) => {
    const professionClassName = isDefault ?
        `${s.profession} titleSSemiBold` :
        `${s.profession} titleLBold`

    const townClassName = isDefault ?
        `${s.town} ${s.townDefaultFont}` :
        `${s.town} textBaseMReg`

    return (
        <>
            <div className={professionClassName}>
                {
                    isDefault ?
                        <NavLink to={`/vacancy/${obj.id}`}>
                            {obj.profession}
                        </NavLink> :
                        obj.profession
                }
            </div>
            <WorkConditionField
                isDefault={isDefault}
                obj={obj}
            />
            <div className={townClassName}>
                {obj.town?.title || 'Не указан'}
            </div>
        </>
    )
}

const WorkConditionField = ({ isDefault, obj }) => {
    const salaryClassName = isDefault ?
        `${s.salary} ${s.salaryDefaultFont}` :
        `${s.salary} titleSBold`

    const typeOfWorkClassName = isDefault ?
        s.typeOfWork : s.typeOfWorkNotDef

    return (
        <div className={s.workConditField}>
            <div className={salaryClassName}>
                {processSalaryFieldAccom(obj.payment_from, obj.payment_to)}
                {obj.currency}
            </div>
            <div className={s.point}>
                •
            </div>
            <div className={typeOfWorkClassName}>
                {obj.type_of_work?.title}
            </div>
        </div>
    )
}

export const FavStar = ({ obj }) => {
    const favourites = useSelector(selectFav)

    const favStarResult = favourites.find(fav => {
        return fav.id === obj.id
    }) ?
        <UniqueFavStar vacancyObj={obj} isFav={true} /> :
        <UniqueFavStar vacancyObj={obj} isFav={false} />

    return <>{favStarResult}</>
}

const UniqueFavStar = ({ vacancyObj, isFav }) => {
    const className = `favStar${isFav}`
    const dispatch = useDispatch()

    const onFavButtonClick = (vacancy, isFavCur) => {
        dispatch(modifyFavArray({ vacancy, isFavCur }))
        /* dispatch(setFavTotalCount(isFavCur)) */
    }

    return (
        <div
            className={`${s[className]} ${s.favStar}`}
            onClick={() => onFavButtonClick(vacancyObj, isFav)}>
        </div>
    )
}