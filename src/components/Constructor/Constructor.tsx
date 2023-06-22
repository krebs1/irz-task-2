import React, {useEffect, useState} from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import Style from "./Constructor.module.scss";
import {useDrop} from "react-dnd";
import {IIngredient} from "../../models/IIngredient";
import {itemTypes} from "../../dndItemTypes/itemTypes";
import {constructorSlice} from "../../store/reducers/ConstructorSlice";
import MainIngredient from "./MainIngredient/MainIngredient";
import IngredientDetails from "../Modals/IngredientDetailsModal/IngredientDetails";
import {orderSlice} from "../../store/reducers/OrderSlice";
import {createOrder} from "../../store/actions/ActionCreator";
import OrderModal from "../Modals/OrderModal/OrderModal";
import {viewedIngredientSlice} from "../../store/reducers/ViewedIngredientSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

interface IDragItem {
    data: IIngredient
}

const Constructor = () => {
    const dispatch = useAppDispatch();

    const {ingredients, availableIngredients, totalPrice} = useAppSelector(state => state.constructorReducer)
    const {addIngredient, clearConstructor} = constructorSlice.actions;
    const {lastOrder} = useAppSelector(state => state.orderReducer);
    const {resetLastOrder} = orderSlice.actions;
    const [orderModalOpened, setOrderModalOpened] = useState<boolean>(false);
    const {isAuthorize} = useAppSelector(state => state.userReducer);

    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (lastOrder) {
            setOrderModalOpened(true);
        }
    }, [lastOrder])

    const [{isOver, canDrop}, drop] = useDrop(
        () => ({
            accept: itemTypes.ingredientAdd,
            drop: (item: IDragItem) => {
                dispatch(addIngredient(item.data));
            },
            canDrop: (item: IDragItem) => {
                if (availableIngredients === "all") return true;
                return availableIngredients === item.data.type;
            },
            hover: (item: IDragItem) => {

            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            })
        }),
        [availableIngredients, ingredients]
    )

    return (
        <div className={`${Style.Constructor} pt-25 pl-4`}>
            <div className={`${Style.Constructor_ingredientsWrapper}`}
                 style={{
                     outline: ingredients.length > 0 ? 'none' : '1px dashed var(--colors-interface-accent)',
                 }}
                 ref={drop}
            >
                {
                    ingredients.length > 0 &&
                    <div className={Style.Constructor_ingredientsWrapper_ingredients}>
                        <div className='pl-8 pr-6'
                             style={{
                                 cursor: "pointer",
                             }}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 nav(`ingredients/${ingredients[0]._id}`, {
                                     replace: true,
                                     state: {background: location}
                                 });
                             }}
                        >
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${ingredients[0].name} (верх)`}
                                price={ingredients[0].price}
                                thumbnail={ingredients[0].image}
                                extraClass='pl-8'
                            />
                        </div>


                        <div
                            className={`${Style.Constructor_ingredientsWrapper_ingredients_main} pr-2  pt-3 pb-3 custom-scroll`}>
                            <TransitionGroup component={null}>
                                {
                                    ingredients.map((elem, index) => {
                                        if (index !== 0 && index !== ingredients.length - 1) {
                                            return (
                                                <CSSTransition timeout={100}
                                                               classNames="item"
                                                               key={elem.key}
                                                >
                                                    <MainIngredient data={elem}
                                                                    index={index}
                                                    />
                                                </CSSTransition>
                                            );
                                        }
                                    })
                                }
                            </TransitionGroup>
                        </div>

                        <div className='pl-8 pr-6'
                             style={{
                                 cursor: "pointer",
                             }}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 nav(`ingredients/${ingredients[ingredients.length - 1]._id}`, {
                                     replace: true,
                                     state: {background: location}
                                 });
                             }}
                        >
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${ingredients[ingredients.length - 1].name} (низ)`}
                                price={ingredients[ingredients.length - 1].price}
                                thumbnail={ingredients[ingredients.length - 1].image}
                                extraClass='pl-8'
                            />
                        </div>
                    </div>
                }
            </div>
            <div className={`pb-10`}></div>
            <div className={`${Style.Constructor_info}`}>
                <div className={`${Style.Constructor_info_priceWrapper} mr-10`}>
                    <span className={`${Style.Constructor_info_priceWrapper_price} text_type_main-large mr-2`}>
                        {totalPrice}
                    </span>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <Button htmlType={"button"}
                        type={"primary"}
                        size={"large"}
                        disabled={ingredients.length === 0}
                        onClick={() => {
                            if (isAuthorize) {
                                const ids = ingredients.map((elem) => elem._id);
                                dispatch(createOrder(ids));
                                dispatch(clearConstructor());
                            } else {
                                nav("/login", {replace: true, state: {from: location}});
                            }
                        }}
                >
                    Оформить заказ
                </Button>
                {
                    lastOrder &&
                    <OrderModal isOpened={orderModalOpened}
                                onModalClose={() => {
                                    setOrderModalOpened(false);
                                    dispatch(resetLastOrder());
                                }}
                                data={lastOrder}
                    />
                }
            </div>
        </div>
    );
};

export default Constructor;