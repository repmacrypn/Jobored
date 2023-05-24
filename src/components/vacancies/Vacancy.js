import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FavStar, VacancyData } from "./Vacancies";
import { processSalaryFieldAccom } from '../../utilites/processSalary';
import Preloader from "../common components/preloader/Preloader";
import { connect } from "react-redux";
import { getVacancy } from "../../redux/vacanciesReducer";
import s from './Vacancies.module.css';
import parse from 'html-react-parser';
import { setFavTotalCount, modifyFavArray } from '../../redux/favReducer';

const Vacancy = ({ getVacancy, vacancy, isFetching, favourites,
    setFavTotalCount, modifyFavArray }) => {

    const { vacancyId } = useParams();

    useEffect(() => {
        getVacancy(vacancyId);
    }, [getVacancy, vacancyId]);

    return <div>
        {
            isFetching ?
                <Preloader /> :
                <div className={s.pageWrapper}>
                    <div className={`${s.vacancy} ${s.curVac}`}>
                        <VacancyData
                            isDefault={false}
                            obj={vacancy}
                            processSalaryFieldAccom={processSalaryFieldAccom}
                        />
                        <FavStar
                            setFavTotalCount={setFavTotalCount}
                            modifyFavArray={modifyFavArray}
                            favourites={favourites}
                            obj={vacancy}
                        />
                    </div>
                    <div className={s.vacancyPageWrapper}>
                        {parse(vacancy.vacancyRichText ? vacancy.vacancyRichText : '')}
                    </div>
                </div>
        }
    </div>;
};

const mapStateToProps = (state) => {
    return {
        vacancy: state.vacanciesReducer.vacancy,
        isFetching: state.vacanciesReducer.isFetching,
        favourites: state.favReducer.favourites,
    };
};

export default connect(mapStateToProps, { getVacancy, modifyFavArray, setFavTotalCount })(Vacancy);