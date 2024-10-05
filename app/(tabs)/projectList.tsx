import { StyleSheet } from "react-native";

import ProjectPage from "../../pages/ProjectPage";

export default function ProjectScreen() {
  return <ProjectPage />;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
