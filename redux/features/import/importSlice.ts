import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { ImportResult } from "@/lib/types/importType";
import { importDataApi } from "@/lib/api/importApi";

interface ImportState {
  result: ImportResult | null;
  code: number;
  message: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ImportState = {
  result: null,
  code: 0,
  message: null,
  loading: false,
  error: null,
};

export const importData = createAsyncThunk<
  { code: number; message: string; data: ImportResult },
  FormData,
  { state: RootState }
>("import/importData", async (formData, { getState }) => {
  const { accessToken } = getState().auth;
  return importDataApi(formData, accessToken);
});

const importSlice = createSlice({
  name: "import",
  initialState,
  reducers: {
    resetImportResult: (state) => {
      state.result = null;
      state.code = 0;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importData.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.result = action.payload.data;
      })
      .addCase(importData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal mengimport data.";
      });
  },
});

export const { resetImportResult } = importSlice.actions;
export default importSlice.reducer;
