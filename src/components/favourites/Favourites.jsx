import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './Favourites.module.css'
import { FavPagination } from '../common components/paginator/Paginator'
import { FavStar, VacancyData } from '../vacancies/Vacancies'
import { EmptyState } from '../common components/emptyState/EmptyState'
import { getFavourites, selectFav } from '../../redux/favSlice'

export const Favourites = () => {
    const dispatch = useDispatch()
    const favourites = useSelector(selectFav)
    const page = useSelector(state => state.favourites.page)

    const itemsPerPage = 4

    useEffect(() => {
        dispatch(getFavourites(JSON.parse(JSON.stringify(favourites))
            .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)))
    }, [page, dispatch, favourites])

    if (!favourites.length) {
        return <EmptyState isButtonNeeded={true} />;
    }

    return (
        <div className={s.contentFiled}>
            <CurrentFavArray />
            <FavPagination
                totalCount={favourites.length}
                itemsPerPage={itemsPerPage}
                pageNumber={page}
                dispatch={dispatch}
            />
        </div>
    );
};

const CurrentFavArray = () => {
    const currentFavArray = useSelector(state => state.favourites.currentFavArray)

    const content = currentFavArray.map(obj => {
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