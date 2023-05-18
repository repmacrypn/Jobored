import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';

const Header = () => {
    return <header className={s.header}>
        <div className={s.logoTitle}>
            Jobored
        </div>
        <nav className={s.nav}>
            <div className={s.vacancies}>
                <NavLink
                    className={({ isActive }) => `${isActive ? s.active : s.nonActive}`}
                    to='/vacancies'>
                    Поиск Вакансий
                </NavLink>
            </div>
            <div className={s.fav}>
                <NavLink
                    className={({ isActive }) => `${isActive ? s.active : s.nonActive}`}
                    to='/favourites'>
                    Избранное
                </NavLink>
            </div>
        </nav>
    </header>;
};

export default Header;