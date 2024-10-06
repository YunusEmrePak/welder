import { clearDb, createTables } from "@/database/database";
import { notStarted } from "@/enum/status";
import {
  addProject,
  deleteProjectById,
  updateProject,
  listProject,
  findProjectById,
  printProject,
} from "@/services/projectService";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

// const updatedProject = {
//   id: 15,
//   title: "Sql Yazmaca",
//   detail: "Backendci oldum",
//   customer: "Yunus Emre Pak",
//   status: notStarted,
//   price: 1000,
//   material_cost: 10,
//   paid_amount: 5,
// };

const updatedProject = {
  id: 15,
  title: null,
  detail: null,
  customer: "Umut Yilmaz Gunduz",
  status: null,
  price: null,
  material_cost: null,
  paid_amount: null,
};

export default function RootLayout() {
  useEffect(() => {
    createTables();
    // addProject("Is1", "Duzgun Mehmet", "Mehmet Subasi", 50, 5, 1);
    // addProject("Is2", "Duzgun Yunus", "Yunus Pak", 16, 10, 1);
    // addProject("Is3", "Duzgun Berkay", "Berkay Garip", 100, 30, 1);
    // clearDb();
    updateProject(updatedProject);

    printProject();

    // console.log(findProjectById(12));
    // deleteProject(12);
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
