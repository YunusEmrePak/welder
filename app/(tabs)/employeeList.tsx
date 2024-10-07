import { StyleSheet } from "react-native";

import EmployeePage from "../../pages/Employee/EmployeePage";

export default function EmployeeScreen() {
  return <EmployeePage />;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
