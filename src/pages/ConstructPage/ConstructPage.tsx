import React from 'react';
import Style from "./ConstructPage.module.scss";
import Ingredients from "../../components/Ingredients/Ingridients";
import Constructor from "../../components/Constructor/Constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import IngredientDetails from "../../components/Modals/IngredientDetailsModal/IngredientDetails";

const ConstructPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={Style.ConstructPage}>
                <Ingredients/>
                <Constructor/>
            </div>
        </DndProvider>
    );
};

export default ConstructPage;