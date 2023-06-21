import React, {FC} from 'react';
import Style from "./ModalContainer.module.scss";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import {useLocation} from "react-router-dom";

interface IProps {
    title?: string,
    children: React.ReactNode | string | number,
    isOpened: boolean,
    onModalClose: () => void,
}

const ModalContainer: FC<IProps> = ({title, children, isOpened = true, onModalClose}) => {
    const location = useLocation();
    console.log(location);

    return (
        <div className={`${Style.ModalContainer} ${isOpened ? Style.ModalContainer_opened : Style.ModalContainer_closed}`}
            onClick={(e) => {
                e.stopPropagation();
                onModalClose();
            }}
        >
            <div className={`${Style.ModalContainer_modal} p-10`}
                 onClick={(e) => e.stopPropagation()}
            >
                <div className={Style.ModalContainer_modal_header}>
                    <h2 className={`${Style.ModalContainer_modal_header_title} text_type_main-large`}>
                        {title}
                    </h2>
                    <button className={Style.ModalContainer_modal_header_closeBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                onModalClose();
                            }}
                    >
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                <div className={Style.ModalContainer_modal_contentWrapper}>
                    {
                        children
                    }
                </div>
            </div>
        </div>

    );
};

export default ModalContainer;