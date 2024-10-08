import { findEmployeeProjectByIdDb } from "@/database/employeeProjectDb";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { UpdateProjectDto } from "@/dto/update/updateProjectDto";
import { Project } from "@/entity/project";
import { listEmployeeProjectByProjectId } from "@/services/employeeProjectService";
import { findProjectById, listProject } from "@/services/projectService";
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectState {
  projectList: Project[];
  isModalVisible: boolean;
  isUpdateModalVisible: boolean;
  addProjectForm: AddProjectDto;
  updateProjectForm: UpdateProjectDto;
  projectDetailInformation: Project | null;
}

const initialState: ProjectState = {
  projectList: [],
  isModalVisible: false,
  isUpdateModalVisible: false,
  addProjectForm: {
    title: "",
    detail: "",
    customer: "",
    price: 0,
    material_cost: 0,
    paid_amount: 0,
  },
  updateProjectForm: {
    id: 0,
    title: "",
    detail: "",
    customer: "",
    price: null,
    status: "",
    material_cost: null,
    paid_amount: null,
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
      const projectList = listProject();
      state.projectList = projectList;
    },
    setProjectDetailInformation: (state, action) => {
      const project = findProjectById(action.payload);
      state.projectDetailInformation = project;
      state.updateProjectForm.id = project?.id ? project?.id : 0;
      state.updateProjectForm.title = project?.title ? project?.title : "";
      state.updateProjectForm.detail = project?.detail ? project?.detail : "";
      state.updateProjectForm.customer = project?.customer
        ? project?.customer
        : "";
      state.updateProjectForm.price = project?.price ? project?.price : 0;
      state.updateProjectForm.paid_amount = project?.paid_amount
        ? project?.paid_amount
        : 0;
      state.updateProjectForm.material_cost = project?.material_cost
        ? project?.material_cost
        : 0;
    },

    setProjectEmployeeList: (state, action) => {
      console.log(listEmployeeProjectByProjectId(action.payload));
    },
    setProjectAddModalVisible: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },
    setProjectUpdateModalVisible: (state) => {
      state.isUpdateModalVisible = !state.isUpdateModalVisible;
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

    setUpdateProjectId: (state, action) => {
      state.updateProjectForm.id = action.payload;
    },
    setUpdateProjectTitle: (state, action) => {
      state.updateProjectForm.title = action.payload;
    },
    setUpdateProjectDetail: (state, action) => {
      state.updateProjectForm.detail = action.payload;
    },
    setUpdateProjectCustomer: (state, action) => {
      state.updateProjectForm.customer = action.payload;
    },
    setUpdateProjectPrice: (state, action) => {
      state.updateProjectForm.price = action.payload;
    },
    setUpdateProjectMaterialCost: (state, action) => {
      state.updateProjectForm.material_cost = action.payload;
    },
    setUpdateProjectPaidAmount: (state, action) => {
      state.updateProjectForm.paid_amount = action.payload;
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

    setUpdateProjectFormClear: (state) => {
      const project = findProjectById(state.updateProjectForm.id);
      state.updateProjectForm.id = project?.id ? project?.id : 0;
      state.updateProjectForm.title = project?.title ? project?.title : "";
      state.updateProjectForm.detail = project?.detail ? project?.detail : "";
      state.updateProjectForm.customer = project?.customer
        ? project?.customer
        : "";
      state.updateProjectForm.price = project?.price ? project?.price : 0;
      state.updateProjectForm.paid_amount = project?.paid_amount
        ? project?.paid_amount
        : 0;
      state.updateProjectForm.material_cost = project?.material_cost
        ? project?.material_cost
        : 0;
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
