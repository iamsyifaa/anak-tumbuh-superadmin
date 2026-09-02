import { loginWithPasswordApi } from "@/lib/api/authApi";
import { AuthApiResponse, AuthenticatedUser } from "@/lib/types/authType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: AuthenticatedUser | null;
  accessToken: string;
  code: number;
  message: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: "",
  code: 0,
  message: null,
  loading: false,
  error: null,
};

export const loginWithPassword = createAsyncThunk<
  AuthApiResponse,
  { formData: FormData }
>("auth/loginWithPassword", async ({ formData }) => {
  const response = await loginWithPasswordApi(formData);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.accessToken = "";
      state.code = 0;
      state.message = null;
      state.loading = false;
      state.error = null;
    },
    clearAuthMessage: (state) => {
      state.code = 0;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginWithPassword.fulfilled,
        (state, action: PayloadAction<AuthApiResponse>) => {
          state.loading = false;
          state.code = action.payload.code;
          state.message = action.payload.message;
          state.user = action.payload.data;
          state.accessToken = action.payload.access_token;
        }
      )
      .addCase(loginWithPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal melakukan login";
      });
  },
});

export const { resetAuth, clearAuthMessage } = authSlice.actions;

export default authSlice.reducer;
