import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CalendarService from "../../api/services/CalendarService";

export const fetchCalendars = createAsyncThunk(
    "calendars/fetchCalendars",
    async (_, { rejectWithValue }) => {
        try {
            const response = await CalendarService.getCalendars();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch calendars",
            );
        }
    },
);

export const createCalendar = createAsyncThunk(
    "calendars/createCalendar",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CalendarService.createCalendar(data);
            return response.data.calendar;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create calendar",
            );
        }
    },
);

export const deleteCalendar = createAsyncThunk(
    "calendars/deleteCalendar",
    async (calendarId, { rejectWithValue }) => {
        try {
            await CalendarService.deleteCalendar(calendarId);
            return calendarId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete calendar",
            );
        }
    },
);

const calendarSlice = createSlice({
    name: "calendars",
    initialState: {
        calendars: [],
        guestCalendars: [],
        activeCalendars: [],
        showHolidays: true,
        loading: false,
        error: null,
    },
    reducers: {
        toggleHolidays: (state) => {
            state.showHolidays = !state.showHolidays;
        },
        toggleCalendar: (state, action) => {
            const calendarId = action.payload;
            if (state.activeCalendars.includes(calendarId)) {
                state.activeCalendars = state.activeCalendars.filter(
                    (id) => id !== calendarId,
                );
            } else {
                state.activeCalendars.push(calendarId);
            }
        },
        setActiveCalendars: (state, action) => {
            state.activeCalendars = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCalendars.fulfilled, (state, action) => {
                state.loading = false;
                state.calendars = action.payload.calendars;
                state.guestCalendars = action.payload.guestsCalendars;

                const allIds = [
                    ...action.payload.calendars.map((c) => c._id),
                    ...action.payload.guestsCalendars.map((c) => c._id),
                ];
                state.activeCalendars = allIds;
            })
            .addCase(fetchCalendars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCalendar.fulfilled, (state, action) => {
                const newCalendar = action.payload;
                if (newCalendar && newCalendar._id) {
                    state.calendars.push(newCalendar);
                    state.activeCalendars.push(newCalendar._id);
                }
            })
            .addCase(createCalendar.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteCalendar.fulfilled, (state, action) => {
                state.calendars = state.calendars.filter(
                    (c) => c._id !== action.payload,
                );
                state.activeCalendars = state.activeCalendars.filter(
                    (id) => id !== action.payload,
                );
            });
    },
});

export const { toggleCalendar, setActiveCalendars, toggleHolidays } =
    calendarSlice.actions;
export default calendarSlice.reducer;
