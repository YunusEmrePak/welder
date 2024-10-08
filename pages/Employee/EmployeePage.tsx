import Topbar from "@/components/bar/Topbar";
import EmployeeAddItem from "@/components/employee/EmployeeAddItem";
import EmployeeAddItemModal from "@/components/employee/EmployeeAddItemModal";
import EmployeeItem from "@/components/employee/EmployeeItem";
import ProjectAddItem from "@/components/project/ProjectAddItem";
import ProjectAddItemModal from "@/components/project/ProjectAddItemModal";
import ProjectItem from "@/components/project/ProjectItem";
import { employeeActions } from "@/redux/slices/employeeSlice";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import { verticalScale } from "@/themes/Metrics";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const EmployeePage = () => {
  const dispatch = useAppDispatch();

  const employeeList = useSelector(
    (state: RootState) => state.employee.employeeList
  );

  useEffect(() => {
    dispatch(employeeActions.setEmployeeList());
  }, []);

  return (
    <View style={styles.container}>
      <Topbar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <EmployeeAddItem />
          {employeeList.map((item: any) => (
            <EmployeeItem key={item.id} item={item} />
          ))}
          <EmployeeAddItemModal />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: verticalScale(120),
  },
});

export default EmployeePage;
