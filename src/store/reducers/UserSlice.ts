import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    getUser,
    loginUser,
    registerUser,
    getToken,
    logoutUser,
    sendResetPasswordCode,
    resetPassword, updateUser
} from "../actions/UserActions";

const getRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken ? refreshToken : "";
}

interface IRegFFPayload {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string,
    },
}

interface ILoginFFPayload {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string,
    },
}

interface IGetTokenFFPayload {
    success: boolean,
    accessToken: string,
    refreshToken: string,
}

interface IGetFFPayload {
    success: boolean,
    user: {
        email: string,
        name: string,
    },
}
interface IUpdateFFPayload {
    success: boolean,
    user: {
        email: string,
        name: string,
    },
}

interface IUserState {
    isLoad: boolean,
    isAuthorize: boolean,
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string,
    } | null,
    error: string,
}

const initialState: IUserState = {
    isLoad: false,
    isAuthorize: false,
    success: false,
    accessToken: "",
    refreshToken: getRefreshToken(),
    user: null,
    error: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = "";
        },
        resetSuccess: (state) => {
            state.success = false;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        setIsLoad: (state, action: PayloadAction<boolean>) => {
            state.isLoad = action.payload;
        },
    },
    extraReducers: {
        //Registration
        [registerUser.fulfilled.type]: (state, action: PayloadAction<IRegFFPayload>) => {
            state.error = "";
            state.success = true;
        },
        [registerUser.pending.type]: (state) => {
            state.error = "";
        },
        [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        //Login
        [loginUser.fulfilled.type]: (state, action: PayloadAction<ILoginFFPayload>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.error = "";
            state.success = true;
            state.isAuthorize = true;

            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        [loginUser.pending.type]: (state) => {
            state.error = "";
        },
        [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        //LogoutUser
        [logoutUser.fulfilled.type]: (state) => {
            state.isAuthorize = false;
            state.accessToken = "";
            state.refreshToken = "";
            state.user = null;
        },
        [logoutUser.pending.type]: (state) => {
            state.error = "";
        },
        [logoutUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        //GetUser
        [getUser.fulfilled.type]: (state, action: PayloadAction<IGetFFPayload>) => {
            state.user = action.payload.user;
            state.error = "";
        },
        [getUser.pending.type]: (state) => {
            state.error = "";
        },
        [getUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },

        //UpdateUser
        [updateUser.fulfilled.type]: (state, action: PayloadAction<IUpdateFFPayload>) => {
            console.log(action.payload)
            state.user = action.payload.user;
            state.error = "";
        },
        [updateUser.pending.type]: (state) => {
            state.error = "";
        },
        [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },

        //GetToken
        [getToken.fulfilled.type]: (state, action: PayloadAction<IGetTokenFFPayload>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = "";
            state.isAuthorize = true;
            state.isLoad = true;

            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        [getToken.pending.type]: (state) => {
            state.error = "";
        },
        [getToken.rejected.type]: (state) => {
            state.isLoad = true;
        },

        //Reset password
        [resetPassword.fulfilled.type]: (state) => {
            state.error = "";
        },
        [resetPassword.pending.type]: (state) => {
            state.error = "";
        },
        [resetPassword.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
})

export default userSlice.reducer;