import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { School } from "@/lib/types/schoolType";
import { getSchoolListApi, storeSchoolApi, updateSchoolApi } from "@/lib/api/schoolApi";

interface SchoolState {
  schools: School[];
  code: number;
  message: string | null;
  totalData: number;
  loading: boolean;
  error: string | null;
}

const initialState: SchoolState = {
  schools: [],
  code: 0,
  message: null,
  totalData: 0,
  loading: false,
  error: null,
};

export const getSchoolList = createAsyncThunk<
  { code: number; message: string; data: School[]; pagination: { total_items: number } },
  { search: string; page: number; limit: number },
  { state: RootState }
>("school/getSchoolList", async ({ search, page, limit }, { getState }) => {
  const { accessToken } = getState().auth;
  return getSchoolListApi(accessToken, search, page, limit);
});

export const storeSchool = createAsyncThunk<
  { code: number; message: string; data: School },
  FormData,
  { state: RootState }
>("school/storeSchool", async (formData, { getState }) => {
  const { accessToken } = getState().auth;
  return storeSchoolApi(formData, accessToken);
});

export const updateSchool = createAsyncThunk<
  { code: number; message: string; data: School },
  { id: string; formData: FormData },
  { state: RootState }
>("school/updateSchool", async ({ id, formData }, { getState }) => {
  const { accessToken } = getState().auth;
  return updateSchoolApi(id, formData, accessToken);
});

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    clearSchoolMessage: (state) => {
      state.code = 0;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolList.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload.data ?? [];
        state.totalData = action.payload.pagination?.total_items ?? 0;
      })
      .addCase(getSchoolList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat daftar sekolah.";
      })
      .addCase(storeSchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(storeSchool.fulfilled, (state, action: PayloadAction<{ code: number; message: string; data: School }>) => {
        state.loading = false;
        state.code = action.payload.code;
        state.message = action.payload.message;
        if (action.payload.code === 201) state.schools.unshift(action.payload.data);
      })
      .addCase(storeSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal menambahkan sekolah.";
      })
      .addCase(updateSchool.fulfilled, (state, action: PayloadAction<{ code: number; message: string; data: School }>) => {
        state.code = action.payload.code;
        state.message = action.payload.message;
        const index = state.schools.findIndex((item) => item.id === action.payload.data.id);
        if (index !== -1) state.schools[index] = action.payload.data;
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.error = action.error.message || "Gagal memperbarui sekolah.";
      });
  },
});

export const { clearSchoolMessage } = schoolSlice.actions;
export default schoolSlice.reducer;
