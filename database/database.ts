import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("project_management.db");

export const createTables = () => {
  //   console.log("Hello");
  db.execSync(
    `CREATE TABLE IF NOT EXISTS project (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          detail TEXT,
          customer TEXT,
          status TEXT,
          price REAL,
          material_cost REAL,
          create_date TEXT,
          start_date TEXT,
          finish_date TEXT,
          paid_amount REAL,
          debt_amount REAL
        );

        CREATE TABLE IF NOT EXISTS employee (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name_surname TEXT,
          daily_pay REAL,
          total_worked_day INTEGER,
          total_paid_amount REAL
        );

        CREATE TABLE IF NOT EXISTS employee_project (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          project_id INTEGER,
          employee_id INTEGER,
          FOREIGN KEY (project_id) REFERENCES project (id),
          FOREIGN KEY (employee_id) REFERENCES employee (id)
        );

        CREATE TABLE IF NOT EXISTS employee_work_record (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          employee_project_id INTEGER,
          total_worked_day INTEGER,
          FOREIGN KEY (employee_project_id) REFERENCES employee_project (id)
        );

        `
  );
};
