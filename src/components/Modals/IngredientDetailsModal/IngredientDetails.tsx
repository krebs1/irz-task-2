import React, {FC, useEffect, useState} from 'react';
import ModalContainer from "../ModalContainer";
import {IIngredient} from "../../../models/IIngredient";
import Style from "./IngredientDetails.module.scss";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/reduxHooks";
import FullPageLoader from "../../UI/FullPageLoader/FullPageLoader";

interface IProps {
    isOpened?: boolean,
    onModalClose?: () => void,
    //data: IIngredient,
}

const IngredientDetails: FC<IProps> = ({
                                           isOpened = true, onModalClose = () => {
    }
                                       }) => {
    const {id} = useParams();
    const nav = useNavigate();
    const location = useLocation();

    console.log(location);

    const {ingredients} = useAppSelector(state => state.ingredientReducer)

    const [data, setData] = useState<IIngredient | null>(null);

    useEffect(() => {
        setData(ingredients.find((elem) => elem._id === id)!);
    }, [ingredients])

    return (
        data ?
            <ModalContainer title='Детали ингредиента'
                            isOpened={isOpened}
                            onModalClose={() => {
                                nav("/");
                            }}
            >
                <div className={`${Style.IngredientDetails}`}>
                    <div className={`${Style.IngredientDetails_imgWrapper} mb-4 pl-5 pr-5`}>
                        <img className={`${Style.IngredientDetails_imgWrapper_img}`}
                             src={data!.image}
                             alt={`${data!.name} image`}
                        />
                    </div>
                    <h4 className={`${Style.IngredientDetails_name} mb-8 text_type_main-medium`}>
                        {data!.name}
                    </h4>
                    <div className={`${Style.IngredientDetails_details} mb-5`}>
                        <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Калории, ккал
                        </span>
                            <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                                {data!.calories}
                            </p>
                        </div>
                        <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Углеводы, г
                        </span>
                            <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                                {data!.carbohydrates}
                            </p>
                        </div>
                        <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Жиры, г
                        </span>
                            <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                                {data!.fat}
                            </p>
                        </div>
                        <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Белки, г
                        </span>
                            <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                                {data!.proteins}
                            </p>
                        </div>
                    </div>
                </div>
            </ModalContainer>
            :
            <FullPageLoader/>
    )
};

export default IngredientDetails;