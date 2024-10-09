import { AddEmployeeProjectDto } from "@/dto/add/addEmployeeProjectDto";
import { UpdateEmployeeProjectDto } from "@/dto/update/updateEmployeeProjectDto";
import { EmployeeProject } from "@/entity/employeeProject";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("project_management.db");


export const findEmployeeProjectByIdDb = (id: number) => {
    const result = db.getFirstSync(`
        SELECT * from employee_project where id=${id}
        `);
    
      if (!result) {
        return null;
      }
    
      return result as EmployeeProject;
}

export const findEmployeeProjectByForeignKeysDb = (addEmployeeProjectDto: AddEmployeeProjectDto) => {
    const result = db.getFirstSync(`
        SELECT * from employee_project where project_id=${addEmployeeProjectDto.project_id} and employee_id=${addEmployeeProjectDto.employee_id}
        `);
    
      if (!result) {
        return null;
      }
    
      return result as EmployeeProject;
}

export const assignEmployeeToProjectDb = (addEmployeeProjectDto: AddEmployeeProjectDto) => {
    db.runSync(
        "INSERT INTO employee_project (project_id, employee_id, worked_day, paid_amount) VALUES (?, ?, 0, 0)",
        addEmployeeProjectDto.project_id,
        addEmployeeProjectDto.employee_id
        );
}

export const dismissEmployeeFromProjectDb = (addEmployeeProjectDto: AddEmployeeProjectDto) => {
    db.runSync(
        "DELETE from  employee_project where project_id=? and employee_id=?",
        addEmployeeProjectDto.project_id,
        addEmployeeProjectDto.employee_id
        );
}

export const listEmployeeProjectByProjectIdDb = (projectId: number): EmployeeProject[] => {
    return db.getAllSync("SELECT * from employee_project where project_id=?", projectId) as EmployeeProject[]
}

export const updateEmployeeProjectWorkedDayDb = (updateEmployeeProjectDto: UpdateEmployeeProjectDto) => {

    return db.runSync(
        "UPDATE employee_project Set worked_day=? where employee_id=? and project_id=?",
        updateEmployeeProjectDto.worked_day,
        updateEmployeeProjectDto.employee_id,
        updateEmployeeProjectDto.project_id 
    )

}

export const listEmployeeProject = () :EmployeeProject[] => {

    return db.getAllSync("SELECT * FROM employee_project") as EmployeeProject[];    

}

export const increaseWorkedDayEmployeeProjectDb = (employeeId: number, projectId: number) => {
    return db.runSync(
        "UPDATE employee_project Set worked_day= worked_day + 1, paid_amount= paid_amount + (SELECT employee.daily_pay from employee where employee.id = employee_project.employee_id)  where employee_id=? and project_id=?",employeeId, projectId
    )
}

export const decreaseWorkedDayEmployeeProjectDb = (employeeId: number, projectId: number) => {
    return db.runSync(
        "UPDATE employee_project Set worked_day= worked_day - 1, paid_amount= paid_amount - (SELECT employee.daily_pay from employee where employee.id = employee_project.employee_id) where employee_id=? and project_id=?",employeeId, projectId
    )
}
