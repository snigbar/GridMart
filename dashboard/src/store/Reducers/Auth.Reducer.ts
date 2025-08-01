import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";

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
      const res = await api.post("/admin/login", data, {
        withCredentials: true,
      });
      toast.error(res.statusText || "welcome back");
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
