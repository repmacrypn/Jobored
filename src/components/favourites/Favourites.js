import React from "react";
import Paginator from '../common components/paginator/Paginator';
import s from './Favourites.module.css';
import { FavStar, VacancyData } from "../vacancies/Vacancies";
import { processSalaryFieldAccom } from "../../utilites/processSalary";
import EmptyState from "../common components/emptyState/EmptyState";
import { useSelector } from "react-redux";

const Favourites = () => {
    const favourites = useSelector(state => state.favourites.favourites)
    const resultContent = <CurrentFavArray />

    if (!favourites.length) {
        return <EmptyState isButtonNeeded={true} />;
    }

    return (
        <div className={s.contentFiled}>
            <div>{resultContent}</div>
            <Paginator
                favourites={favourites}
                totalCount={favourites.length}
            />
        </div >
    );
};

const CurrentFavArray = ({ favourites }) => {
    const currentFavArray = useSelector(state => state.favourites.currentFavArray)

    const resultContent = currentFavArray.map(obj => {
        return (
            <div
                className={s.vacancy}
                key={obj.id}
            >
                <VacancyData
                    isDefault={true}
                    obj={obj}
                    processSalaryFieldAccom={processSalaryFieldAccom}
                />
                <FavStar
                    favourites={favourites}
                    obj={obj}
                />
            </div>
        )
    })

    return (
        <div>{resultContent}</div>
    )
}

export default Favourites;