import React, {FC} from 'react';
import ModalContainer from "../ModalContainer";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {IOrder} from "../../../models/IOrder";
import Style from "./OrderModal.module.scss";

interface IProps {
    isOpened: boolean,
    onModalClose: () => void,
    data: IOrder,
}

const OrderModal:FC<IProps> = ({isOpened, onModalClose, data}) => {
    return (
        <ModalContainer isOpened={isOpened}
                        onModalClose={onModalClose}
        >
            <div className={`${Style.OrderWrapper}`}>
                <div className={`${Style.OrderWrapper_numberWrapper} mb-15`}>
                    <h2 className={`${Style.OrderWrapper_numberWrapper_number} text_type_digits-large mb-8`}>{data.order.number}</h2>
                    <span className={`${Style.OrderWrapper_numberWrapper_hint} text_type_main-medium`}>идентификатор заказа</span>
                </div>
                <div className={`${Style.OrderWrapper_successIcon} mb-15`}>
                    <CheckMarkIcon type="primary" />
                </div>
                <div className={`${Style.OrderWrapper_hints}`}>
                    <div className={`${Style.OrderWrapper_hints_hint} text_type_main-default mb-2`}>Ваш заказ начали готовить</div>
                    <div className={`${Style.OrderWrapper_hints_hint} text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</div>
                </div>
            </div>
        </ModalContainer>
    );
};

export default OrderModal;