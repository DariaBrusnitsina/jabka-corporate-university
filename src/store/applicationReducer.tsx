import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./store";
import axios from "axios";
import localStorageService from "../services/localStorage.service";
import { IAuth } from "./userReducer";

export interface IApplication {
  id?: number,
  leaderName: string,
  requestStatus?: string;
  subunitName: string,
  currentPosition: string,
  workExperience: string,
  personalAchievements: string,
  motivationMessage: string,
  user: IAuth
}

interface applicationState {
  entities: IApplication | null;
  error: string | null;
  loading: boolean;
}

const initialState: applicationState = {
  entities: null,
  error: null,
  loading: false
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<IApplication>) => {
      state.entities = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.entities = null;
      state.error = action.payload;
    }
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} = applicationSlice.actions;
export default applicationSlice.reducer;

export const createApplication = (data: IApplication) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorageService.getAccessToken()
      dispatch(fetchDataStart());
      await axios.post(`http://158.160.49.7:8080/api/user/request`,data,
      {headers: {'Authorization': `Bearer ${token}`}});
      // dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  }
};

export const deleteApplication = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorageService.getAccessToken()
      dispatch(fetchDataStart());
      // await axios.delete(`http://158.160.49.7:8080/api/user/request`, {'id': id});
      // dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  }
};


export const getUserApplicationById = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorageService.getAccessToken()

      dispatch(fetchDataStart());
      const response = await axios.get(`http://158.160.49.7:8080/api/user/request/user/${id}`,
       {headers: {'Authorization': `Bearer ${token}`}});
       console.log(response)
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  }
};

export const getUserApplications = () => (state: RootState) => state.application.entities;

