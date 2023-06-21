import React from 'react';
import {Navigate, NavLink, Outlet, useNavigate} from "react-router-dom";
import Style from "./ProfileLayout.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {logoutUser} from "../../store/actions/UserActions";

const ProfileLayout = () => {
    const dispatch = useAppDispatch();
    const {refreshToken} = useAppSelector(state => state.userReducer);

    const nav = useNavigate();

    return (
        <div className={`${Style.wrapper}`}>
            <nav className={`${Style.wrapper__nav}`}>
                <ul className={`${Style.wrapper__nav__list}`}>
                    <li className={`${Style.wrapper__nav__list__li}`}>
                        <NavLink to="/profile/"
                                 className={({isActive}) => isActive ? Style.wrapper__nav__list__li__linkActive : Style.wrapper__nav__list__li__linkInactive}
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li className={`${Style.wrapper__nav__list__li}`}>
                        <NavLink to="/profile/orders/"
                                 className={({isActive}) => isActive ? Style.wrapper__nav__list__li__linkActive : Style.wrapper__nav__list__li__linkInactive}
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li className={`${Style.wrapper__nav__list__li}`}>
                        <button
                            className={`${Style.wrapper__nav__list__li__linkInactive} ${Style.wrapper__nav__list__li__button}`}
                            onClick={() => {
                                dispatch(logoutUser(refreshToken));
                                localStorage.removeItem("refreshToken");
                                nav("/");
                            }}
                        >
                            Выход
                        </button>
                    </li>
                    <div className={`pt-20`}></div>
                </ul>
                <span className={`${Style.wrapper__nav__info} text_type_main-default`}>
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            </nav>
            <div className={`${Style.wrapper__content}`}>
                <Outlet/>
            </div>
        </div>
    );
};

export default ProfileLayout;