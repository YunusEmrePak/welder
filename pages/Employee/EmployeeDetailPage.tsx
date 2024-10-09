import Topbar from "@/components/bar/Topbar";
import EmployeeDeleteItem from "@/components/employee/EmployeeDeleteItem";
import EmployeeDetail from "@/components/employee/EmployeeDetail";
import EmployeeProjectList from "@/components/employee/EmployeeProjectList";
import EmployeeUpdateItemModal from "@/components/employee/EmployeeUpdateItemModal";
import ProjectDetail from "@/components/project/ProjectDetail";
import ProjectDetailStatusButton from "@/components/project/ProjectDetailStatusButtons";
import ProjectEmployeeList from "@/components/project/ProjectEmployeeList";
import ProjectUpdateItemModal from "@/components/project/ProjectUpdateItemModal";
import { employeeActions } from "@/redux/slices/employeeSlice";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import { verticalScale } from "@/themes/Metrics";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface EmployeeDetailProps {
  id: string | string[];
}

const EmployeeDetailPage: React.FC<EmployeeDetailProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { employeeDetailInformation } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    dispatch(employeeActions.setEmployeeDetailInformation(id));
  }, []);

  return (
    <View style={styles.container}>
      <Topbar />
      {employeeDetailInformation && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollContainer}>
            <EmployeeDetail />
            <EmployeeProjectList id={parseInt(id.toString())} />
            <EmployeeDeleteItem id={parseInt(id.toString())} />
            <EmployeeUpdateItemModal />
          </View>
        </ScrollView>
      )}
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

export default EmployeeDetailPage;
