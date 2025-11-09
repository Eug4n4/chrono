import { configureStore } from "@reduxjs/toolkit";
import countriesListReducer from "./countries.list.slice";
const store = configureStore({
    reducer: {
        countriesList: countriesListReducer,
    },
});

export default store;
