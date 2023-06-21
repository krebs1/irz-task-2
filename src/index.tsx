import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.scss";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css"
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css"
import {setupStore} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const store = setupStore();
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);