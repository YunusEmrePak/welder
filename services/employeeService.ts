import {
  addEmployeeDb,
  findEmployeeByIdDb,
  listEmployeeDb,
} from "@/database/employeeDb";
import { Employee } from "@/entity/employee";

export const addEmployee = (employee: Employee) => {
  return addEmployeeDb(employee);
};

export const listEmployee = () => {
  listEmployeeDb();
};

export const findEmployeeById = (id: number): Employee | null => {
  return findEmployeeByIdDb(id);
};
