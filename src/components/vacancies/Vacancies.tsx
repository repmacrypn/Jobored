import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/hooks/useAppHooks'
import { modifyFavArray, selectFav } from '@/redux/favSlice'
import { IVacancy } from '@/types/vacancy.interface'
import { processSalaryFieldAccom } from '@/utilites/processSalary'

import '@/styles/defaultStyles.css'
import s from './Vacancies.module.css'

interface IVacanciesProps {
  vacancies: IVacancy[]
}

export const Vacancies = ({ vacancies }: IVacanciesProps) => {
  const mappedVacancies = vacancies.map((obj: IVacancy) => {
    return (
      <div className={s.vacancy} key={obj.id}>
        <VacancyData isDefault obj={obj} />
        <FavStar obj={obj} />
      </div>
    )
  })

  return <div>{mappedVacancies}</div>
}

interface IVacancyDataProps {
  obj: IVacancy
  isDefault: boolean
}

export const VacancyData = ({ obj, isDefault }: IVacancyDataProps) => {
  const professionClassName = isDefault
    ? `${s.profession} titleSSemiBold`
    : `${s.profession} titleLBold`

  const townClassName = isDefault
    ? `${s.town} ${s.townDefaultFont}`
    : `${s.town} textBaseMReg`

  return (
    <>
      <div className={professionClassName}>
        {isDefault ? (
          <NavLink to={`/vacancy/${obj.id}`}>{obj.profession}</NavLink>
        ) : (
          obj.profession
        )}
      </div>
      <WorkConditionField isDefault={isDefault} obj={obj} />
      <div className={townClassName}>{obj.town?.title || 'Не указан'}</div>
    </>
  )
}

const WorkConditionField = ({ isDefault, obj }: IVacancyDataProps) => {
  const salaryClassName = isDefault
    ? `${s.salary} ${s.salaryDefaultFont}`
    : `${s.salary} titleSBold`

  const typeOfWorkClassName = isDefault ? s.typeOfWork : s.typeOfWorkNotDef

  return (
    <div className={s.workConditField}>
      <div className={salaryClassName}>
        {processSalaryFieldAccom(obj.payment_from, obj.payment_to)}
        {obj.currency}
      </div>
      <div className={s.point}>•</div>
      <div className={typeOfWorkClassName}>{obj.type_of_work?.title}</div>
    </div>
  )
}

interface IFavStarProps {
  obj: IVacancy
}

export const FavStar = ({ obj }: IFavStarProps) => {
  const favourites = useAppSelector(selectFav)

  const favStarResult = favourites.find((fav: IVacancy) => {
    return fav.id === obj.id
  }) ? (
    <UniqueFavStar vacancyObj={obj} isFav />
  ) : (
    <UniqueFavStar vacancyObj={obj} isFav={false} />
  )

  return favStarResult
}

interface IUniqueFavStarProps {
  vacancyObj: IVacancy
  isFav: boolean
}

const UniqueFavStar = ({ vacancyObj, isFav }: IUniqueFavStarProps) => {
  const className = `favStar${isFav}`
  const dispatch = useAppDispatch()

  const onFavButtonClick = (vacancy: IVacancy, isFavCur: boolean) => {
    dispatch(modifyFavArray({ vacancy, isFavCur }))
  }

  return (
    <div
      className={`${s[className]} ${s.favStar}`}
      onClick={() => onFavButtonClick(vacancyObj, isFav)}
    />
  )
}
