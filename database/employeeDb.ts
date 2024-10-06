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

export const deleteEmployeeByIdDb = (id: number) => {
  return db.runSync(`
    DELETE from employee where id=${id}
    `)
}

export const updateEmployeeDb = (employee: Employee) => {
  db.runSync(`
    UPDATE employee
    SET name_surname='${employee.name_surname}',
    daily_pay='${employee.daily_pay}'
    where id='${employee.id}'
    `)
}

export const updateTotalWorkedDayByEmployeeIdDb = (id: number, newTotalWorkedDay: number) => {
  db.runSync(
    "UPDATE employee SET total_worked_day=? where id=?",
    newTotalWorkedDay,
    id
  )
}

export const increaseWorkedDayEmployeeDb = (id: number) => {
  db.runSync("UPDATE employee SET total_worked_day = total_worked_day + 1, total_paid_amount = total_paid_amount + daily_pay WHERE id=?",  id)
}
