import Topbar from "@/components/bar/Topbar";
import ProjectDetail from "@/components/project/ProjectDetail";
import ProjectDetailStatusButton from "@/components/project/ProjectDetailStatusButtons";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import { listEmployeeProjectByProjectId } from "@/services/employeeProjectService";
import { EmployeeProject } from "@/entity/employeeProject";
import ProjectAssignEmployeeToProjectModal from "./ProjectAssignEmployeeToProjectModal";

interface ProjectDetailProps {
  id: number | null;
}

const ProjectEmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { projectDetailInformation, projectEmployeeList } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    console.log(
      listEmployeeProjectByProjectId(
        projectDetailInformation?.id ? projectDetailInformation?.id : 0
      )
    );
  }, []);

  const addEmployee = () => {
    dispatch(
      projectActions.setAssignEmpToProjectProjectId(
        projectDetailInformation?.id
      )
    );
    dispatch(projectActions.setAssignModalVisible());
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
        {projectEmployeeList.map((item: EmployeeProject) => (
          <View key={item.id} style={styles.employeeContainer}>
            <View style={styles.titleContainer}>
              <Image
                source={require("@/assets/icons/worker.png")}
                style={styles.icon}
              />
              <Text style={[styles.text, styles.titleText]}>
                Yunus Emre Pak
              </Text>
            </View>
            <View style={styles.dayButtons}>
              <TouchableOpacity style={styles.dayButtonContainer}>
                <Text style={styles.dayButton}>-</Text>
              </TouchableOpacity>
              <View style={styles.workDay}>
                <Text style={styles.workText}>3</Text>
              </View>
              <TouchableOpacity style={styles.dayButtonContainer}>
                <Text style={styles.dayButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <ProjectAssignEmployeeToProjectModal />
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
    fontSize: moderateScale(20),
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
    fontSize: moderateScale(18),
    marginLeft: horizontalScale(5),
  },
  text: {
    color: "#000",
  },
});

export default ProjectEmployeeList;
