import { Employee } from "@/entity/employee";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("project_management.db");

export const addEmployeeDb = (employee: Employee) => {
  return db.runSync(
    "INSERT INTO employee (name_surname, daily_pay, total_worked_day, total_paid_amount) VALUES (?, ?, ?, ?)",
    employee.name_surname,
    employee.daily_pay,
    employee.total_worked_day,
    employee.total_paid_amount
  );
};

export const listEmployeeDb = (): Employee[] => {
  return db.getAllSync("SELECT * FROM employee") as Employee[];
};

export const findEmployeeByIdDb = (id: number): Employee | null => {
  const result = db.getFirstSync(`
    SELECT * from employee where id=${id}
    `);

  if (!result) {
    return null;
  }

  return result as Employee;
};
