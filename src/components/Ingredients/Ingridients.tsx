import React, {useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {fetchIngredients} from "../../store/reducers/ActionCreator";
import Style from "./Ingridients.module.scss";
import IngredientCard from "./IngredientCard/IngredientCard";
import {DndProvider} from "react-dnd";
import IngredientDetails from "../Modals/IngredientDetailsModal/IngredientDetails";

const Ingredients = () => {
    const [tab, setTab] = useState<string>("bun");
    const dispatch = useAppDispatch();
    const {ingredients, error} = useAppSelector(state => state.ingredientReducer)

    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [])
    useEffect(() => {
        switch (tab) {
            case 'bun':
                if (bunRef.current !== null) {
                    bunRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }
                break;
            case 'sauce':
                if (sauceRef.current !== null) {
                    sauceRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }
                break;
            case 'main':
                if (mainRef.current !== null) {
                    mainRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }
                break;
        }
    }, [tab])

    return (
        <div className={Style.IngredientsWrapper}>
            <div className={`${Style.IngredientsWrapper_titleWrapper} mt-10 mb-5`}>
                <h2 className={`text_type_main-large`}>
                    Соберите бургер
                </h2>
            </div>
            <div className={`${Style.IngredientsWrapper_tabs} mb-10`}>
                <Tab value="bun" active={tab === "bun"} onClick={setTab}>Булки</Tab>
                <Tab value="sauce" active={tab === "sauce"} onClick={setTab}>Соусы</Tab>
                <Tab value="main" active={tab === "main"} onClick={setTab}>Начинки</Tab>
            </div>
            {
                ingredients &&
                <div className={`${Style.IngredientsWrapper_ingredientsList} custom-scroll`}>
                    <div className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType}`}>
                        <h3 className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType_typeName} text_type_main-medium mb-6`}
                            ref={bunRef}
                        >
                            Булки
                        </h3>
                        <div className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType_list} mr-4 ml-4`}>
                            {
                                [...ingredients].map((elem) => {
                                    if (elem.type === 'bun') {
                                        return (
                                            <IngredientCard data={elem}
                                                            key={elem._id}
                                            />
                                        );
                                    }
                                })
                            }
                            <div className={`pt-8`}></div>
                        </div>
                    </div>
                    <div className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType}`}>
                        <h3 className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType_typeName} text_type_main-medium mb-6`}
                            ref={sauceRef}
                        >
                            Соусы
                        </h3>
                        <div className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType_list} mr-4 ml-4`}>
                            {
                                [...ingredients].map((elem) => {
                                    if (elem.type === 'sauce') {
                                        return (
                                            <IngredientCard data={elem}
                                                            key={elem._id}
                                            />
                                        );
                                    }
                                })
                            }
                            <div className={`pt-8`}></div>
                        </div>
                    </div>
                    <div className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType}`}>
                        <h3 className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType_typeName} text_type_main-medium mb-6`}
                            ref={mainRef}
                        >
                            Начинки
                        </h3>
                        <div className={`${Style.IngredientsWrapper_ingredientsList_ingredientsByType_list} mr-4 ml-4`}>
                            {
                                [...ingredients].map((elem) => {
                                    if (elem.type === 'main') {
                                        return (
                                            <IngredientCard data={elem}
                                                            key={elem._id}
                                            />
                                        );
                                    }
                                })
                            }
                            <div className={`pt-8`}></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Ingredients;