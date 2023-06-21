import React, {useEffect, useState} from 'react';
import {IIngredient} from "../../models/IIngredient";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {fetchIngredients} from "../../store/actions/ActionCreator";
import Style from "./IngredientDetailsPage.module.scss";

const IngredientDetailsPage = () => {
    const [data, setData] = useState<IIngredient | null>(null);
    const dispatch = useAppDispatch();
    const {ingredients} = useAppSelector(state => state.ingredientReducer);
    const {id} = useParams();
    useEffect(() => {
        if (ingredients.length === 0) dispatch(fetchIngredients());
    }, [])
    useEffect(() => {
        setData(ingredients.find((elem) => elem._id === id)!)
    }, [id, ingredients])

    return (
        <div className={Style.wrapper}>
            {
                data &&
                <div className={Style.wrapper_card}>
                    <h2 className={`text_type_main-large`}>Детали ингридиента</h2>
                    <div className="pt-4"></div>
                    <div className={`${Style.wrapper_card_imgWrapper}`}>
                        <img className={`${Style.wrapper_card_imgWrapper_img}`}
                             src={data!.image}
                             alt={`${data!.name} image`}
                        />
                    </div>
                    <div className="pt-4"></div>
                    <h4 className={`${Style.IngredientDetails_name} text_type_main-medium`}>
                        {data!.name}
                    </h4>
                    <div className="pt-8"></div>
                    <div className={`${Style.wrapper_card_details}`}>
                        <div className={`${Style.wrapper_card_details_detail}`}>
                            <span className={`text_type_main-default`}>
                            Калории, ккал
                        </span>
                            <div className="pt-2"></div>
                            <p className={`text_type_digits-default`}>
                                {data!.calories}
                            </p>
                        </div>
                        <div className={`${Style.wrapper_card_details_detail}`}>
                            <span className={`text_type_main-default`}>
                            Белки, г
                        </span>
                            <div className="pt-2"></div>
                            <p className={`text_type_digits-default`}>
                                {data!.proteins}
                            </p>
                        </div>
                        <div className={`${Style.wrapper_card_details_detail}`}>
                            <span className={`text_type_main-default`}>
                            Жиры, г
                        </span>
                            <div className="pt-2"></div>
                            <p className={`text_type_digits-default`}>
                                {data!.fat}
                            </p>
                        </div>
                        <div className={`${Style.wrapper_card_details_detail}`}>
                            <span className={`text_type_main-default`}>
                            Углеводы, г
                        </span>
                            <div className="pt-2"></div>
                            <p className={`text_type_digits-default`}>
                                {data!.carbohydrates}
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default IngredientDetailsPage;