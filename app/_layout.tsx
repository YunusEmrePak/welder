import { AddEmployeeDto } from "@/dto/add/addEmployeeDto";
import { AddEmployeeProjectDto } from "@/dto/add/addEmployeeProjectDto";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { UpdatedEmployeeDto } from "@/dto/update/updateEmployeeDto";
import { store } from "@/store";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

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
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
