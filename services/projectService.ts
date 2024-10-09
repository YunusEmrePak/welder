import {
  addProjectDb,
  deleteProjectByIdDb,
  findProjectByIdDb,
  isProjectDeletableDb,
  listProjectByAssignedEmployeeIdDb,
  listProjectDb,
  makeProjectStatusCancelledDb,
  makeProjectStatusDoneDb,
  makeProjectStatusInProgressDb,
  updateProjectDb,
} from "@/database/projectDb";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { UpdateProjectDto } from "@/dto/update/updateProjectDto";
import { Project } from "@/entity/project";
import { notStarted } from "@/enum/status";
import { getCurrentDate } from "@/utils/dateUtils";

export const addProject = (addProjectDto: AddProjectDto) => {
  const project = {
    title: addProjectDto.title,
    detail: addProjectDto.detail,
    customer: addProjectDto.customer,
    price: addProjectDto.price,
    material_cost: addProjectDto.material_cost,
    paid_amount: addProjectDto.paid_amount,
    create_date: getCurrentDate(),
    status: notStarted,
    debt_amount: addProjectDto.price - addProjectDto.paid_amount,
    start_date: null,
    finish_date: null,
    id: null,
  };

  return addProjectDb(project);
};

export const listProject = (): Project[] => {
  return listProjectDb();
};


export const listProjectByAssignedEmployee = (projectId: number): ProjectDetailEmployeeDto[] => {
  return listProjectByAssignedEmployeeIdDb(projectId);
};

export const findProjectById = (id: number): Project | null => {
  return findProjectByIdDb(id);
};

export const deleteProjectById = (id: number) => {
  return deleteProjectByIdDb(id);
};

export const updateProject = (project: UpdateProjectDto) => {
  let oldProject = findProjectById(project.id);
  if (!oldProject)
    throw new Error(`Can't find project with id = ${project.id}`);

  if (project.title !== null && project.title !== "") {
    oldProject.title = project.title;
  }
  if (project.detail !== null && project.detail !== "") {
    oldProject.detail = project.detail;
  }
  if (project.customer !== null && project.customer !== "") {
    oldProject.customer = project.customer;
  }
  if (project.status !== null && project.status !== "") {
    oldProject.status = project.status;
  }
  if (project.price !== null && project.price > 0) {
    oldProject.price = project.price;
  }
  if (project.material_cost !== null && project.material_cost > 0) {
    oldProject.material_cost = project.material_cost;
  }
  if (project.paid_amount !== null && project.paid_amount > 0) {
    oldProject.paid_amount = project.paid_amount;
    oldProject.debt_amount = oldProject.price - oldProject.paid_amount;
  }

  oldProject.debt_amount = oldProject.price - oldProject.paid_amount

  updateProjectDb(oldProject);
};

export const makeProjectStatusInProgress = (id: number) => {
  makeProjectStatusInProgressDb(id);
};

export const makeProjectStatusDone = (id: number) => {
  makeProjectStatusDoneDb(id);
};

export const makeProjectStatusCancelled = (id: number) => {
  makeProjectStatusCancelledDb(id);
};


export const isProjectDeletable = (projectId: number): boolean =>{
  return isProjectDeletableDb(projectId);
}

export const printProject = () => {
  const projects = listProject();

  console.log(
    "\nPROJECT TABLE ************************************************************************************************\n"
  );

  console.log(
    "ID | Title           | Customer      | Status    | Price   | Material Cost | Create Date | Start Date  | Finish Date | Paid Amount | Debt Amount"
  );
  console.log(
    "------------------------------------------------------------------------------------------------------------"
  );

  projects.forEach((item) => {
    console.log(
      `${item.id}  | ${item.title.padEnd(15)} | ${item.customer.padEnd(
        12
      )} | ${item.status.padEnd(8)} | $${item.price} | $${
        item.material_cost
      } | ${item.create_date.padEnd(8)} | ${item.start_date || "N/A"} | ${
        item.finish_date || "N/A"
      } | $${item.paid_amount} | $${item.debt_amount}`
    );
  });
};
