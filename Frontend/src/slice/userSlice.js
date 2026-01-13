import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axisInstance/axisInstance";

/* FETCH USERS */
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (params={}, { rejectWithValue }) => {
    try {
      const { query = "", category = "" } = params;
      const { data } = await axiosInstance.get("/user",{
        params:{query,category},
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

/* REGISTER */
export const userRegister = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user/register", user);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

/* LOGIN */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user/login", loginData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

/* UPDATE */
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/user/${id}`, updateData);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

/* DELETE */
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/user/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

export const assignExam = createAsyncThunk(
  "user/assignExams",
  async ({ userIds, examId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        "/user/assignExam",
        { userIds, examId }
      );

      return { userIds, examId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign exam"
      );
    }
  }
);

const initialState = {
  users: [],
  currentUser: null,
  token: null,
  loadingUsers: false,
  loadingAuth: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH USERS */
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = action.payload;
      })

      /* REGISTER */
      .addCase(userRegister.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })

      /* DELETE */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loadingAuth = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.token = action.payload.token;
        state.currentUser = {
          category: action.payload.category,
        };
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingAuth = false;
        state.error = action.payload;
      })
      //AssignExam
       .addCase(assignExam.pending, (state) => {
        state.assigningExam = true;
        state.error = null;
      })

      .addCase(assignExam.fulfilled, (state, action) => {
        const { userIds, examId } = action.payload;

        state.assigningExam = false;

        state.users = state.users.map((user) =>
          userIds.includes(user._id)
            ? { ...user, examId }
            : user
        );
      })

      .addCase(assignExam.rejected, (state, action) => {
        state.assigningExam = false;
        state.error = action.payload;
      });
  
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
