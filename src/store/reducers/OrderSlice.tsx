import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createOrder} from "../actions/ActionCreator";
import {IOrder} from "../../models/IOrder";
import {IIngredient} from "../../models/IIngredient";

interface IOrderState {
    lastOrder: IOrder | null,
    orders: IOrder[],
    isLoading: boolean,
    error: string,
}

const initialState: IOrderState = {
    lastOrder: null,
    orders: [],
    isLoading: false,
    error: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetLastOrder: (state)=>{
            state.lastOrder = null;
        }
    },
    extraReducers: {
        [createOrder.fulfilled.type]:(state, action: PayloadAction<IOrder>)=>{
            state.isLoading = false;
            state.error = '';
            state.orders.push(action.payload);
            state.lastOrder = action.payload;
        },
        [createOrder.pending.type]:(state)=>{
            state.isLoading = true;
        },
        [createOrder.rejected.type]:(state, action: PayloadAction<string>)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default orderSlice.reducer;