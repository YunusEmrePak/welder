import Topbar from "@/components/bar/Topbar";
import ProjectAddItem from "@/components/project/ProjectAddItem";
import ProjectAddItemModal from "@/components/project/ProjectAddItemModal";
import ProjectItem from "@/components/project/ProjectItem";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import { verticalScale } from "@/themes/Metrics";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const ProjectPage = () => {
  const dispatch = useAppDispatch();

  const projectList = useSelector(
    (state: RootState) => state.project.projectList
  );

  useEffect(() => {
    dispatch(projectActions.setProjectList());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Topbar />
      <ProjectAddItem />
      {projectList.map((item) => (
        <ProjectItem key={item.id} item={item} />
      ))}
      <ProjectAddItemModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    // marginTop: verticalScale(15)
  },
});

export default ProjectPage;
