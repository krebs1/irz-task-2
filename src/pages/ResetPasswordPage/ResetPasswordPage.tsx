import React, {useEffect, useState} from 'react';
import Style from "./ResetPasswordPage.module.scss";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/Form/Form";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {resetPassword} from "../../store/actions/UserActions";
import {userSlice} from "../../store/reducers/UserSlice";

const ResetPasswordPage = () => {
    const location = useLocation();
    const nav = useNavigate();

    const dispatch = useAppDispatch();
    const {error, isAuthorize} = useAppSelector(state => state.userReducer);
    const {resetError} = userSlice.actions;

    useEffect(() => {
        if (!location.state || isAuthorize) nav("/");
    }, [])
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(resetError());
        }
    }, [error])

    const [password, setPassword] = useState<string>('');
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    return (
        <div>
            <Form formTitle="Восстановление пароля"
                  buttonText="Сохранить"
                  onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(resetPassword({password: password, code: code}));
                      nav("/login");
                  }}
                  canSubmit={true}
                  links={[
                      {name: "Вспомнили пароль?", link: "Войти", path: "/login",},
                  ]}
            >
                <Input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Введите новый пароль"
                       type={passwordShow ? "text" : "password"}
                       icon={passwordShow ? "HideIcon" : "ShowIcon"}
                       onIconClick={(e) => setPasswordShow((prevState) => !prevState)}
                />
                <div className={`pt-6`}></div>
                <Input value={code}
                       onChange={(e) => setCode(e.target.value)}
                       type="text"
                       placeholder="Введите код из письма"
                />
            </Form>
        </div>
    );
};

export default ResetPasswordPage;