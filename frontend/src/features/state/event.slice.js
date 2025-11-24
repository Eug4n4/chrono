import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EventService from "../../api/services/EventService";

export const fetchEventsForCalendars = createAsyncThunk(
    "events/fetchEventsForCalendars",
    async ({ calendarIds, year }, { rejectWithValue }) => {
        try {
            const promises = calendarIds.map((id) =>
                EventService.getEventsForCalendar(id, year),
            );
            const responses = await Promise.all(promises);

            const eventsByCalendar = {};
            responses.forEach((response, index) => {
                const calendarId = calendarIds[index];
                eventsByCalendar[calendarId] = response.data.events;
            });

            return eventsByCalendar;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch events",
            );
        }
    },
);

export const createEvent = createAsyncThunk(
    "events/createEvent",
    async ({ calendarId, eventData }, { rejectWithValue }) => {
        try {
            const response = await EventService.createEvent(
                calendarId,
                eventData,
            );
            return { calendarId, event: response.data.event };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create event",
            );
        }
    },
);

export const updateEvent = createAsyncThunk(
    "events/updateEvent",
    async ({ calendarId, eventId, eventData }, { rejectWithValue }) => {
        try {
            const response = await EventService.updateEvent(eventId, eventData);
            return { calendarId, event: response.data.event };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update event",
            );
        }
    },
);

export const deleteEvent = createAsyncThunk(
    "events/deleteEvent",
    async ({ calendarId, eventId }, { rejectWithValue }) => {
        try {
            await EventService.deleteEvent(eventId);
            return { calendarId, eventId };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete event",
            );
        }
    },
);

const eventSlice = createSlice({
    name: "events",
    initialState: {
        eventsByCalendar: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventsForCalendars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventsForCalendars.fulfilled, (state, action) => {
                state.loading = false;
                const newEventsByCalendar = action.payload;
                Object.keys(newEventsByCalendar).forEach((calendarId) => {
                    if (!state.eventsByCalendar[calendarId]) {
                        state.eventsByCalendar[calendarId] = [];
                    }
                    const existingEvents = state.eventsByCalendar[calendarId];
                    const newEvents = newEventsByCalendar[calendarId];

                    const existingEventMap = new Map(
                        existingEvents.map((e) => [e._id, e]),
                    );

                    newEvents.forEach((event) => {
                        existingEventMap.set(event._id, event);
                    });

                    state.eventsByCalendar[calendarId] = Array.from(
                        existingEventMap.values(),
                    );
                });
            })
            .addCase(fetchEventsForCalendars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                const { calendarId, event } = action.payload;
                if (!state.eventsByCalendar[calendarId]) {
                    state.eventsByCalendar[calendarId] = [];
                }
                state.eventsByCalendar[calendarId].push(event);
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const { calendarId, event } = action.payload;
                if (state.eventsByCalendar[calendarId]) {
                    const index = state.eventsByCalendar[calendarId].findIndex(
                        (e) => e._id === event._id,
                    );
                    if (index !== -1) {
                        state.eventsByCalendar[calendarId][index] = event;
                    }
                }
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                const { calendarId, eventId } = action.payload;
                if (state.eventsByCalendar[calendarId]) {
                    state.eventsByCalendar[calendarId] = state.eventsByCalendar[
                        calendarId
                    ].filter((e) => e._id !== eventId);
                }
            });
    },
});

export default eventSlice.reducer;
