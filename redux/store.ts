import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import schoolSlice from "./features/school/schoolSlice";
import accountSlice from "./features/account/accountSlice";
import reportSlice from "./features/report/reportSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    school: schoolSlice,
    account: accountSlice,
    report: reportSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
