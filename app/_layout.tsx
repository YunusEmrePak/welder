import { createTables } from "@/database/database";
import { listProject } from "@/database/projectDb";
import { addProject } from "@/services/projectService";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    createTables();
    addProject("Is1", "Duzgun Mehmet", "Mehmet Subasi", 50, 5, 1);
    console.log(listProject());
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
