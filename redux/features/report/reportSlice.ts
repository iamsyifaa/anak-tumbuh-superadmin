import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getPlatformSummary = createAsyncThunk(
  "report/getPlatformSummary",
  () => getPlatformSummaryApi(),
);

export const getSchoolRecap = createAsyncThunk(
  "report/getSchoolRecap",
  ({ startDate, endDate }: { startDate: string; endDate: string }) =>
    getSchoolRecapApi(startDate, endDate),
);

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
        state.summary = action.payload;
      })
      .addCase(getPlatformSummary.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Gagal memuat ringkasan platform.";
      })
      .addCase(getSchoolRecap.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolRecap.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolRecap = action.payload ?? [];
      })
      .addCase(getSchoolRecap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat rekap sekolah.";
      });
  },
});

export default reportSlice.reducer;
