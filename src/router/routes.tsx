import ConstructPage from "../pages/ConstructPage/ConstructPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";

export const routes = [
    {
        layout: <MainLayout/>,
        routes: [
            {
                path: '/',
                element: <ConstructPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/forgot-password',
                element: <ForgotPasswordPage/>
            },
            {
                path: '/reset-password',
                element: <ResetPasswordPage/>
            },
        ]
    },
]