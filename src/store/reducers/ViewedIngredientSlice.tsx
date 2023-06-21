import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIngredient} from "../../models/IIngredient";
import {fetchIngredients} from "../actions/ActionCreator";

interface IViewedIngredientState {
    ingredient: IIngredient | null,
    isModalOpened: boolean,
}

const initialState: IViewedIngredientState = {
    ingredient: null,
    isModalOpened: false,
}

export const viewedIngredientSlice = createSlice({
    name: 'viewedIngredient',
    initialState,
    reducers: {
        setIngredient: (state, action: PayloadAction<IIngredient>)=>{
            state.ingredient = action.payload;
        },
        resetIngredient: (state)=>{
            state.ingredient = initialState.ingredient;
        },
        toggleModal: (state)=>{
            state.isModalOpened = !state.isModalOpened;
        }
    },
    extraReducers: {},
});

export default viewedIngredientSlice.reducer;