import { employeeActions } from "@/redux/slices/employeeSlice";
import { projectActions } from "@/redux/slices/projectSlice";
import {
  decreaseWorkedDayEmployeeProject,
  dismissEmployeeFromProject,
  increaseWorkedDayEmployeeProject,
} from "@/services/employeeProjectService";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import EmployeeProjectItem from "./EmployeeProjectItem";

interface StatusButtonProps {
  id: number | null;
}

const EmployeeProjectList: React.FC<StatusButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { listProjectOnEmployees } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    dispatch(employeeActions.setListProjectByAssignedEmployee(id));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.workedProjectText}>Çalıştığı Projeler</Text>
      {listProjectOnEmployees.length > 0 ? (
        listProjectOnEmployees.map((item: ProjectDetailEmployeeDto) => (
          <EmployeeProjectItem key={item.id} item={item} />
        ))
      ) : (
        <Text style={styles.noProjectText}>
          Şu anda bir projede çalışmıyor.
        </Text>
      )}
      {/* {listProjectOnEmployees.map((item: ProjectDetailEmployeeDto) => (
        <EmployeeProjectItem key={item.id} item={item} />
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "95%",
    height: "auto",
    backgroundColor: "#ffdfc9",
    borderRadius: moderateScale(10),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    marginTop: verticalScale(20),
  },
  workedProjectText: {
    marginBottom: verticalScale(15),
    fontSize: moderateScale(20),
  },
  noProjectText: {
    marginBottom: verticalScale(20),
    fontSize: moderateScale(18),
  },
});

export default EmployeeProjectList;
