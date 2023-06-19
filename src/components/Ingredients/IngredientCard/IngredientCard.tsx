import React, {FC, useState} from 'react';
import {IIngredient} from "../../../models/IIngredient";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import Style from "./IngredientCard.module.scss";
import {useDrag} from "react-dnd";
import {itemTypes} from "../../../dndItemTypes/itemTypes";
import IngredientDetails from "../../Modals/IngredientDetailsModal/IngredientDetails";

interface IProps {
    data: IIngredient,
}

const IngredientCard: FC<IProps> = ({data}) => {
    const [modalOpened, setModalOpened] = useState<boolean>(false);

    const [{isDragging}, drag] = useDrag(() => ({
        type: itemTypes.ingredientAdd,
        item: {data},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }))

    return (
        <>
            <div className={Style.Card}
                 style={{
                     background: isDragging ? 'var(--colors-interface-accent)' : 'none'
                 }}
                 onClick={(e) => {
                     e.stopPropagation();
                     setModalOpened(true);
                 }}
                 ref={drag}
            >
                <div className={`${Style.Card_imageWrapper} mb-1 pr-4 pl-4`}>
                    <img className={Style.Card_imageWrapper_img}
                         src={data.image}
                         alt={`${data.name} image`}
                    />
                </div>
                <div className={Style.Card_infoWrapper}>
                    <div className={`${Style.Card_infoWrapper_priceWrapper} mb-1`}>
                    <span className={`${Style.Card_infoWrapper_priceWrapper_price} text_type_digits-default mr-2`}>
                        {data.price}
                    </span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <h5 className={`${Style.Card_infoWrapper_name} text_type_main-default`}>
                        {data.name}
                    </h5>
                </div>
            </div>
            <IngredientDetails isOpened={modalOpened}
                               onModalClose={() => setModalOpened(false)}
                               data={data}
            />
        </>

    );
};

export default IngredientCard;