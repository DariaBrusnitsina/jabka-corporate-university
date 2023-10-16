import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./store";

export interface IAuth {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

interface authState {
  entities: IAuth | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: authState = {
  isAuthenticated: false,
  entities: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchDataSuccess: (state, action: PayloadAction<IAuth>) => {
      state.isAuthenticated = true;
      state.entities = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.entities = null;
      state.error = action.payload;
    },
    logout: () => {
      return initialState
    }
  },
});

export const {
  fetchDataSuccess,
  fetchDataFailure,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

export const login = (
  login: string,
  password: string,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        login: login,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      dispatch(fetchDataSuccess(response.data));

    } catch (error) {
      dispatch(fetchDataFailure("Неверный логин или пароль"));
    }
  };
};

export const isAuthenticated = () => (state: RootState) => state.auth.isAuthenticated;
export const getAuthErrors = () => (state: RootState) => state.auth.error;
export const getCurrentUserId = () => (state: RootState) => state.auth.entities?.id;
