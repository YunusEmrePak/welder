import { AddEmployeeProjectDto } from "@/dto/add/addEmployeeProjectDto";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { UpdateProjectDto } from "@/dto/update/updateProjectDto";
import { Employee } from "@/entity/employee";
import { EmployeeProject } from "@/entity/employeeProject";
import { Project } from "@/entity/project";
import {
  assignEmployeeToProject,
  listEmployeeProjectByProjectId,
} from "@/services/employeeProjectService";
import {
  listEmployeeByAssignedProjectId,
  listEmployeeWhoDoesNotWorkOnProject,
} from "@/services/employeeService";
import { findProjectById, listProject } from "@/services/projectService";
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectState {
  projectList: Project[];
  isModalVisible: boolean;
  isUpdateModalVisible: boolean;
  isAssignModalVisible: boolean;
  addProjectForm: AddProjectDto;
  updateProjectForm: UpdateProjectDto;
  projectDetailInformation: Project | null;
  projectEmployeeList: EmployeeProject[];
  assignEmpToProject: AddEmployeeProjectDto;
  selectedEmployee: string[] | null;
  listEmployeeDoesNotWorkOnProject: Employee[];
  listEmployeesWorkOnProject: ProjectDetailEmployeeDto[];
}

const initialState: ProjectState = {
  projectList: [],
  isModalVisible: false,
  isUpdateModalVisible: false,
  isAssignModalVisible: false,
  listEmployeeDoesNotWorkOnProject: [],
  listEmployeesWorkOnProject: [],
  projectEmployeeList: [],
  selectedEmployee: [],
  assignEmpToProject: {
    employee_id: 0,
    project_id: 0,
  },
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

    setEmployeesWorkOnProject: (state, action) => {
      const list = listEmployeeByAssignedProjectId(action.payload);
      state.listEmployeesWorkOnProject = list;
    },

    setAssignEmpToProjectEmployeeId: (state, action) => {
      state.assignEmpToProject.employee_id = action.payload;
    },
    setAssignEmpToProjectProjectId: (state, action) => {
      state.assignEmpToProject.project_id = action.payload;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    setListEmployeeDoesNotWorkOnProject: (state, action) => {
      state.listEmployeeDoesNotWorkOnProject =
        listEmployeeWhoDoesNotWorkOnProject(action.payload);
    },

    setAssignEmployeeToProject: (state, action) => {
      const employeeList = action.payload;
      employeeList.forEach((element: any) => {
        let assignEmployeeDto: AddEmployeeProjectDto = {
          project_id: state.projectDetailInformation?.id
            ? state.projectDetailInformation?.id
            : 0,
          employee_id: element,
        };
        assignEmployeeToProject(assignEmployeeDto);
      });
    },
    setProjectAddModalVisible: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },
    setProjectUpdateModalVisible: (state) => {
      state.isUpdateModalVisible = !state.isUpdateModalVisible;
    },
    setAssignModalVisible: (state) => {
      state.isAssignModalVisible = !state.isAssignModalVisible;
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
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
