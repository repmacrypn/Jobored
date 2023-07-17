import React from 'react'
import { Link } from 'react-router-dom'
import s from './EmptyState.module.css'
import emptyState from '../../../resources/images/emptyState.png'

export const EmptyState = ({ isButtonNeeded }) => {
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
        {
            isButtonNeeded &&
            <div className={s.emptyButton}>
                <Link to='/vacancies/*'>Поиск Вакансий</Link>
            </div>
        }
    </div>
}