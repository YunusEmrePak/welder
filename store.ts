import { configureStore } from "@reduxjs/toolkit";
import ProjectReduces, { ProjectState } from "./redux/slices/projectSlice";
import EmployeeReduces, { EmployeeState } from "./redux/slices/employeeSlice";
import DashboardReduces, {
  DashboardState,
} from "./redux/slices/dashboardSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    project: ProjectReduces,
    employee: EmployeeReduces,
    dashboard: DashboardReduces,
  },
});

export type RootState = {
  project: ProjectState;
  employee: EmployeeState;
  dashboard: DashboardState;
};
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
