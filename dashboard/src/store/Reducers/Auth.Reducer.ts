import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";
import type { TRegisterFormData } from "../../views/Auth/Register";
import type { AxiosError } from "axios";

interface TAuthSlice {
  successMessage: string;
  errorMessage: string;
  loading: boolean;
  userInfo: null;
}

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",

  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data, {
        withCredentials: true,
      });
      toast.success(res.data?.message || "welcome back");
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;

      const errorMsg =
        error.response?.data?.message || error.message || "Failed to log in";

      toast.error(errorMsg);
      console.log("------- Error login ---------", error);

      return rejectWithValue(errorMsg);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: TRegisterFormData, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...sanitized } = data;
      const res = await api.post("/auth/register", sanitized);
      return res.data;
    } catch (err) {
      // Type guard for AxiosError
      const error = err as AxiosError<{ message: string }>;

      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-email", { token });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to verify email"
      );
    }
  }
);

export const reverifyEmail = createAsyncThunk(
  "auth/resendToken",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/reVerify-email", { user: id });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed Sending Verification Email"
      );
    }
  }
);

const initialState: TAuthSlice = {
  successMessage: "",
  errorMessage: "",
  loading: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userInfo = null;
    },
    clearMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Please Verify Your Email";
        state.userInfo = action.payload || null;
        state.errorMessage = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = (action.payload as string) || "Failed to Register";
        state.successMessage = "";
      });

    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Email verified successfully";
        state.userInfo = action.payload || null;
        state.errorMessage = "";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          (action.payload as string) || "Failed to verify email";
        state.successMessage = "";
      });

    builder
      .addCase(reverifyEmail.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(reverifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Please Check Your Mail To Verify";
        state.userInfo = action.payload || null;
        state.errorMessage = "";
      })
      .addCase(reverifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          (action.payload as string) || "Failed to send Verification Email";
        state.successMessage = "";
      });
  },
});
export const { logOut, clearMessages } = authSlice.actions;
export default authSlice.reducer;
