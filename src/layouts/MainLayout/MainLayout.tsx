import React from 'react';
import Header from "../../components/Header/Header";
import Style from "../../App.module.scss";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className={`container`}>
            <Header/>
            <main className={`${Style.App_main} pl-5 pr-5 pb-5`}>
                <Outlet/>
            </main>
        </div>
    );
};

export default MainLayout;