import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axisInstance/axisInstance";

/* submit exam */
export const submitExam = createAsyncThunk(
  "submit/submitPaper",
  async (submitData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/exam/submit", submitData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Submission failed"
      );
    }
  }
);



/* ✅ get ALL exam results */
export const getAllExamResults = createAsyncThunk(
  "submit/getAllResults",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/exam/result");

      
      return data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load results"
      );
    }
  }
);

export const getExamResult=createAsyncThunk(
  "submit/getExamResults",
  async(examId,{rejectWithValue})=>{
    console.log(examId)
    try{
      const  {data}=await axiosInstance.get(`/exam/result/${examId}`)
      return data
    }catch(error){
      return rejectWithValue(
        error.response?.data?.message || "Failed to  load results "
      )
    }
  }
)

const submitSlice = createSlice({
  name: "submit",
  initialState: {
    submitExamData: null,
    results: [],          
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* submit */
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.submitExamData = action.payload;
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* get ALL results */
      .addCase(getAllExamResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExamResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(getAllExamResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getExamResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExamResult.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(getExamResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default submitSlice.reducer;
