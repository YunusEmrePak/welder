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
import ProjectAssignEmployeeToProjectModal from "./ProjectAssignEmployeeToProjectModal";

interface StatusButtonProps {
  status: string;
  id: number | null;
}

const ProjectEmployeeList: React.FC<StatusButtonProps> = ({ id, status }) => {
  const dispatch = useAppDispatch();

  const { projectDetailInformation, listEmployeesWorkOnProject } = useSelector(
    (state: RootState) => state.project
  );

  const addEmployee = () => {
    dispatch(projectActions.setAssignEmpToProjectProjectId(id));
    dispatch(projectActions.setAssignModalVisible());
  };

  const increaseWorkDay = (employeeId: number, projectId: number) => {
    increaseWorkedDayEmployeeProject(employeeId, projectId);
    dispatch(projectActions.setEmployeesWorkOnProject(projectId));
    dispatch(employeeActions.setEmployeeList());
  };

  const decreaseWorkDay = (
    employeeId: number,
    projectId: number,
    workDay: number
  ) => {
    if (workDay > 0) {
      decreaseWorkedDayEmployeeProject(employeeId, projectId);
      dispatch(projectActions.setEmployeesWorkOnProject(projectId));
      dispatch(employeeActions.setEmployeeList());
    }
  };

  const dismissEmployee = (employeeId: number, projectId: number) => {
    dismissEmployeeFromProject({
      employee_id: employeeId,
      project_id: projectId,
    });
    dispatch(projectActions.setEmployeesWorkOnProject(projectId));
    dispatch(projectActions.setListEmployeeDoesNotWorkOnProject(projectId));
    dispatch(employeeActions.setEmployeeList());
  };

  return (
    <View style={styles.container}>
      {projectDetailInformation?.status === "inProgress" && (
        <CustomButton
          name="İşçi Ekle"
          onClick={addEmployee}
          iconUrl={require("@/assets/icons/add-user.png")}
          width="100%"
          height={verticalScale(40)}
        />
      )}

      <View
        style={[
          styles.employeesContainer,
          {
            marginTop: !(
              projectDetailInformation?.status === "cancelled" ||
              projectDetailInformation?.status === "done"
            )
              ? verticalScale(20)
              : 0,
          },
        ]}
      >
        {listEmployeesWorkOnProject.map((item: ProjectDetailEmployeeDto) => (
          <View key={item.id} style={styles.employeeContainer}>
            <View style={styles.titleContainer}>
              <Image
                source={require("@/assets/icons/worker.png")}
                style={styles.icon}
              />
              <Text style={[styles.text, styles.titleText]}>
                {item.name_surname}
              </Text>
            </View>
            <View style={styles.dayButtons}>
              {item.worked_day === 0 || status !== "inProgress" ? (
                <CustomButton
                  iconUrl={require("@/assets/icons/delete.png")}
                  onClick={() => dismissEmployee(item.id, id ? id : 0)}
                  width={horizontalScale(40)}
                  height={verticalScale(35)}
                />
              ) : (
                <CustomButton
                  name="-"
                  onClick={() =>
                    decreaseWorkDay(item.id, id ? id : 0, item.worked_day)
                  }
                  width={horizontalScale(40)}
                  height={verticalScale(35)}
                  disabled={
                    item.worked_day === 0 || status !== "inProgress"
                      ? true
                      : false
                  }
                />
              )}

              <View style={styles.workDay}>
                <Text style={styles.workText}>{item.worked_day}</Text>
              </View>

              <CustomButton
                name="+"
                onClick={() => increaseWorkDay(item.id, id ? id : 0)}
                width={horizontalScale(40)}
                height={verticalScale(35)}
              />
            </View>
          </View>
        ))}
      </View>
      <ProjectAssignEmployeeToProjectModal id={id} />
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
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
  },
  employeesContainer: {
    width: "100%",
    marginTop: verticalScale(20),
  },
  employeeContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: verticalScale(50),
    marginBottom: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: moderateScale(10),
    paddingHorizontal: verticalScale(10),
  },
  dayButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayButtonContainer: {
    width: horizontalScale(40),
    height: verticalScale(35),
    borderRadius: moderateScale(10),
    backgroundColor: "#E56E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  workDay: {
    width: horizontalScale(30),
    height: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  workText: {
    fontSize: moderateScale(18),
  },
  dayButton: {
    fontSize: moderateScale(23),
    color: "#fff",
  },
  icon: {
    width: horizontalScale(25),
    height: verticalScale(25),
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    // width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(5),
  },
  text: {
    color: "#000",
  },
});

export default ProjectEmployeeList;
