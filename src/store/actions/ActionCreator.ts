import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IIngredient} from "../../models/IIngredient";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://norma.nomoreparties.space/api/ingredients");
            return response.data.data;
        } catch (err) {
            if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (ingredients: string[], thunkAPI) => {
        try {
            const response = await axios.post('https://norma.nomoreparties.space/api/orders', {
                ingredients: ingredients,
            });
            return response.data;
        } catch (err) {
            if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)