import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TagService from "../../api/services/TagService";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
    const response = await TagService.getAllTags();
    return response.data.tags;
});

const tagSlice = createSlice({
    name: "tags",
    initialState: {
        tags: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default tagSlice.reducer;
