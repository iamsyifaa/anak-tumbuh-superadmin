import { fetchCurrentUserApi, loginWithPasswordApi } from "@/lib/api/authApi";
import { getAccessToken } from "@/lib/api/client";
import type {
  AuthenticatedUser,
  AuthResult,
  PasswordLoginPayload,
} from "@/lib/types/authType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: AuthenticatedUser | null;
  accessToken: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: "",
  loading: false,
  error: null,
};

// Login gagal = thunk rejected (ApiError dilempar dari lib/api/client),
// jadi komponen cukup mengecek fulfilled/rejected, bukan response.code.
export const loginWithPassword = createAsyncThunk<
  AuthResult,
  PasswordLoginPayload
>("auth/loginWithPassword", (payload) => loginWithPasswordApi(payload));

// Redux hilang saat refresh sedangkan token ada di localStorage: pulihkan
// data user lewat GET /auth/me.
export const restoreSession = createAsyncThunk<AuthResult>(
  "auth/restoreSession",
  async () => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("Belum login.");
    const user = await fetchCurrentUserApi(accessToken);
    return { accessToken, user };
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.accessToken = "";
      state.loading = false;
      state.error = null;
    },
    clearAuthMessage: (state) => {
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
        (state, action: PayloadAction<AuthResult>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        },
      )
      .addCase(loginWithPassword.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = "";
        state.error = action.error.message || "Gagal melakukan login";
      })
      .addCase(
        restoreSession.fulfilled,
        (state, action: PayloadAction<AuthResult>) => {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        },
      );
  },
});

export const { resetAuth, clearAuthMessage } = authSlice.actions;

export default authSlice.reducer;
