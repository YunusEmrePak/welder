import { AddEmployeeDto } from "@/dto/add/addEmployeeDto";
import { UpdatedEmployeeDto } from "@/dto/update/updateEmployeeDto";
import { Employee } from "@/entity/employee";
import { findEmployeeById, listEmployee } from "@/services/employeeService";
import { createSlice } from "@reduxjs/toolkit";

export interface EmployeeState {
  employeeList: Employee[];
  isModalVisible: boolean;
  isUpdateModalVisible: boolean;
  addEmployeeForm: AddEmployeeDto;
  updateEmployeeForm: UpdatedEmployeeDto;
  employeeDetailInformation: Employee | null;
}

const initialState: EmployeeState = {
  employeeList: [],
  isModalVisible: false,
  isUpdateModalVisible: false,
  addEmployeeForm: {
    name_surname: "",
    daily_pay: 0,
  },
  updateEmployeeForm: {
    id: 0,
    name_surname: "",
    daily_pay: 0,
  },
  employeeDetailInformation: {
    id: null,
    name_surname: "",
    daily_pay: 0,
    total_worked_day: 0,
    total_paid_amount: 0,
  },
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    setEmployeeList: (state) => {
      const employeeList = listEmployee();
      state.employeeList = employeeList;
    },

    setEmployeeAddModalVisible: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },

    setEmployeeDetailInformation: (state, action) => {
      const employee = findEmployeeById(action.payload);
      state.employeeDetailInformation = employee;
      state.updateEmployeeForm.id = employee?.id ? employee?.id : 0;
      state.updateEmployeeForm.name_surname = employee?.name_surname
        ? employee?.name_surname
        : "";
      state.updateEmployeeForm.daily_pay = employee?.daily_pay
        ? employee?.daily_pay
        : 0;
    },

    setEmployeeUpdateModalVisible: (state) => {
      state.isUpdateModalVisible = !state.isUpdateModalVisible;
    },
    setEmployeeName: (state, action) => {
      state.addEmployeeForm.name_surname = action.payload;
    },
    setEmployeeDailyPay: (state, action) => {
      state.addEmployeeForm.daily_pay = action.payload;
    },

    setUpdateEmployeeId: (state, action) => {
      state.updateEmployeeForm.id = action.payload;
    },
    setUpdateEmployeeNameSurname: (state, action) => {
      state.updateEmployeeForm.name_surname = action.payload;
    },
    setUpdateEmployeeDailyPay: (state, action) => {
      state.updateEmployeeForm.daily_pay = action.payload;
    },

    setEmployeeFormClear: (state) => {
      state.addEmployeeForm = {
        name_surname: "",
        daily_pay: 0,
      };
    },

    setUpdateEmployeeFormClear: (state) => {
      const employee = findEmployeeById(state.updateEmployeeForm.id);
      state.updateEmployeeForm.id = employee?.id ? employee?.id : 0;
      state.updateEmployeeForm.name_surname = employee?.name_surname
        ? employee?.name_surname
        : "";
      state.updateEmployeeForm.daily_pay = employee?.daily_pay
        ? employee?.daily_pay
        : 0;
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
