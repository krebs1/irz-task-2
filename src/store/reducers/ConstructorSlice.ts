import {IConstructor} from "../../models/IConstructor";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIngredient} from "../../models/IIngredient";

interface IConstructorState extends IConstructor {

}

const initialState: IConstructorState = {
    ingredients: [],
    availableIngredients: "bun",
    totalPrice: 0,
}

const generateId = (id: string)=>{
    return Date.now().toString() + id;
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        clearConstructor: (state)=>{
            state.totalPrice = initialState.totalPrice;
            state.ingredients = initialState.ingredients;
            state.availableIngredients = initialState.availableIngredients;
        },
        deleteIngredient: (state, action: PayloadAction<number>) => {
            state.totalPrice -= state.ingredients[action.payload].price;
            state.ingredients.splice(action.payload, 1);
        },
        addIngredient: (state, action: PayloadAction<IIngredient>) => {
            if (action.payload.type === "bun") {
                if (state.ingredients.length === 0) {
                    state.ingredients.push({...action.payload, key: generateId(action.payload._id)});
                    state.ingredients.push({...action.payload, key: generateId(action.payload._id)});
                    state.totalPrice += action.payload.price * 2;
                } else {
                    state.totalPrice -= state.ingredients[0].price * 2;
                    state.totalPrice += action.payload.price * 2;
                    state.ingredients[0] = {...action.payload, key: generateId(action.payload._id)};
                    state.ingredients[state.ingredients.length - 1] = {...action.payload, key: generateId(action.payload._id)};
                }
                state.availableIngredients = "all";
            } else {
                state.totalPrice += action.payload.price;
                state.ingredients.splice(state.ingredients.length - 1, 0, {...action.payload, key: generateId(action.payload._id)});
                state.availableIngredients = "all";
            }
        },
        moveIngredient: (state, action: PayloadAction<{ hoverIndex: number, dragIndex: number }>) => {
            const buf = state.ingredients[action.payload.hoverIndex];
            state.ingredients[action.payload.hoverIndex] = state.ingredients[action.payload.dragIndex];
            state.ingredients[action.payload.dragIndex] = buf;
        },
    },
    extraReducers: {},
})

export default constructorSlice.reducer