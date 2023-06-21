import React, {useEffect, useState} from 'react';
import Style from "./ForgotPasswordPage.module.scss";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/Form/Form";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {userSlice} from "../../store/reducers/UserSlice";
import {sendResetPasswordCode} from "../../store/actions/UserActions";

const ForgotPasswordPage = () => {
    const nav = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const {isAuthorize} = useAppSelector(state => state.userReducer);

    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        if (isAuthorize) nav("/");
    }, [])

    return (
        <div>
            <Form formTitle="Восстановление пароля"
                  buttonText="Восстановить"
                  onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(sendResetPasswordCode(email));
                      nav("/reset-password", {replace: true, state:{from: location}})
                  }}
                  canSubmit={true}
                  links={[
                      {name: "Вспомнили пароль?", link: "Войти", path: "/login",},
                  ]}
            >
                <Input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       placeholder="E-mail"
                />
                <div className={`pt-6`}></div>
            </Form>
        </div>
    );
};

export default ForgotPasswordPage;