import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    setCurrentPage, getVacanciesOnFieldChange, getAllCatalogues,
    getVacanciesOnFieldLoad
} from '../../redux/vacanciesReducer';
import { modifyFavArray, setFavTotalCount } from '../../redux/favReducer';
import Preloader from '../common components/preloader/Preloader';
import Paginator from '../common components/paginator/Paginator';
import FilterForm from "./forms/FilterForm";
import s from './Vacancies.module.css';
import '../../styles/defaultStyles.css';
import Vacancies from './Vacancies';
import EmptyState from '../common components/emptyState/EmptyState';
import { processSalaryFieldAccom } from '../../utilites/processSalary';

const VacanciesContainer = ({ vacancies, currentPage, portionSise, getVacanciesOnFieldLoad,
    catalogue, paymentFrom, paymentTo, keyWord, getAllCatalogues, getVacanciesOnFieldChange,
    isFetching, allCatalogues, setCurrentPage, favourites, totalCount,
    setFavTotalCount, modifyFavArray, count }) => {

    const [paginatorPortionNum, setPaginatorPortionNum] = useState(Math.ceil((currentPage + 1) / portionSise));

    useEffect(() => {
        getVacanciesOnFieldLoad(count, currentPage, catalogue, paymentFrom, paymentTo, keyWord);
    }, [getVacanciesOnFieldLoad]);

    useEffect(() => {
        getAllCatalogues();
    }, [getAllCatalogues]);

    const onPageChange = (pageNumber) => {
        getVacanciesOnFieldChange(count, pageNumber, catalogue, paymentFrom, paymentTo, keyWord);
    };

    return (
        <div className={`_mainContentField ${s.vacanciesWrapperField}`}>
            <FilterForm
                catalogue={catalogue}
                paymentFrom={paymentFrom}
                paymentTo={paymentTo}
                keyWord={keyWord}
                setPaginatorPortionNum={setPaginatorPortionNum}
                getVacancies={getVacanciesOnFieldLoad}
                allCatalogues={allCatalogues}
                count={count}
                setCurrentPage={setCurrentPage}
            />
            <ContentField
                isFetching={isFetching}
                vacancies={vacancies}
                favourites={favourites}
                processSalaryFieldAccom={processSalaryFieldAccom}
                onPageChange={onPageChange}
                pageSize={count}
                totalItemsCount={totalCount}
                currentPage={currentPage}
                paginatorPortionNum={paginatorPortionNum}
                setPaginatorPortionNum={setPaginatorPortionNum}
                setFavTotalCount={setFavTotalCount}
                modifyFavArray={modifyFavArray}
            />
        </div>
    );
};

export const ContentField = ({ vacancies, favourites, processSalaryFieldAccom,
    pageSize, onPageChange, totalItemsCount, currentPage, setFavTotalCount,
    paginatorPortionNum, setPaginatorPortionNum, modifyFavArray, isFetching }) => {

    return <div className={s.contentField}>
        {
            isFetching ?
                <Preloader /> :
                !vacancies.length ?
                    <EmptyState /> :
                    <>
                        <Vacancies
                            setFavTotalCount={setFavTotalCount}
                            modifyFavArray={modifyFavArray}
                            vacancies={vacancies}
                            favourites={favourites}
                            processSalaryFieldAccom={processSalaryFieldAccom}
                        />
                        <Paginator
                            onPageChange={onPageChange}
                            pageSize={pageSize}
                            totalItemsCount={totalItemsCount}
                            currentPage={currentPage}
                            paginatorPortionNum={paginatorPortionNum}
                            setPaginatorPortionNum={setPaginatorPortionNum}
                        />
                    </>
        }
    </div>
};

const mapStateToProps = (state) => {
    return {
        vacancies: state.vacanciesReducer.vacancies,
        catalogue: state.vacanciesReducer.catalogue,
        paymentFrom: state.vacanciesReducer.paymentFrom,
        paymentTo: state.vacanciesReducer.paymentTo,
        keyWord: state.vacanciesReducer.keyWord,
        count: state.vacanciesReducer.count,
        portionSise: state.vacanciesReducer.portionSise,
        totalCount: state.vacanciesReducer.totalCount,
        currentPage: state.vacanciesReducer.currentPage,
        isFetching: state.vacanciesReducer.isFetching,
        allCatalogues: state.vacanciesReducer.allCatalogues,
        favourites: state.favReducer.favourites,
    };
};

export default connect(mapStateToProps, {
    modifyFavArray, setCurrentPage, setFavTotalCount,
    getVacanciesOnFieldChange, getAllCatalogues, getVacanciesOnFieldLoad,
})(VacanciesContainer);