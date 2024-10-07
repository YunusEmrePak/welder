import { findEmployeeProjectByIdDb } from "@/database/employeeProjectDb";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { Project } from "@/entity/project";
import { listEmployeeProjectByProjectId } from "@/services/employeeProjectService";
import { findProjectById, listProject } from "@/services/projectService";
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectState {
  projectList: Project[];
  isModalVisible: boolean;
  addProjectForm: AddProjectDto;
  projectDetailInformation: Project | null;
}

const initialState: ProjectState = {
  projectList: [],
  isModalVisible: false,
  addProjectForm: {
    title: "",
    detail: "",
    customer: "",
    price: 0,
    material_cost: 0,
    paid_amount: 0,
  },
  projectDetailInformation: {
    id: null,
    title: "",
    detail: "",
    customer: "",
    status: "",
    price: 0,
    material_cost: 0,
    create_date: "",
    paid_amount: 0,
    debt_amount: 0,
    start_date: null,
    finish_date: null,
  },
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setProjectList: (state) => {
      state.projectList = listProject();
    },
    setProjectDetailInformation: (state, action) => {
      state.projectDetailInformation = findProjectById(action.payload);
    },
    setProjectEmployeeList: (state, action) => {
      console.log(listEmployeeProjectByProjectId(action.payload));
    },
    setProjectAddModalVisible: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },
    setProjectTitle: (state, action) => {
      state.addProjectForm.title = action.payload;
    },
    setProjectDetail: (state, action) => {
      state.addProjectForm.detail = action.payload;
    },
    setProjectCustomer: (state, action) => {
      state.addProjectForm.customer = action.payload;
    },
    setProjectPrice: (state, action) => {
      state.addProjectForm.price = action.payload;
    },
    setProjectMaterialCost: (state, action) => {
      state.addProjectForm.material_cost = action.payload;
    },
    setProjectPaidAmount: (state, action) => {
      state.addProjectForm.paid_amount = action.payload;
    },
    setProjectFormClear: (state) => {
      state.addProjectForm = {
        title: "",
        detail: "",
        customer: "",
        price: 0,
        material_cost: 0,
        paid_amount: 0,
      };
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(getOrdersList.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.orderList = action.payload.data;
  //       })
  //       .addCase(getOrdersList.pending, (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(getOrdersList.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.error.message || "Error fetching filtered data";
  //       });
  //   },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
