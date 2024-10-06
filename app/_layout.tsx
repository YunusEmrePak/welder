import { createTables, dropTables } from "@/database/database";
import { AddEmployeeDto } from "@/dto/add/addEmployeeDto";
import { AddEmployeeProjectDto } from "@/dto/add/addEmployeeProjectDto";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { UpdatedEmployeeDto } from "@/dto/update/updateEmployeeDto";
import { assignEmployeeToProject, dismissEmployeeFromProject, printEmployeeProject } from "@/services/employeeProjectService";
import { addEmployee, printEmployee, updateEmployee } from "@/services/employeeService";
import {
  addProject,
  printProject
} from "@/services/projectService";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const employeeDto: AddEmployeeDto = {
    name_surname: "Yunus Emre",
    daily_pay: 750
}

const projectDto: AddProjectDto = {
  title: "dis kapi",
  detail: "6x2 metal dis kapi",
  customer: "yunus emre",
  price: 6000,
  material_cost: 1500,
  paid_amount: 0
}

const projectEmployee: AddEmployeeProjectDto = {
  employee_id: 1,
  project_id: 2,
}

const updateEmployeeDto: UpdatedEmployeeDto = {
  id: 2,
  name_surname:"Ahmet Hamdi",
  daily_pay:450
}

export default function RootLayout() {
  useEffect(() => {

    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()

    // dropTables()r
    createTables();

    assignEmployeeToProject(projectEmployee)
    // dismissEmployeeFromProject(projectEmployee) 

    printProject();
    printEmployee();
    printEmployeeProject(); 
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
