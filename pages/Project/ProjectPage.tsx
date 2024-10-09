import Topbar from "@/components/bar/Topbar";
import ProjectAddItem from "@/components/project/ProjectAddItem";
import ProjectAddItemModal from "@/components/project/ProjectAddItemModal";
import ProjectItem from "@/components/project/ProjectItem";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import { verticalScale } from "@/themes/Metrics";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
    <View style={styles.container}>
      <Topbar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <ProjectAddItem />
          {projectList.map((item) => (
            <ProjectItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
      <ProjectAddItemModal />
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

export default ProjectPage;
