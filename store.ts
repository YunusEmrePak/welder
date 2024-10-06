import { configureStore } from "@reduxjs/toolkit";
import ProjectReduces, { ProjectState } from "./redux/slices/projectSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    project: ProjectReduces,
  },
});

export type RootState = {
  project: ProjectState;
};
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
