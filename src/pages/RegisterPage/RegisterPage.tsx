import React, {useEffect, useState} from 'react';
import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./RegisterPage.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {registerUser} from "../../store/actions/UserActions";
import {userSlice} from "../../store/reducers/UserSlice";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const nav = useNavigate();

    const dispatch = useAppDispatch();
    const {error, success, isAuthorize} = useAppSelector(state => state.userReducer);
    const {resetError, resetSuccess} = userSlice.actions;

    const [name, setName] = useState<string>('');
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
            nav("/login");
        }
    }, [success])

    return (
        <div>
            <Form formTitle="Регистрация"
                  buttonText="Зарегистрироваться"
                  onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(registerUser({email: email, password: password, name: name}));
                  }}
                  canSubmit={true}
                  links={[{name: "Уже зарегистрированы?", link: "Войти", path: "/login",}]}
            >
                <Input value={name}
                       onChange={(e) => setName(e.target.value)}
                       type="text"
                       placeholder="Имя"
                       required={true}
                />
                <div className={`pt-6`}></div>
                <Input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       placeholder="E-mail"
                       required={true}
                />
                <div className={`pt-6`}></div>
                <Input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Пароль"
                       type={passwordShow ? "text" : "password"}
                       icon={passwordShow ? "HideIcon" : "ShowIcon"}
                       onIconClick={(e) => setPasswordShow((prevState) => !prevState)}
                       required={true}
                />
            </Form>
        </div>
    );
};

export default RegisterPage;