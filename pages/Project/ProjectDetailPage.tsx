import Topbar from "@/components/bar/Topbar";
import ProjectDeleteItem from "@/components/project/ProjectDeleteItem";
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

interface ProjectDetailProps {
  id: string | string[];
}

const ProjectDetailPage: React.FC<ProjectDetailProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { projectDetailInformation } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    dispatch(projectActions.setProjectDetailInformation(id));
    dispatch(projectActions.setListEmployeeDoesNotWorkOnProject(id));
    dispatch(projectActions.setEmployeesWorkOnProject(id));
  }, [id]);

  return (
    <View style={styles.container}>
      <Topbar />
      {projectDetailInformation && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollContainer}>
            <ProjectDetail />
            <ProjectDetailStatusButton
              status={projectDetailInformation.status}
              id={parseInt(id.toString())}
            />
            <ProjectEmployeeList
              status={projectDetailInformation.status}
              id={parseInt(id.toString())}
            />
            <ProjectDeleteItem id={parseInt(id.toString())} />
          </View>
        </ScrollView>
      )}
      <ProjectUpdateItemModal />
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

export default ProjectDetailPage;
