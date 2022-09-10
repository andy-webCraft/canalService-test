import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fakeAuthApi } from "../../api/fakeAuthApi";
import { RootState } from "../store";

interface AppState {
  userName: string | null;
  isLogin: boolean;
  isMobile: boolean;
  isRequesting: boolean;
}

const initialState: AppState = {
  userName: null,
  isLogin: false,
  isMobile: false,
  isRequesting: false,
};

const appReducer = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string | null>) => {
      state.userName = action.payload;
    },
    isMobileToggle: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    isLoginToggle: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    isRequestingToggle: (state, action: PayloadAction<boolean>) => {
      state.isRequesting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authCheckThunk.fulfilled, (state, action) => {
      state.isLogin = true;
      state.userName = action.payload;
    });
  },
});

export const authCheckThunk = createAsyncThunk<
  string,
  { login: string; password: string }
>(
  "app/authCheck",
  async ({ login, password }, { dispatch, rejectWithValue }) => {
    dispatch(isRequestingToggle(true));

    try {
      const response = await fakeAuthApi.authCheck(login, password);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Something went wrong";
      return rejectWithValue(error);
    } finally {
      dispatch(isRequestingToggle(false));
    }
  }
);

export const {
  setUserName,
  isMobileToggle,
  isLoginToggle,
  isRequestingToggle,
} = appReducer.actions;
export const appSelect = (state: RootState) => state.appReducer;

export default appReducer.reducer;
