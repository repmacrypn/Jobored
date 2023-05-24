import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';

const Header = () => {
    return <header className={s.headerWrapper}>
        <div className={s.header}>
            <div className={s.logoTitle}>
                Jobored
            </div>
            <nav className={s.nav}>
                <HeaderNavItem
                    className='vacancies'
                    text='Поиск Вакансий'
                    to='vacancies'
                />
                <HeaderNavItem
                    className='fav'
                    text='Избранное'
                    to='favourites'
                />
            </nav>
        </div>
    </header>;
};

const HeaderNavItem = ({ className, text, to }) => {
    return <div className={s[className]}>
        <NavLink
            className={({ isActive }) => `${isActive ? s.active : s.nonActive}`}
            to={`/${to}`}>
            {text}
        </NavLink>
    </div>
};


export default Header;