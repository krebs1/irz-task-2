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
import {createOrder} from "../../store/reducers/ActionCreator";
import OrderModal from "../Modals/OrderModal/OrderModal";

interface IDragItem {
    data: IIngredient
}

const Constructor = () => {
    const dispatch = useAppDispatch();

    const {ingredients, availableIngredients, totalPrice} = useAppSelector(state => state.constructorReducer)
    const {addIngredient, clearConstructor} = constructorSlice.actions;

    const {orders} = useAppSelector(state => state.orderReducer)

    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [orderModalOpened, setOrderModalOpened] = useState<boolean>(false);

    useEffect(() => {
        console.log(2)
        if (orders.length !== 0) {
            setOrderModalOpened(true);
        }
    }, [orders])

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
                        <div className='pl-8 pr-6 pb-3'
                             style={{
                                 cursor: "pointer",
                             }}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 setModalOpened(true);
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

                        <div className={`${Style.Constructor_ingredientsWrapper_ingredients_main} pr-2 custom-scroll`}>
                            {
                                ingredients.map((elem, index) => {
                                    if (index !== 0 && index !== ingredients.length - 1) {
                                        return (
                                            <MainIngredient data={elem}
                                                            index={index}
                                                            key={`${elem._id} ${index}`}
                                            />
                                        );
                                    }
                                })
                            }
                        </div>
                        <div className='pl-8 pr-6 pt-3'
                             style={{
                                 cursor: "pointer",
                             }}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 setModalOpened(true);
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
                        <IngredientDetails isOpened={modalOpened}
                                           onModalClose={() => setModalOpened(false)}
                                           data={ingredients[0]}
                        />
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
                            const ids = ingredients.map((elem) => elem._id);
                            dispatch(createOrder(ids));
                            dispatch(clearConstructor());
                        }}
                >
                    Оформить заказ
                </Button>
                {
                    orders.length !== 0 &&
                    <OrderModal isOpened={orderModalOpened}
                                onModalClose={() => {
                                    console.log(1)
                                    setOrderModalOpened(false)
                                }}
                                data={orders[orders.length - 1]}
                    />
                }
            </div>
        </div>
    );
};

export default Constructor;