import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import Style from "./Header.module.scss";
import HeaderLink from "./HeaderLink/HeaderLink";

const Header = () => {
    return (
        <header className={`${Style.header} pt-4 pb-4`}>
            <nav className={Style.header_nav}>
                <ul className={Style.header_nav_ul}>
                    <div className={Style.header_nav_ul_left}>
                        <li className={`${Style.header_nav_ul_left_li} ${Style.header_nav_ul_liLink} p-5 mr-2`}>
                            <BurgerIcon type="primary"/>
                            <span className={`pl-2`}>Конструктор</span>
                        </li>
                        <li className={`${Style.header_nav_ul_left_li} ${Style.header_nav_ul_liLink} p-5`}
                            style={{color: `var(--text-inactive-color)`}}
                        >
                            <ListIcon type="secondary"/>
                            <span className={`pl-2`}>Лента заказов</span>
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
                            <ProfileIcon type="secondary"/>
                            <span className={`pl-2`}>Личный кабинет</span>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;