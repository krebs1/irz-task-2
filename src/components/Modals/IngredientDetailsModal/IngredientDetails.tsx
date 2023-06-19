import React, {FC, useState} from 'react';
import ModalContainer from "../ModalContainer";
import {IIngredient} from "../../../models/IIngredient";
import Style from "./IngredientDetails.module.scss";

interface IProps {
    isOpened: boolean,
    onModalClose: () => void,
    data: IIngredient,
}

const IngredientDetails: FC<IProps> = ({isOpened, onModalClose, data}) => {
    return (
        <ModalContainer title='Детали ингредиента'
                        isOpened={isOpened}
                        onModalClose={onModalClose}
        >
            <div className={`${Style.IngredientDetails}`}>
                <div className={`${Style.IngredientDetails_imgWrapper} mb-4 pl-5 pr-5`}>
                    <img className={`${Style.IngredientDetails_imgWrapper_img}`}
                         src={data.image}
                         alt={`${data.name} image`}
                    />
                </div>
                <h4 className={`${Style.IngredientDetails_name} mb-8 text_type_main-medium`}>
                    {data.name}
                </h4>
                <div className={`${Style.IngredientDetails_details} mb-5`}>
                    <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Калории, ккал
                        </span>
                        <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                            {data.calories}
                        </p>
                    </div>
                    <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Углеводы, г
                        </span>
                        <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                            {data.carbohydrates}
                        </p>
                    </div>
                    <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Жиры, г
                        </span>
                        <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                            {data.fat}
                        </p>
                    </div>
                    <div className={`${Style.IngredientDetails_details_detail}`}>
                        <span className={`${Style.IngredientDetails_details_detail_name} text_type_main-default`}>
                            Белки, г
                        </span>
                        <p className={`${Style.IngredientDetails_details_detail_value} text_type_main-default`}>
                            {data.proteins}
                        </p>
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
};

export default IngredientDetails;