import React from 'react';
import Style from "./ConstructPage.module.scss";
import Ingredients from "../../components/Ingredients/Ingridients";
import Constructor from "../../components/Constructor/Constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import IngredientDetails from "../../components/Modals/IngredientDetailsModal/IngredientDetails";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {viewedIngredientSlice} from "../../store/reducers/ViewedIngredientSlice";
import {Outlet} from "react-router-dom";

const ConstructPage = () => {
    const {ingredient, isModalOpened} = useAppSelector(state => state.viewedIngredientReducer);
    const dispatch = useAppDispatch();
    const {toggleModal, setIngredient} = viewedIngredientSlice.actions;

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={Style.ConstructPage}>
                <Ingredients/>
                <Constructor/>
            </div>
            <Outlet/>
        </DndProvider>
    );
};

export default ConstructPage;