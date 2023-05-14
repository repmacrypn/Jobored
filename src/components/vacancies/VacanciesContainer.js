import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    setCatalogue, setPaymentFrom, setPaymentTo, setKeyWord, setCurrentPage,
    getVacanciesOnFieldChange, getAllCatalogues, getVacanciesOnFieldLoad
} from '../../redux/vacanciesReducer';
import { modifyFavArray, setFavTotalCount } from '../../redux/favReducer';
import starFavImage from '../../resources/images/StarFav.png';
import starNotFavImage from '../../resources/images/StarNotFav.png';
import Preloader from '../common components/preloader/Preloader';
import Paginator from '../../utilites/Paginator';
import FilterForm from "./forms/FilterForm";
import s from './Vacancies.module.css';
import '../../styles/defaultStyles.css';

const VacanciesContainer = (props) => {
    const [paginatorPortionNum, setPaginatorPortionNum] = useState(Math.ceil(props.currentPage === 0 ?
        1 : props.currentPage / props.portionSise));

    useEffect(() => {
        props.getVacanciesOnFieldLoad(props.count, props.currentPage, props.catalogue,
            props.paymentFrom, props.paymentTo, props.keyWord);
    }, []);

    useEffect(() => {
        props.getAllCatalogues();
    }, []);

    const onPageChange = (pageNumber) => {
        props.getVacanciesOnFieldChange(props.count, pageNumber, props.catalogue,
            props.paymentFrom, props.paymentTo, props.keyWord);
    };

    const onFavButtonClick = (vacancy, isFav) => {
        props.modifyFavArray(vacancy, isFav);
        isFav ?
            props.setFavTotalCount(--props.favourites.length) :
            props.setFavTotalCount(++props.favourites.length)
    };

    return (
        <div className={`_mainContentField ${s.vacanciesMainField}`}>
            <div className={s.filterField}>
                <FilterForm
                    setPaginatorPortionNum={setPaginatorPortionNum}
                    setKeyWord={props.setKeyWord}
                    setPaymentFrom={props.setPaymentFrom}
                    setPaymentTo={props.setPaymentTo}
                    setCatalogue={props.setCatalogue}
                    getVacancies={props.getVacanciesOnFieldLoad}
                    allCatalogues={props.allCatalogues}
                    count={props.count}
                    setCurrentPage={props.setCurrentPage}
                />
            </div>
            <div className={s.contentField}>
                {
                    props.isFetching ?
                        <Preloader /> :
                        <div>
                            <Paginator
                                onPageChange={onPageChange}
                                pageSize={props.count}
                                totalItemsCount={props.totalCount}
                                currentPage={props.currentPage === 0 ? 1 : props.currentPage}
                                paginatorPortionNum={paginatorPortionNum}
                                setPaginatorPortionNum={setPaginatorPortionNum}
                            />
                            {
                                props.vacancies.map(obj => {
                                    return <div key={obj.id}>
                                        {obj.profession} - {obj.firm_name} - {obj.town?.title} - {obj.catalogues[0]?.title} - {obj.type_of_work?.title}
                                        - {obj.payment_to}:{obj.payment_from}/{obj.currency}
                                        {
                                            props.favourites.find(fav => {
                                                return fav.id === obj.id;
                                            }) ?
                                                <span onClick={() => onFavButtonClick(obj, true)}>
                                                    <img
                                                        height='22px'
                                                        width='22px'
                                                        alt='remove from favourites'
                                                        src={starFavImage}
                                                    />
                                                </span>
                                                :
                                                <span onClick={() => onFavButtonClick(obj, false)}>
                                                    <img
                                                        height='22px'
                                                        width='22px'
                                                        alt='add to favourites'
                                                        src={starNotFavImage}
                                                    />
                                                </span>
                                        }
                                    </div>
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
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
    setCatalogue, setPaymentFrom, setPaymentTo, setKeyWord, modifyFavArray,
    getVacanciesOnFieldChange, getAllCatalogues, getVacanciesOnFieldLoad,
    setCurrentPage, setFavTotalCount
})(VacanciesContainer);