import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ingredientReducer from "./reducers/IngredientsSlice";
import constructorReducer from "./reducers/ConstructorSlice";
import orderReducer from "./reducers/OrderSlice";
import viewedIngredientReducer from "./reducers/ViewedIngredientSlice";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
    ingredientReducer,
    constructorReducer,
    orderReducer,
    viewedIngredientReducer,
    userReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];