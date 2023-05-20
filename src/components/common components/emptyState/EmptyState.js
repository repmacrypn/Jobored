import React, { useState } from "react";
import s from './EmptyState.module.css';
import emptyState from '../../../resources/images/emptyState.png';
import { connect } from "react-redux";
import { getVacanciesOnFieldLoad } from '../../../redux/vacanciesReducer';
import { Link } from "react-router-dom";

const EmptyState = ({ getVacanciesOnFieldLoad }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onEmptyButtonClick = async () => {
        setIsSubmitting(true);
        await getVacanciesOnFieldLoad(4, 0);
        setIsSubmitting(false);
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
        <button
            disabled={isSubmitting}
            onClick={onEmptyButtonClick}
            className={s.emptyButton}>
            <Link to='/vacancies/*'>Поиск Вакансий</Link>
        </button>
    </div>
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getVacanciesOnFieldLoad })(EmptyState);