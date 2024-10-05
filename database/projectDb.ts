import { Project } from "@/entity/project";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("project_management.db");

export const insertProject = (project: Project) => {
  db.runSync(
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

export const listProject = () => {
  return db.getAllSync("SELECT * FROM project");
};
