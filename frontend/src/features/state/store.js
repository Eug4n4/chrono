import { configureStore } from "@reduxjs/toolkit";
import countriesListReducer from "./countries.list.slice";
import authReducer from "./auth.slice";
import calendarReducer from "./calendar.slice";
import eventReducer from "./event.slice";
import tagReducer from "./tag.slice";

const store = configureStore({
    reducer: {
        countriesList: countriesListReducer,
        auth: authReducer,
        calendars: calendarReducer,
        events: eventReducer,
        tags: tagReducer,
    },
});

export default store;
