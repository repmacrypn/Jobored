import { useEffect } from 'react'

import { EmptyState } from '@/components/common components/emptyState/EmptyState'
import { FavPagination } from '@/components/common components/paginator/Paginator'
import { FavStar, VacancyData } from '@/components/vacancies/Vacancies'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppHooks'
import { getFavourites, selectFav } from '@/redux/favSlice'
import { IVacancy } from '@/types/vacancy.interface'

import s from './Favourites.module.css'

export const Favourites = () => {
  const dispatch = useAppDispatch()
  const favourites = useAppSelector(selectFav)
  const page = useAppSelector((state) => state.favourites.page)

  const itemsPerPage = 4

  useEffect(() => {
    dispatch(
      getFavourites(
        JSON.parse(JSON.stringify(favourites)).slice(
          page * itemsPerPage,
          page * itemsPerPage + itemsPerPage,
        ),
      ),
    )
  }, [page, dispatch, favourites])

  if (!favourites.length) {
    return <EmptyState isFS />
  }

  return (
    <div className={s.contentFiled}>
      <CurrentFavArray />
      <FavPagination
        totalCount={favourites.length}
        itemsPerPage={itemsPerPage}
        pageNumber={page}
      />
    </div>
  )
}

const CurrentFavArray = () => {
  const currentFavArray = useAppSelector((state) => state.favourites.currentFavArray)

  const content = currentFavArray.map((obj: IVacancy) => {
    return (
      <div className={s.vacancy} key={obj.id}>
        <VacancyData isDefault obj={obj} />
        <FavStar obj={obj} />
      </div>
    )
  })

  return <div>{content}</div>
}
