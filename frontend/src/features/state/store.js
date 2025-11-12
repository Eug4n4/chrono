import { configureStore } from "@reduxjs/toolkit";
import countriesListReducer from "./countries.list.slice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        countriesList: countriesListReducer,
        auth: authReducer,
    },
});

export default store;
