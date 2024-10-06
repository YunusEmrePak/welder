import { assignEmployeeToProjectDb, dismissEmployeeFromProjectDb, findEmployeeProjectByForeignKeysDb, findEmployeeProjectByIdDb, listEmployeeProject, listEmployeeProjectByProjectIdDb } from "@/database/employeeProjectDb"
import { AddEmployeeProjectDto } from "@/dto/add/addEmployeeProjectDto"
import { EmployeeProject } from "@/entity/employeeProject"

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

export const printEmployeeProject = () => {
    const employeeProjects: EmployeeProject[] = listEmployeeProject();
    console.log(
      "\nEMPLOYEE PROJECT TABLE************************************************************************************************\n"
    );
  
    console.log(
      "ID  | Employee ID  | Project ID"
    );
    console.log(
      "-------------------------------------"
    );
  
    employeeProjects.forEach((employeeProject) => {
      console.log(
        `${employeeProject.id}  | ${employeeProject.employee_id}           | ${employeeProject.project_id}`
      );
    });
  };
  