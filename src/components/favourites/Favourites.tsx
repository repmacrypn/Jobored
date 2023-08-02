import { useEffect } from 'react'
import s from './Favourites.module.css'
import { FavPagination } from '../common components/paginator/Paginator'
import { FavStar, VacancyData } from '../vacancies/Vacancies'
import { EmptyState } from '../common components/emptyState/EmptyState'
import { getFavourites, selectFav } from '../../redux/favSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppHooks'
import { IVacancy } from '../../types/vacancy.interface'

export const Favourites = () => {
    const dispatch = useAppDispatch()
    const favourites = useAppSelector(selectFav)
    const page = useAppSelector(state => state.favourites.page)

    const itemsPerPage = 4

    useEffect(() => {
        dispatch(getFavourites(JSON.parse(JSON.stringify(favourites))
            .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)))
    }, [page, dispatch, favourites])

    if (!favourites.length) {
        return <EmptyState isFS={true} />
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
    const currentFavArray = useAppSelector(state => state.favourites.currentFavArray)

    const content = currentFavArray.map((obj: IVacancy) => {
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

    return <div>{content}</div>
}