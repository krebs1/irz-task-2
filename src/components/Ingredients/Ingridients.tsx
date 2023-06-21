import React, {useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {fetchIngredients} from "../../store/actions/ActionCreator";
import Style from "./Ingridients.module.scss";
import IngredientCard from "./IngredientCard/IngredientCard";
import {useLocation, useNavigate} from "react-router-dom";
import {IIngredient} from "../../models/IIngredient";
import IngredientsByType from "./IngredientsByType/IngredientsByType";

const Ingredients = () => {
    const [tab, setTab] = useState<string>("bun");
    const dispatch = useAppDispatch();
    const {ingredients, error} = useAppSelector(state => state.ingredientReducer)

    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const [accentHeading, setAccentHeading] = useState<string>("bun");

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

    const nav = useNavigate();
    const location = useLocation();

    const [data, setData] = useState<{ title: string, ingredients: IIngredient[] }[] | null>(null);
    useEffect(() => {
        const ingredientsList: { title: string, ingredients: IIngredient[] }[] = [];

        ingredientsList.push({
            title: "Булки",
            ingredients: ingredients.filter((elem) => elem.type === "bun"),
        })
        ingredientsList.push({
            title: "Соусы",
            ingredients: ingredients.filter((elem) => elem.type === "sauce"),
        })
        ingredientsList.push({
            title: "Начинки",
            ingredients: ingredients.filter((elem) => elem.type === "main"),
        })

        setData(ingredientsList);
    }, [ingredients])

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
            <div className={`${Style.IngredientsWrapper_ingredientsList} custom-scroll`}>
                {
                    data &&
                    data?.map((elem) => {
                        let ref = null;
                        switch (elem.title){
                            case "Булки":
                                ref = bunRef;
                                break;
                            case "Соусы":
                                ref = sauceRef;
                                break;
                            case "Начинки":
                                ref = mainRef;
                                break;
                            default:
                                ref = null
                                break;
                        }

                        return (
                            <IngredientsByType title={elem.title}
                                               titleRef={ref ?? ref}
                                               ingredients={elem.ingredients}
                                               key={elem.title}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Ingredients;