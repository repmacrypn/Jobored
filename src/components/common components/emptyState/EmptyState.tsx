import { Link } from 'react-router-dom'
import s from './EmptyState.module.css'
import emptyState from '../../../resources/images/emptyState.png'
import { IIsFullScreen } from '../../../types/isFullScreen.interface'

export const EmptyState = ({ isFS }: IIsFullScreen) => {
    return <div className={`${s['emptyWrapper' + isFS]} ${s.emptyWrapper}`}> 
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
            isFS &&
            <div className={s.emptyButton}>
                <Link to='/vacancies/*'>Поиск Вакансий</Link>
            </div>
        }
    </div>
}