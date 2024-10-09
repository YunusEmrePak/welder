import { Employee } from "@/entity/employee";
import {
  numberOfCancelledProjects,
  numberOfDoneProjects,
  numberOfInProgressProjects,
  numberOfNotStartedProjects,
  totalCollectedMoney,
  totalDebt,
  totalMaterialCost,
  totalProfit,
  totolEmployeeCost,
} from "@/services/dashboardService";
import { listEmployee } from "@/services/employeeService";
import { createSlice } from "@reduxjs/toolkit";

export interface TotalAndProjects {
  totalCollectedMoney: number;
  totalDebt: number;
  totalMaterialCost: number;
  totolEmployeeCost: number;
  totalProfit: number;
  numberOfNotStartedProjects: number;
  numberOfInProgressProjects: number;
  numberOfDoneProjects: number;
  numberOfCancelledProjects: number;
}

export interface DashboardState {
  totalAndProject: TotalAndProjects;
  isReloadModalVisible: boolean;
}

const initialState: DashboardState = {
  totalAndProject: {
    totalCollectedMoney: 0,
    totalDebt: 0,
    totalMaterialCost: 0,
    totolEmployeeCost: 0,
    totalProfit: 0,
    numberOfNotStartedProjects: 0,
    numberOfInProgressProjects: 0,
    numberOfDoneProjects: 0,
    numberOfCancelledProjects: 0,
  },
  isReloadModalVisible: false,
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setTotalMoneyAndProjects: (state) => {
      state.totalAndProject.totalCollectedMoney = totalCollectedMoney();
      state.totalAndProject.totalDebt = totalDebt();
      state.totalAndProject.totalMaterialCost = totalMaterialCost();
      state.totalAndProject.totolEmployeeCost = totolEmployeeCost();
      state.totalAndProject.totalProfit = totalProfit();
      state.totalAndProject.numberOfNotStartedProjects =
        numberOfNotStartedProjects();
      state.totalAndProject.numberOfInProgressProjects =
        numberOfInProgressProjects();
      state.totalAndProject.numberOfDoneProjects = numberOfDoneProjects();
      state.totalAndProject.numberOfCancelledProjects =
        numberOfCancelledProjects();
    },
    setIsReloadModalVisivle: (state) => {
      state.isReloadModalVisible = !state.isReloadModalVisible;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
