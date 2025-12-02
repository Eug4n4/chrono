import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                login: action.payload.login,
                avatar: action.payload.avatar,
                countryCode: action.payload.countryCode,
            };
        },
    },
});

export const { loginSuccess, logout, setLoading, updateUser } =
    authSlice.actions;
export default authSlice.reducer;
