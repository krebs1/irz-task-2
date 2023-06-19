import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIngredientsByType, IIngredient} from "../../models/IIngredient";
import {fetchIngredients} from "./ActionCreator";

interface IIngredientState {
    ingredients: IIngredient[],
    isLoading: boolean,
    error: string,
}

const initialState: IIngredientState = {
    ingredients: [],
    isLoading: false,
    error: '',
}

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchIngredients.fulfilled.type]: (state, action: PayloadAction<IIngredient[]>) => {
            state.isLoading = false;
            state.error = '';
            state.ingredients = action.payload;
        },
        [fetchIngredients.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchIngredients.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
});

export default ingredientSlice.reducer;