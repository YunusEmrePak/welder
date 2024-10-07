import {
  addEmployeeDb,
  deleteEmployeeByIdDb,
  findEmployeeByIdDb,
  increaseWorkedDayEmployeeDb,
  listEmployeeDb,
  updateEmployeeDb,
} from "@/database/employeeDb";
import { AddEmployeeDto } from "@/dto/add/addEmployeeDto";
import { UpdatedEmployeeDto } from "@/dto/update/updateEmployeeDto";
import { Employee } from "@/entity/employee";

export const addEmployee = (addEmployeeDto: AddEmployeeDto) => {

  const employee = {
    id: null,
    name_surname: addEmployeeDto.name_surname,
    daily_pay: addEmployeeDto.daily_pay,
    total_worked_day: 0,
    total_paid_amount: 0,
  }

  return addEmployeeDb(employee);
};

export const listEmployee = (): Employee[] => {
  return listEmployeeDb();
};

export const findEmployeeById = (id: number): Employee | null => {
  return findEmployeeByIdDb(id);
};

export const deleteEmployeeById = (id: number) => {
  return deleteEmployeeByIdDb(id)
}

export const updateEmployee = (updateEmployeeDto: UpdatedEmployeeDto) => {

  let oldEmployee = findEmployeeById(updateEmployeeDto.id)

  if(!oldEmployee){
    throw new Error(`Can't find employee with id = ${updateEmployeeDto.id}`)
  }

  if(updateEmployeeDto.name_surname !== null && updateEmployeeDto.name_surname !== ""){
    oldEmployee.name_surname = updateEmployeeDto.name_surname
  }

  if(updateEmployeeDto.daily_pay !== null && updateEmployeeDto.daily_pay > 0){
    oldEmployee.daily_pay = updateEmployeeDto.daily_pay
  }

  updateEmployeeDb(oldEmployee)
}

export const increaseWorkedDayEmployee = (id: number) => {
  increaseWorkedDayEmployeeDb(id)
}

export const decreaseWorkedDayEmployee = (id: number) => {
  decreaseWorkedDayEmployee(id)
}




export const printEmployee = () => {
  const employees: Employee[] = listEmployee(); // Assuming listEmployee() fetches the employee list

  console.log(
    "\nEMPLOYEE TABLE ***********************************************************************************************\n"
  );

  console.log(
    "ID  | Name                | Daily Pay | Total Worked Days | Total Paid Amount"
  );
  console.log(
    "------------------------------------------------------------------------------------------------------------"
  );

  employees.forEach((employee) => {
    console.log(
      `${employee.id}  | ${employee.name_surname.padEnd(18)} | $${employee.daily_pay} | ${employee.total_worked_day
      } days | $${employee.total_paid_amount}`
    );
  });
};

