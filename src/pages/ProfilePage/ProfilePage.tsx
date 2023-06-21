import React, {useEffect, useRef, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {updateUser} from "../../store/actions/UserActions";

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const {user, accessToken} = useAppSelector(state => state.userReducer);

    const [name, setName] = useState<string>("");
    const [nameDisabled, setNameDisabled] = useState<boolean>(true);
    const nameRef = useRef<HTMLInputElement>(null);

    const [login, setLogin] = useState<string>("");
    const [loginDisabled, setLoginDisabled] = useState<boolean>(true);
    const loginRef = useRef<HTMLInputElement>(null);

    const [wasEdited, setWasEdited] = useState<boolean>(false);


    useEffect(() => {
        if (user) {
            setName(user.name);
            setLogin(user.email)
        }
    }, [user])

    useEffect(() => {
        if (name === user?.name && login === user?.email) setWasEdited(false);
        else setWasEdited(true);
    }, [name, login])

    useEffect(() => {
        if (nameRef.current) nameRef.current.focus();
    }, [nameDisabled])
    useEffect(() => {
        if (loginRef.current) loginRef.current.focus();
    }, [loginDisabled])

    return (
        <div>
            <Input value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="Имя"
                   type="text"
                   icon="EditIcon"
                   onIconClick={() => setNameDisabled(false)}
                   onBlur={() => setNameDisabled(true)}
                   disabled={nameDisabled}
                   ref={nameRef}
            />
            <div className={`pt-6`}></div>
            <Input value={login}
                   onChange={(e) => setLogin(e.target.value)}
                   placeholder="Логин"
                   type="email"
                   icon="EditIcon"
                   onIconClick={() => setLoginDisabled(false)}
                   onBlur={() => setLoginDisabled(true)}
                   disabled={loginDisabled}
                   ref={loginRef}
            />
            <div className={`pt-6`}></div>
            <Input value={"123456"}
                   onChange={(e) => {
                   }}
                   placeholder="Пароль"
                   type="password"
                   icon="EditIcon"
                   disabled={true}
            />
            {
                wasEdited &&
                <>
                    <div className={`pt-6`}></div>
                    <Button htmlType="button"
                            type="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(updateUser({token: accessToken, name: name, email: login}));
                            }}
                    >
                        Сохранить
                    </Button>
                </>
            }
        </div>
    );
};

export default ProfilePage;

/*
<Input value={nameFocus ? name : (user ? user.name : "")}
                   onChange={(e) => setName(e.target.value)}
                   onFocus={() => setNameFocus(true)}
                   onBlur={() => setNameFocus(false)}
                   placeholder="Имя"
                   type="text"
                   icon="EditIcon"
            />
            <div className={`pt-6`}></div>
            <Input value={loginFocus ? login : (user ? user.email : "")}
                   onChange={(e) => setLogin(e.target.value)}
                   onFocus={() => setLoginFocus(true)}
                   onBlur={() => setLoginFocus(false)}
                   placeholder="Логин"
                   type="text"
                   icon="EditIcon"
            />
 */