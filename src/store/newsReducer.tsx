import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./store";
import { news } from "../mock/news";

export interface INews {
  header: string;
  date: string;
  text: string;
  hashtags: string[];
  id?: number;
  imgs?: string[];
}

interface newsState {
  entities: INews[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: newsState = {
  entities: null,
  error: null,
  loading: false
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<INews[]>) => {
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
} = newsSlice.actions;
export default newsSlice.reducer;

export const fetchNews = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchDataStart());
      // const response = await axios.get('https://dummyjson.com/posts');
      dispatch(fetchDataSuccess(news));
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
