import { useEffect } from 'react'

import { EmptyState } from '@/components/common components/emptyState/EmptyState'
import { FavPagination } from '@/components/common components/paginator/Paginator'
import { CurrentFavArray } from '@/components/favourites/Favourites'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppHooks'
import { getFavourites, selectFav } from '@/redux/favSlice'

import s from './styles.module.scss'

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
