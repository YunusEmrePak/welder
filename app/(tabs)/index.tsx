import { StyleSheet } from "react-native";

import HomePage from "../../pages/HomePage";

export default function HomeScreen() {
  return <HomePage />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
