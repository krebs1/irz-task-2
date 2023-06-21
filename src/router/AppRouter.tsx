import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ConstructPage from "../pages/ConstructPage/ConstructPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import PrivateRouter from "./PrivateRouter";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import IngredientDetails from "../components/Modals/IngredientDetailsModal/IngredientDetails";
import IngredientDetailsPage from "../pages/IngredientDetailsPage/IngredientDetailsPage";

const AppRouter = () => {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div>
            <Routes location={background || location}>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<ConstructPage/>}/>
                    <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/profile/*" element={<PrivateRouter/>}>
                        <Route path="" element={<ProfilePage/>}/>
                        <Route path="orders" element={<p>orders</p>}/>
                        <Route path="orders/:id" element={<p>order by id</p>}/>
                    </Route>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path="ingredients/:id" element={<IngredientDetails/>}/>
                </Routes>
            )}
        </div>
    );
};

export default AppRouter;