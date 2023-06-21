import React, {useEffect, useState} from 'react';
import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Style from "./LoginPage.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {userSlice} from "../../store/reducers/UserSlice";
import {loginUser} from "../../store/actions/UserActions";

const LoginPage = () => {
    const nav = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const {error, success, isAuthorize} = useAppSelector(state => state.userReducer);
    const {resetError, resetSuccess} = userSlice.actions;

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordShow, setPasswordShow] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthorize) nav("/");
    }, [])

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(resetError());
        }
    }, [error])
    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());
            if (location.state !== null) {
                nav(location.state.from.pathname);
            } else nav("/");
        }
    }, [success])

    return (
        <div>
            <Form formTitle="Вход"
                  buttonText="Войти"
                  onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(loginUser({email: email, password: password}))
                  }}
                  canSubmit={true}
                  links={[
                      {name: "Вы — новый пользователь?", link: "Зарегистрироваться", path: "/register",},
                      {name: "Забыли пароль?", link: "Восстановить пароль", path: "/forgot-password",},
                  ]}
            >
                <Input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       placeholder="E-mail"
                />
                <div className={`pt-6`}></div>
                <Input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Пароль"
                       type={passwordShow ? "text" : "password"}
                       icon={passwordShow ? "HideIcon" : "ShowIcon"}
                       onIconClick={(e) => setPasswordShow((prevState) => !prevState)}
                />
            </Form>
        </div>
    );
};

export default LoginPage;