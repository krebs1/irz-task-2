import React from 'react';
import Header from "./components/Header/Header";
import ConstructPage from "./pages/ConstructPage/ConstructPage";
import Style from "./App.module.scss";

function App() {
    return (
        <div className={`${Style.App} container App`}>
            <Header/>
            <main className={`${Style.App_main} pl-5 pr-5 pb-5`}>
                <ConstructPage/>
            </main>
        </div>
    );
}

export default App;
