import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import planDraftService from "./planDraftService";

const initialState = {
  planExercises: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPlanDraft = createAsyncThunk(
  "planDraft/createPlanDraft",
  async (username, thunkAPI) => {
    try {
      return await planDraftService.createPlanDraft(username);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPlanDraft = createAsyncThunk(
  "planDraft/getPlanDraft",
  async (username, thunkAPI) => {
    try {
      return await planDraftService.getPlanDraft(username);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePlanDraft = createAsyncThunk(
  "planDraft/updatePlanDraft",
  async (planData, thunkAPI) => {
    try {
      return await planDraftService.updatePlanDraft(planData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removePlanDraft = createAsyncThunk(
  "planDraft/removePlanDraft",
  async (planData, thunkAPI) => {
    try {
      return await planDraftService.removePlanDraft(planData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const planDraftSlice = createSlice({
  name: "planDraft",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlanDraft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlanDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.planExercises = action.payload.exercises;
      })
      .addCase(createPlanDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPlanDraft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlanDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.planExercises = action.payload.exercises;
      })
      .addCase(getPlanDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePlanDraft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePlanDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.planExercises = action.payload.exercises;
      })
      .addCase(updatePlanDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removePlanDraft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePlanDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.planExercises = action.payload.exercises;
      })
      .addCase(removePlanDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = planDraftSlice.actions;
export default planDraftSlice.reducer;
