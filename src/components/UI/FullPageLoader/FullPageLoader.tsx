import React from 'react';
import Style from "./FullPageLoader.module.scss";

const FullPageLoader = () => {
    return (
        <div className={Style.wrapper}>
            <div className={Style.wrapper_loader}></div>
        </div>
    );
};

export default FullPageLoader;