import React, { useState } from "react";
import Paginator from '../common components/paginator/Paginator';
import s from './Favourites.module.css';
import { FavStar, VacancyData } from "../vacancies/Vacancies";
import { processSalaryFieldAccom } from "../../utilites/processSalary";
import EmptyState from "../common components/emptyState/EmptyState";

const Favourites = ({ currentFavArray, favourites, modifyFavArray,
    setFavTotalCount, totalCount, count, currentPage,
    changeCurrentPageOnClick, portionSise }) => {

    const [paginatorPortionNum, setPaginatorPortionNum] = useState(Math.ceil((currentPage + 1) / portionSise));

    if (!favourites.length) {
        return <EmptyState isButtonNeeded={true} />;
    }

    return (
        <div className={s.contentFiled}>
            <div>
                {
                    currentFavArray.map(obj => {
                        return <div
                            data-elem={`vacancy-${obj.id}`}
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
                                modifyFavArray={modifyFavArray}
                                setFavTotalCount={setFavTotalCount}
                            />
                        </div>
                    })
                }
            </div>
            <Paginator
                totalItemsCount={totalCount}
                pageSize={count}
                currentPage={currentPage}
                onPageChange={changeCurrentPageOnClick}
                paginatorPortionNum={paginatorPortionNum}
                setPaginatorPortionNum={setPaginatorPortionNum}
            />
        </div >
    );
};

export default Favourites;