import React, {FC, useEffect, useState} from 'react';
import {IIngredient} from "../../../models/IIngredient";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import Style from "./IngredientCard.module.scss";
import {useDrag, DragPreviewImage} from "react-dnd";
import {itemTypes} from "../../../dndItemTypes/itemTypes";
import IngredientDetails from "../../Modals/IngredientDetailsModal/IngredientDetails";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {viewedIngredientSlice} from "../../../store/reducers/ViewedIngredientSlice";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from "react-router-dom";

interface IProps {
    data: IIngredient,
}

const IngredientCard: FC<IProps> = ({data}) => {
    const dispatch = useAppDispatch();
    const {toggleModal, setIngredient} = viewedIngredientSlice.actions;

    const {ingredients} = useAppSelector(state => state.constructorReducer);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setCount(ingredients.filter((elem) => elem._id === data._id).length);
    }, [ingredients]);

    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        type: itemTypes.ingredientAdd,
        item: {data},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }))

    const nav = useNavigate();
    const location = useLocation();

    return (
        <div className={Style.Card}
             style={{
                 background: isDragging ? 'var(--colors-interface-accent)' : 'none'
             }}
             onClick={(e) => {
                 e.stopPropagation();
                 nav(`ingredients/${data._id}`, {replace: true, state:{background: location}});
             }}
             ref={drag}
        >
            {
                Boolean(count) &&
                <Counter count={count} size="default" extraClass="m-1"/>
            }
            <DragPreviewImage connect={dragPreview} src={data.image}/>
            <div className={`${Style.Card_imageWrapper} mb-1 pr-4 pl-4`}>
                <img className={Style.Card_imageWrapper_img}
                     src={data.image}
                     alt={`${data.name} image`}
                />
            </div>
            <div className={Style.Card_infoWrapper}>
                <div className={`${Style.Card_infoWrapper_priceWrapper} mb-1`}>
                            <span
                                className={`${Style.Card_infoWrapper_priceWrapper_price} text_type_digits-default mr-2`}>
                                {data.price}
                            </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <h5 className={`${Style.Card_infoWrapper_name} text_type_main-default`}>
                    {data.name}
                </h5>
            </div>
        </div>
    );
};

export default IngredientCard;