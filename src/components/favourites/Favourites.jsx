import React from 'react'
import { useSelector } from 'react-redux'
import s from './Favourites.module.css'
import { FavPagination } from '../common components/paginator/Paginator'
import { FavStar, VacancyData } from '../vacancies/Vacancies'
import { EmptyState } from '../common components/emptyState/EmptyState'
import { selectFav } from '../../redux/favSlice'

export const Favourites = () => {
    const favourites = useSelector(selectFav)
    const resultContent = <CurrentFavArray />

    if (!favourites.length) {
        return <EmptyState isButtonNeeded={true} />;
    }

    return (
        <div className={s.contentFiled}>
            <div>{resultContent}</div>
            <FavPagination
                favourites={favourites}
                totalCount={favourites.length}
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