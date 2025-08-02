import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";
import type { TRegisterFormData } from "../../views/Auth/Register";

interface TAuthSlice {
  successMessage: string;
  errorMessage: string;
  loading: boolean;
  userInfo: null;
}

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",

  async (data: { email: string; password: string }) => {
    try {
      const res = await api.post("/auth/login", data, {
        withCredentials: true,
      });
      toast.success(res.data?.message || "welcome back");
      console.log(res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to log in");
        console.log("------- Error login ---------", error);
      } else {
        toast.error("Failed to log in");
        console.log("------- Error login ---------", error);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/RegisterUser",
  async (data: TRegisterFormData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...sanitized } = data;
      const res = await api.post("/auth/register", sanitized);
      if (res.data && res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to Register");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to Register");
        console.log("------- Error Register ---------", error);
      } else {
        toast.error("Failed to Register");
        console.log("------- Error Register ---------", error);
      }
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
  },
  extraReducers: () => {},
});

export default authSlice.reducer;
