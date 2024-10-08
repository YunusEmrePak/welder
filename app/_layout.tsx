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
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Toast />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="project/[id]"
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="employee/[id]"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    </Provider>
  );
}
