import { StyleSheet } from "react-native";

import HomePage from "../../pages/Home/HomePage";
import { useEffect } from "react";

export default function HomeScreen() {
  useEffect(() => {
    console.log("hi")
  }, [])
  return <HomePage />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
