import React from 'react';
import {useAppSelector} from "../hooks/reduxHooks";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import ProfileLayout from "../layouts/ProfileLayout/ProfileLayout";

const PrivateRouter = () => {
    const {isAuthorize} = useAppSelector(state => state.userReducer)
    const location = useLocation();

    return (
        isAuthorize ? <ProfileLayout/> : <Navigate to="/login" replace state={{from: location}}/>
    );
};

export default PrivateRouter;