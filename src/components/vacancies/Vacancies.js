import React from "react";
import s from './Vacancies.module.css';
import '../../styles/defaultStyles.css';
import { NavLink } from "react-router-dom";

const Vacancies = React.memo(({ vacancies, favourites, modifyFavArray,
    processSalaryFieldAccom, setFavTotalCount }) => {

    return <div>
        {
            vacancies.map(obj => {
                return <div
                    data-elem={`vacancy-${obj.id}`}
                    className={s.vacancy}
                    key={obj.id}>
                    <VacancyData
                        isDefault={true}
                        obj={obj}
                        processSalaryFieldAccom={processSalaryFieldAccom}
                    />
                    <FavStar
                        setFavTotalCount={setFavTotalCount}
                        modifyFavArray={modifyFavArray}
                        obj={obj}
                        favourites={favourites}
                    />
                </div>
            })
        }
    </div>
});

export const VacancyData = React.memo(({ obj, processSalaryFieldAccom, isDefault }) => {

    return <>
        <div className={isDefault ?
            `${s.profession} titleSSemiBold` :
            `${s.profession} titleLBold`}>
            {
                isDefault ?
                    <NavLink to={`/vacancy/${obj.id}`}>
                        {obj.profession}
                    </NavLink> :
                    obj.profession
            }
        </div>
        <WorkConditionField
            processSalaryFieldAccom={processSalaryFieldAccom}
            isDefault={isDefault}
            obj={obj}
        />
        <div className={isDefault ?
            `${s.town} ${s.townDefaultFont}` :
            `${s.town} textBaseMReg`
        }>
            {obj.town?.title || 'Не указан'}
        </div>
    </>
});

const WorkConditionField = ({ isDefault, processSalaryFieldAccom, obj }) => {
    return <div className={s.workConditField}>
        <div className={isDefault ?
            `${s.salary} ${s.salaryDefaultFont}` :
            `${s.salary} titleSBold`
        }>
            {processSalaryFieldAccom(obj.payment_from, obj.payment_to)}
            {obj.currency}
        </div>
        <div className={s.point}>
            •
        </div>
        <div className={isDefault ?
            s.typeOfWork : s.typeOfWorkNotDef}>
            {obj.type_of_work?.title}
        </div>
    </div>;
};

export const FavStar = ({ favourites, obj, modifyFavArray, setFavTotalCount }) => {
    const onFavButtonClick = (vacancy, isFav) => {
        modifyFavArray(vacancy, isFav);
        isFav ?
            setFavTotalCount(--favourites.length) :
            setFavTotalCount(++favourites.length)
    };

    return <>
        {
            favourites.find(fav => {
                return fav.id === obj.id;
            }) ?
                <div
                    data-elem={`vacancy-${obj.id}-shortlist-button`}
                    className={`${s.favStar} ${s.fav}`}
                    onClick={() => onFavButtonClick(obj, true)}>
                </div> :
                <div
                    data-elem={`vacancy-${obj.id}-shortlist-button`}
                    className={`${s.favStar} ${s.notFav}`}
                    onClick={() => onFavButtonClick(obj, false)}>
                </div>
        }
    </>;
};

export default Vacancies;