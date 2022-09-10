import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataApi } from "../../api/dataApi";
import { IPost, IUser } from "../../types";
import { RootState } from "../store";
import { isRequestingToggle } from "./app.slice";

interface UsersState {
  users: Array<IUser> | [];
}

const initialState: UsersState = { users: [] };

const usersReducer = createSlice({
  name: "usersReducer",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<IUser> | []>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUsersData.fulfilled,
      (state, action: PayloadAction<Array<IUser>>) => {
        state.users = action.payload;
      }
    );
  },
});

export const getUsersData = createAsyncThunk<Array<IUser>>(
  "users/getUsersData",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(isRequestingToggle(true));

    try {
      const result = await getUsersArrAsync().then((users) => {
        const dataPromisesArr = users.map(async (user) => {
          user.photo = await getUserPhotoAsync(user.id);
          user.post = await getUserPostAsync(user.id);
          return user;
        });

        return Promise.all(dataPromisesArr);
      });

      return result;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Something went wrong";
      return rejectWithValue(error);
    } finally {
      dispatch(isRequestingToggle(false));
    }
  }
);

export const getUsersArrAsync = async () => {
  const users: Array<IUser> = await dataApi.getUsers().then((response) => {
    return response.data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        company: user.company.name,
        photo: null,
        post: null,
      };
    });
  });

  return users;
};

export const getUserPhotoAsync = async (id: number) => {
  return await dataApi
    .getUserPhoto(id)
    .then((response) => response.data[0].url);
};

export const getUserPostAsync = async (id: number) => {
  return await dataApi.getUserPost(id).then((response) => {
    const post: IPost = {
      title: response.data[0].title,
      body: response.data[0].body,
    };

    return post;
  });
};

export const { setUsers } = usersReducer.actions;
export const usersSelector = (state: RootState) => state.usersReducer;

export default usersReducer.reducer;
