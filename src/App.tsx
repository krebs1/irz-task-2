import React, {useEffect} from 'react';
import AppRouter from "./router/AppRouter";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {userSlice} from "./store/reducers/UserSlice";
import {getToken, getUser} from "./store/actions/UserActions";
import FullPageLoader from "./components/UI/FullPageLoader/FullPageLoader";

const App = () => {
    const dispatch = useAppDispatch();
    const {isLoad, accessToken} = useAppSelector(state => state.userReducer);
    const {setIsLoad} = userSlice.actions;

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            dispatch(getToken(refreshToken));
        }else{
            dispatch(setIsLoad(true));
        }
    }, [])
    useEffect(() => {
        if (accessToken) dispatch(getUser(accessToken));
    }, [accessToken])

    return (
        isLoad ? <AppRouter/> : <FullPageLoader/>
    );
};

export default App;