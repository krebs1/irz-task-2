import React, {FC} from 'react';
import {IIngredient} from "../../../models/IIngredient";
import IngredientCard from "../IngredientCard/IngredientCard";
import Style from "./IngridientsByType.module.scss";

interface IProps {
    title: string,
    titleRef: React.Ref<HTMLHeadingElement>,
    ingredients: IIngredient[],
}

const IngredientsByType: FC<IProps> = ({title, ingredients, titleRef,}) => {
    return (
        <>
            <h3 className={`${Style.title} text_type_main-medium`}
                ref={titleRef}
            >
                {title}
            </h3>
            <div className="pt-6"></div>
            <div className={Style.list}>
                {
                    ingredients.map((elem) => {
                        return (
                            <IngredientCard data={elem}
                                            key={elem._id}
                            />
                        )
                    })
                }
            </div>
            <div className="pt-8"></div>
        </>
    );
};

export default IngredientsByType;