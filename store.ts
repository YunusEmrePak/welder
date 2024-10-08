import { configureStore } from "@reduxjs/toolkit";
import ProjectReduces, { ProjectState } from "./redux/slices/projectSlice";
import EmployeeReduces, { EmployeeState } from "./redux/slices/employeeSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    project: ProjectReduces,
    employee: EmployeeReduces,
  },
});

export type RootState = {
  project: ProjectState;
  employee: EmployeeState;
};
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
