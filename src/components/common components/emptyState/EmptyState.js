import React from "react";
import s from './EmptyState.module.css';
import emptyState from '../../../resources/images/emptyState.png';
import { connect } from "react-redux";
import { getVacanciesOnFieldLoad } from '../../../redux/vacanciesReducer';

const EmptyState = ({ getVacanciesOnFieldLoad }) => {
    const onEmptyButtonClick = () => {
        getVacanciesOnFieldLoad(4, 0);
    };

    return <div className={s.emptyWrapper}>
        <img
            className={s.emptyState}
            alt="empty state"
            src={emptyState}
            width='240px'
            height='230px'
        />
        <div className={s.emptyTitle}>
            Упс, здесь еще ничего нет!
        </div>
        <div
            onClick={onEmptyButtonClick}
            className={s.emptyButton}>
            Поиск Вакансий
        </div>
    </div>
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getVacanciesOnFieldLoad })(EmptyState);