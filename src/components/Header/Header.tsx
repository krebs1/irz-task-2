import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import Style from "./Header.module.scss";
import HeaderLink from "./HeaderLink/HeaderLink";
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHooks";

const Header = () => {
    const {isAuthorize} = useAppSelector(state => state.userReducer);

    return (
        <header className={`${Style.header} pt-4 pb-4`}>
            <nav className={Style.header_nav}>
                <ul className={Style.header_nav_ul}>
                    <div className={Style.header_nav_ul_left}>
                        <li className={`${Style.header_nav_ul_left_li} ${Style.header_nav_ul_liLink} p-5 mr-2`}>
                            <NavLink className={({isActive}) => isActive ? Style.linkActive : Style.linkInactive}
                                     to="/"
                            >
                                <BurgerIcon type="primary"/>
                                <span className={`pl-2`}></span>
                                Конструктор
                            </NavLink>
                        </li>
                        <li className={`${Style.header_nav_ul_left_li} ${Style.header_nav_ul_liLink} p-5`}
                            style={{color: `var(--text-inactive-color)`}}
                        >
                            <NavLink className={({isActive}) => isActive ? Style.linkActive : Style.linkInactive}
                                     to="/"
                            >
                                <ListIcon type="secondary"/>
                                <span className={`pl-2`}></span>
                                Лента заказов
                            </NavLink>
                        </li>
                    </div>
                    <div className={Style.header_nav_ul_mid}>
                        <li className={Style.header_nav_ul_mid_li}>
                            <Logo/>
                        </li>
                    </div>
                    <div className={Style.header_nav_ul_right}>
                        <li className={`${Style.header_nav_ul_right_li} ${Style.header_nav_ul_liLink} p-5`}
                            style={{color: `var(--text-inactive-color)`}}
                        >
                            <NavLink className={({isActive}) => isActive ? Style.linkActive : Style.linkInactive}
                                     to={isAuthorize ? "/profile/" : "/login"}
                            >
                                <ProfileIcon type="secondary"/>
                                <span className={`pl-2`}></span>
                                Личный кабинет
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;