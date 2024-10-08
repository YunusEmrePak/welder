import { assignEmployeeToProjectDb, decreaseWorkedDayEmployeeProjectDb, dismissEmployeeFromProjectDb, findEmployeeProjectByForeignKeysDb, findEmployeeProjectByIdDb, increaseWorkedDayEmployeeProjectDb, listEmployeeProject, listEmployeeProjectByProjectIdDb } from "@/database/employeeProjectDb"
import { AddEmployeeProjectDto } from "@/dto/add/addEmployeeProjectDto"
import { EmployeeProject } from "@/entity/employeeProject"
import { decreaseWorkedDayEmployee, increaseWorkedDayEmployee } from "./employeeService"

export const findEmployeeProjectById = (id: number) => {
    return findEmployeeProjectByIdDb(id)
}

export const findEmployeeProjectByForeignKeys = (addEmployeeProjectDto: AddEmployeeProjectDto) => {
    return findEmployeeProjectByForeignKeysDb(addEmployeeProjectDto)
}

export const assignEmployeeToProject = (addEmployeeProjectDto: AddEmployeeProjectDto) => {
    assignEmployeeToProjectDb(addEmployeeProjectDto)
}

export const dismissEmployeeFromProject = (addEmployeeProjectDto: AddEmployeeProjectDto) => {
    dismissEmployeeFromProjectDb(addEmployeeProjectDto)
}

export const listEmployeeProjectByProjectId = (projectId: number): EmployeeProject[] => {
    return listEmployeeProjectByProjectIdDb(projectId)
}

export const increaseWorkedDayEmployeeProject = (employeeId: number, projectId: number) => {
    increaseWorkedDayEmployee(employeeId)
    increaseWorkedDayEmployeeProjectDb(employeeId, projectId)
}

export const decreaseWorkedDayEmployeeProject = (employeeId: number, projectId: number) => {
  decreaseWorkedDayEmployee(employeeId)
  decreaseWorkedDayEmployeeProjectDb(employeeId, projectId)
}

export const printEmployeeProject = () => {
    const employeeProjects: EmployeeProject[] = listEmployeeProject();
    console.log(
      "\nEMPLOYEE PROJECT TABLE************************************************************************************************\n"
    );
  
    console.log(
      "ID  | Employee ID  | Project ID | Worked Day | Paid Amount"
    );
    console.log(
      "-------------------------------------"
    );
  
    employeeProjects.forEach((employeeProject) => {
      console.log(
        `${employeeProject.id}  | ${employeeProject.employee_id}           | ${employeeProject.project_id}  | ${employeeProject.worked_day}  | ${employeeProject.paid_amount}`
      );
    });
  };
  