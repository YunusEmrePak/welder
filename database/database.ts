import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("project_management.db");


export const dropTables = () => {
  db.execSync(
    `DROP TABLE IF EXISTS employee_project;
     DROP TABLE IF EXISTS employee;
     DROP TABLE IF EXISTS project;`
  );
};


export const createTables = () => {
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
          worked_day INTEGER,
          FOREIGN KEY (project_id) REFERENCES project (id),
          FOREIGN KEY (employee_id) REFERENCES employee (id)
      );

        `
  );
};

export const clearDb = () => {
  db.execSync(
    `
    DELETE from employee_project;
    DELETE from project;
    DELETE from employee;`
  );
};
