import { Project } from "@/entity/project";
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
  return db.getAllSync("SELECT * FROM project") as Project[];
};

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
