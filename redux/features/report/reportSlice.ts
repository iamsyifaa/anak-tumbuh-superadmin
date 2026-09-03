import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { PlatformSummary, SchoolRecapRow } from "@/lib/types/reportType";
import { getPlatformSummaryApi, getSchoolRecapApi } from "@/lib/api/reportApi";

interface ReportState {
  summary: PlatformSummary | null;
  schoolRecap: SchoolRecapRow[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  summary: null,
  schoolRecap: [],
  loading: false,
  error: null,
};

export const getPlatformSummary = createAsyncThunk<
  { code: number; message: string; data: PlatformSummary },
  void,
  { state: RootState }
>("report/getPlatformSummary", async (_, { getState }) => {
  const { accessToken } = getState().auth;
  return getPlatformSummaryApi(accessToken);
});

export const getSchoolRecap = createAsyncThunk<
  { code: number; message: string; data: SchoolRecapRow[] },
  { startDate: string; endDate: string },
  { state: RootState }
>("report/getSchoolRecap", async ({ startDate, endDate }, { getState }) => {
  const { accessToken } = getState().auth;
  return getSchoolRecapApi(accessToken, startDate, endDate);
});

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlatformSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlatformSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.data;
      })
      .addCase(getPlatformSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat ringkasan platform.";
      })
      .addCase(getSchoolRecap.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolRecap.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolRecap = action.payload.data ?? [];
      })
      .addCase(getSchoolRecap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat rekap sekolah.";
      });
  },
});

export default reportSlice.reducer;
