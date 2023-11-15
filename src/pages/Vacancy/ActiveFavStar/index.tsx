import { useAppDispatch } from '@/hooks/useAppHooks'
import { modifyFavArray } from '@/redux/favSlice'
import { IVacancy } from '@/types/vacancy.interface'

import { IActiveFavStar } from './interface'

import s from './styles.module.scss'

export const ActiveFavStar = ({ vacancy, isFav }: IActiveFavStar) => {
  const dispatch = useAppDispatch()
  const className = `favStar${isFav}`

  const onFavButtonClick = (vacancy: IVacancy, isFavCur: boolean) => {
    dispatch(modifyFavArray({ vacancy, isFavCur }))
  }

  return (
    <div
      className={`${s[className]} ${s.favStar}`}
      onClick={() => onFavButtonClick(vacancy, isFav)}
    />
  )
}
