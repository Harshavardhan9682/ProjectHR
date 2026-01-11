import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axisInstance/axisInstance";

export const fetchExamQuestions = createAsyncThunk(
  "examQuestions/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/admin");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch"
      );
    }
  }
);

export const fetchExamById = createAsyncThunk(
  "exam/fetchById",
  async (examId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/admin/${examId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch exam"
      );
    }
  }
);

export const examQuestions = createAsyncThunk(
  "examQuestions/add",
  async (examQuestions, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/admin/test", examQuestions);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "examQuestions/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/admin/${id}`,
        updatedData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "examQuestions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/admin/login", loginData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const initialState = {
  data: [],
  loading1: false,
  error1: null,
};

const examquestionsSlice = createSlice({
  name: "examQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamQuestions.pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
      })
      .addCase(fetchExamQuestions.fulfilled, (state, action) => {
        state.loading1 = false;
        state.data = action.payload;
      })
      .addCase(fetchExamQuestions.rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.payload;
      })
      .addCase(fetchExamById.pending,(state)=>{
        state.loading1=true;
        state.error1=null
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.loading1 = false;
        state.data = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.payload;
      })
      .addCase(examQuestions.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (q) => q._id === action.payload._id
        );
        if (idx >= 0) state.data[idx] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (q) => q._id !== action.payload
        )
         .addCase(loginAdmin.pending, (state) => {
                state.loadingAuth = true;
                state.error = null;
              })
              .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loadingAuth = false;
                state.token = action.payload.token;
                state.currentAdmin = {
                  role: action.payload.role,
                };
                localStorage.setItem("token", action.payload.token);
              })
              .addCase(loginAdmin.rejected, (state, action) => {
                state.loadingAuth = false;
                state.error = action.payload;
              });
      });
  },
});

export default examquestionsSlice.reducer;
