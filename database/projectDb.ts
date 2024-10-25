import { Project } from "@/entity/project";
import { cancelled, done, inProgress, notStarted } from "@/enum/status";
import { getCurrentDate } from "@/utils/dateUtils";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("project_management.db");

export const addProjectDb = (project: Project) => {
  return db.runSync(
    "INSERT INTO project (title, detail, customer, status, price, material_cost, create_date, start_date, finish_date, paid_amount, debt_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    project.title,
    project.detail,
    project.customer,
    project.status,
    project.price,
    project.material_cost,
    project.create_date,
    project.start_date,
    project.finish_date,
    project.paid_amount,
    project.debt_amount
  );
};

export const listProjectDb = (): Project[] => {
  return db.getAllSync("SELECT * FROM project order by id desc") as Project[];
};

export const listProjectByAssignedEmployeeIdDb = (employeeId: number): ProjectDetailEmployeeDto[] => {
  return db.getAllSync("SELECT project.id, project.title, project.customer, employee_project.worked_day, employee_project.paid_amount FROM project LEFT JOIN employee_project ON project.id=employee_project.project_id where employee_project.employee_id=?", employeeId) as ProjectDetailEmployeeDto[];
} 

export const findProjectByIdDb = (id: number): Project | null => {
  const result = db.getFirstSync(`
    SELECT * from project where id=${id}
    `);

  if (!result) {
    return null;
  }

  return result as Project;
};

export const deleteProjectByIdDb = (id: number) => {
  return db.runSync(`
    DELETE from project where id=${id}
    `);
};

export const updateProjectDb = (updatedProject: Project) => {
  const result = db.runSync(`
    UPDATE project
    SET title='${updatedProject.title}', 
    detail='${updatedProject.detail}', 
    customer='${updatedProject.customer}', 
    status='${updatedProject.status}', 
    price='${updatedProject.price}', 
    material_cost='${updatedProject.material_cost}', paid_amount='${updatedProject.paid_amount}', debt_amount='${updatedProject.debt_amount}'
    where id=${updatedProject.id}
    `);
};

export const makeProjectStatusInProgressDb = (id: number) => {
  const result = db.runSync(
    "UPDATE project SET status=?, start_date=?, finish_date = NULL where id=?", inProgress, getCurrentDate(), id
  )
}


export const makeProjectStatusDoneDb = (id: number) => {
  const result = db.runSync(
    "UPDATE project SET status=?, finish_date=? where id=?", done, getCurrentDate(), id
  )
}

export const makeProjectStatusCancelledDb = (id: number) => {
  const result = db.runSync(
    "UPDATE project SET status=? where id=?", cancelled, id
  )
}

export const totalCollectedMoneyDb = (): number => {
  const result = db.getFirstSync("SELECT SUM(paid_amount) from project");
  return result ? result["SUM(paid_amount)"] : 0;
}

export const totalDebtDb = (): number => {
  const result = db.getFirstSync("SELECT SUM(debt_amount) from project");
  return result ? result["SUM(debt_amount)"] : 0;
}

export const totalMaterialCostDb = (): number => {
  const result = db.getFirstSync("SELECT SUM(material_cost) from project");
  return result ? result["SUM(material_cost)"] : 0;
}

export const numberOfNotStartedProjectsDb = (): number => {
  return numberOfStatusProjectsDb(notStarted)
}

export const numberOfInProgressProjectsDb = (): number => {
  return numberOfStatusProjectsDb(inProgress)
}

export const numberOfDoneProjectsDb = (): number => {
  return numberOfStatusProjectsDb(done)
}

export const numberOfCanceledProjectsDb = (): number => {
  return numberOfStatusProjectsDb(cancelled)
}


const numberOfStatusProjectsDb = (status: string): number => {
  const result = db.getFirstSync("SELECT COUNT(id) from project where status=?", status);
  return result ? result["COUNT(id)"] : 0;
}

export const isProjectDeletableDb = (projectId: number): boolean =>{
  const result = db.getFirstSync("SELECT 1 from employee_project where project_id=?", projectId)
  return result === null ? true : false;
}
