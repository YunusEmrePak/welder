import { StyleSheet } from "react-native";

import SettingsPage from "@/pages/Settings/SettingsPage";

export default function SettingsScreen() {
  return <SettingsPage />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
