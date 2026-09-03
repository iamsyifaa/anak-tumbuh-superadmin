import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Account } from "@/lib/types/accountType";
import { getAccountListApi, storeAccountApi, updateAccountApi } from "@/lib/api/accountApi";

interface AccountState {
  accounts: Account[];
  code: number;
  message: string | null;
  totalData: number;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  code: 0,
  message: null,
  totalData: 0,
  loading: false,
  error: null,
};

export const getAccountList = createAsyncThunk<
  { code: number; message: string; data: Account[]; pagination: { total_items: number } },
  { search: string; page: number; limit: number },
  { state: RootState }
>("account/getAccountList", async ({ search, page, limit }, { getState }) => {
  const { accessToken } = getState().auth;
  return getAccountListApi(accessToken, search, page, limit);
});

export const storeAccount = createAsyncThunk<
  { code: number; message: string; data: Account },
  FormData,
  { state: RootState }
>("account/storeAccount", async (formData, { getState }) => {
  const { accessToken } = getState().auth;
  return storeAccountApi(formData, accessToken);
});

export const updateAccount = createAsyncThunk<
  { code: number; message: string; data: Account },
  { id: string; formData: FormData },
  { state: RootState }
>("account/updateAccount", async ({ id, formData }, { getState }) => {
  const { accessToken } = getState().auth;
  return updateAccountApi(id, formData, accessToken);
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccountMessage: (state) => {
      state.code = 0;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccountList.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.data ?? [];
        state.totalData = action.payload.pagination?.total_items ?? 0;
      })
      .addCase(getAccountList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat daftar akun.";
      })
      .addCase(storeAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(storeAccount.fulfilled, (state, action: PayloadAction<{ code: number; message: string; data: Account }>) => {
        state.loading = false;
        state.code = action.payload.code;
        state.message = action.payload.message;
        if (action.payload.code === 201) state.accounts.unshift(action.payload.data);
      })
      .addCase(storeAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal menambahkan akun.";
      })
      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<{ code: number; message: string; data: Account }>) => {
        state.code = action.payload.code;
        state.message = action.payload.message;
        const index = state.accounts.findIndex((item) => item.id === action.payload.data.id);
        if (index !== -1) state.accounts[index] = action.payload.data;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.error = action.error.message || "Gagal memperbarui akun.";
      });
  },
});

export const { clearAccountMessage } = accountSlice.actions;
export default accountSlice.reducer;
