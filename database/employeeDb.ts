import { Employee } from "@/entity/employee";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("project_management.db");

export const addEmployeeDb = (employee: Employee) => {
  return db.runSync(
    "INSERT INTO employee (name_surname, daily_pay, total_worked_day, total_paid_amount, total_given_amount, amount_will_be_given) VALUES (?, ?, ?, ?, ?, ?)",
    employee.name_surname,
    employee.daily_pay,
    employee.total_worked_day,
    employee.total_paid_amount,
    employee.total_given_amount,
    employee.amount_will_be_given,
  );
};

export const listEmployeeDb = (): Employee[] => {
  return db.getAllSync("SELECT * FROM employee") as Employee[];
};

export const listEmployeeWhoDoesNotWorkOnProjectDb = (projectId: number): Employee[] => {
  return db.getAllSync(`
    SELECT employee.id, employee.name_surname  
    FROM employee 
    WHERE NOT EXISTS (
      SELECT 1 FROM employee_project 
      WHERE employee.id = employee_project.employee_id 
      AND employee_project.project_id = ?
    );
  `, projectId) as Employee[];
};

export const listEmployeeByAssignedProjectIdDb = (projectId: number): ProjectDetailEmployeeDto[] => {
  return db.getAllSync("SELECT employee.id, employee.name_surname, employee_project.worked_day FROM employee LEFT JOIN employee_project ON employee.id = employee_project.employee_id where employee_project.project_id=?", projectId) as ProjectDetailEmployeeDto[];
}

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
    daily_pay='${employee.daily_pay}',
    total_given_amount='${employee.total_given_amount}',
    amount_will_be_given='${employee.amount_will_be_given}'
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
  db.runSync("UPDATE employee SET total_worked_day = total_worked_day + 1, total_paid_amount = total_paid_amount + daily_pay, amount_will_be_given = amount_will_be_given + daily_pay WHERE id=?",  id)
}

export const decreaseWorkedDayEmployeeDb = (id: number) => {
  db.runSync("UPDATE employee SET total_worked_day = total_worked_day - 1, total_paid_amount = total_paid_amount - daily_pay, amount_will_be_given = amount_will_be_given - daily_pay WHERE id=?",  id)
}

export const totolEmployeeCostDb = (): number => {
  const result = db.getFirstSync("SELECT SUM(total_paid_amount) from employee");
  return result ? result["SUM(total_paid_amount)"] : 0;
}

export const totalEmployeeDebtDb = (): number => {
  const result = db.getFirstSync("SELECT SUM(amount_will_be_given) from employee");
  return result ? result["SUM(amount_will_be_given)"] : 0;
}

export const makePaymentToEmployeeDb = (employeeId: number ,amount: number) => {
  db.runSync("UPDATE employee SET total_given_amount = total_given_amount + ?, amount_will_be_given = amount_will_be_given - ? where id=?",amount, amount, employeeId);
  
}

export const isEmployeeDeletableDb = (employeeId: number): boolean =>{

  const result = db.getFirstSync("SELECT 1 from employee_project where employee_id=?", employeeId)
  return result === null ? true : false;
}
