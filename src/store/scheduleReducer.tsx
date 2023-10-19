import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./store";
import { mockSchedule } from "../mock/schedule";
import { IStudent, ISubject } from "../Pages/Schedule /Schedule";

export interface ISchedule {
  id: number
  date: string
  studyGroup: {id: number, name: string, students: IStudent[]}
  subject: { name: string }
  classFormat: string
  auditorium: string
  linkForTheClass: string
  professorId: number
  professor: string
}

interface scheduleState {
  entities: ISchedule[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: scheduleState = {
  entities: null,
  error: null,
  loading: false
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<ISchedule[]>) => {
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
} = scheduleSlice.actions;
export default scheduleSlice.reducer;

export const getFullSchedule = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchDataStart());
      // const response = await axios.get('https://dummyjson.com/posts');
      dispatch(fetchDataSuccess(mockSchedule));
      // dispatch(fetchDataSuccess(response.data.posts));
    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  }
};

export const getPostById = (id: number) => (state: RootState) => {
  if (state.news.entities) {
      return state.news.entities.find((n) => n.id === id);
  }
};

export const getAllNews = () => (state: RootState) => state.news.entities;
