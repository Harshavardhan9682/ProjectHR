import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axisInstance/axisInstance";


export const fetchQuestions = createAsyncThunk(
  "questions/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { query = "", category= "" } = params;

      const response = await axiosInstance.get("/questions", {
        params: { query,category },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch"
      );
    }
  }
);




export const addQuestions=createAsyncThunk("questions/addQuestions",
  async(question,{rejectWithValue})=>{
    try{
      const {data}=await axiosInstance.post("/questions/add",question)
      return data

    }catch(error){
      return rejectWithValue(error.response?.data?.message || "something  went  wrong")
    }
  }
)

export const updateQuestion=createAsyncThunk("questions/updateQuestions",
  async(id,updateedData,{rejectWithValue})=>{
    try{
      const {data} =await axiosInstance.put(`/questions/${id}`,updateedData)
      return data

    }catch(error){
      return rejectWithValue(error.response?.data?.message || "something  went  wrong")


    }
  }
)
export const deleteQuestion=createAsyncThunk("questions/deleteQuestion",
  async(id,{rejectWithValue})=>{
    try{
      await axiosInstance.delete(`/questions/${id}`)
      return id;

    }catch(error){
      return rejectWithValue(error.response?.data?.message || "something  went  wrong")

    }
  }
)

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;

        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addQuestions.fulfilled,(state,action)=>{
        state.questions.push(action.payload)
      })
      .addCase(updateQuestion.fulfilled,(state,action)=>{
        const idx=state.questions.findIndex((q)=>q.id===action.payload._id)
                if (idx >= 0) state.questions[idx] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled,(state,action)=>{
        state.questions= state.questions.filter((q) => q._id !== action.payload);

      })
  },
});

export default questionsSlice.reducer;
