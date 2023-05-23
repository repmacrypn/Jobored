import React from "react";
import s from './Paginator.module.css';

const Paginator = ({ totalItemsCount, pageSize, currentPage,
    onPageChange, portionSise = 3, setPaginatorPortionNum, paginatorPortionNum }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSise);
    let leftPortionNumber = (paginatorPortionNum - 1) * portionSise + 1;
    let rightPortionNumber = paginatorPortionNum * portionSise;

    return <div className={s.paginator}>
        <button
            className={`${s.button} ${s.chevLeft}`}
            disabled={!(paginatorPortionNum > 1)}
            onClick={() => setPaginatorPortionNum(paginatorPortionNum - 1)}>
        </button >
        {
            pages
                .filter(p => {
                    return p >= leftPortionNumber && p <= rightPortionNumber;
                })
                .map(p => {
                    return (
                        <div
                            className={(p - 1) === currentPage ? `${s.selectedButton} ${s.button}` : s.button}
                            key={p}
                            onClick={() => onPageChange(p - 1)}
                        >
                            {p}
                        </div>
                    )
                })
        }
        <button
            className={`${s.button} ${s.chevRight}`}
            disabled={!(portionCount > paginatorPortionNum)}
            onClick={() => setPaginatorPortionNum(paginatorPortionNum + 1)}
        >
        </button>
    </div>;
};

export default Paginator;
