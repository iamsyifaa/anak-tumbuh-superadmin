import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Account, CreateAccountInput } from "@/lib/types/accountType";
import {
  getAccountListApi,
  storeAccountApi,
  type AccountListParams,
} from "@/lib/api/accountApi";

interface AccountState {
  accounts: Account[];
  totalData: number;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  totalData: 0,
  loading: false,
  error: null,
};

// Gagal request = thunk rejected dengan pesan dari error.message backend.
export const getAccountList = createAsyncThunk(
  "account/getAccountList",
  (params: AccountListParams) => getAccountListApi(params),
);

export const storeAccount = createAsyncThunk(
  "account/storeAccount",
  (input: CreateAccountInput) => storeAccountApi(input),
);

// Backend hanya menyediakan GET & POST /headmasters (tanpa PATCH/DELETE),
// jadi tidak ada thunk edit/hapus akun.

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccountMessage: (state) => {
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
        state.totalData = action.payload.meta?.total ?? state.accounts.length;
      })
      .addCase(getAccountList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat daftar akun.";
      })
      .addCase(storeAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(storeAccount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(storeAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal menambahkan akun.";
      });
  },
});

export const { clearAccountMessage } = accountSlice.actions;
export default accountSlice.reducer;
