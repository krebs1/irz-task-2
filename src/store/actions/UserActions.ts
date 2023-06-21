import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

interface IUserRegData {
    email: string,
    password: string,
    name: string,
}

interface IUserLoginData {
    email: string,
    password: string,
}

interface IResetPasswordData {
    password: string,
    code: string,
}

interface IUpdateUser {
    token: string,
    email: string,
    name: string,
}

export const registerUser = createAsyncThunk(
    'users/register',
    async (data: IUserRegData, thunkAPI) => {
        try {
            const response = await axios.post("https://norma.nomoreparties.space/api/auth/register", {
                email: data.email,
                password: data.password,
                name: data.name,
            });
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (data: IUserLoginData, thunkAPI) => {
        try {
            const response = await axios.post("https://norma.nomoreparties.space/api/auth/login", {
                email: data.email,
                password: data.password,
            });
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (token: string, thunkAPI) => {
        try {
            const response = await axios.post("https://norma.nomoreparties.space/api/auth/logout", {token: token});
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)

export const getUser = createAsyncThunk(
    'user/get',
    async (token: string, thunkAPI) => {
        try {
            const response = await axios.get("https://norma.nomoreparties.space/api/auth/user", {
                headers: {
                    authorization: token
                }
            });
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (data: IUpdateUser, thunkAPI) => {
        const headers = {
            authorization: data.token,
        }
        const user = {
            email: data.email,
            name: data.name,
        }

        try {
            const response = await axios.patch("https://norma.nomoreparties.space/api/auth/user", user, {headers});
            console.log(response);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)

export const getToken = createAsyncThunk(
    'user/token',
    async (refreshToken: string, thunkAPI) => {
        try {
            const response = await axios.post("https://norma.nomoreparties.space/api/auth/token", {
                token: refreshToken
            });
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)

export const sendResetPasswordCode = createAsyncThunk(
    'user/resetCode',
    async (email: string, thunkAPI) => {
        try {
            const response = await axios.post("https://norma.nomoreparties.space/api/password-reset", {
                email: email
            });
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (data: IResetPasswordData, thunkAPI) => {
        try {
            const response = await axios.post("https://norma.nomoreparties.space/api/password-reset/reset", {
                password: data.password,
                token: data.code,

            });
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError && err.response) return thunkAPI.rejectWithValue(err.response.data.message);
            else return thunkAPI.rejectWithValue("Unknown error");
        }
    }
)