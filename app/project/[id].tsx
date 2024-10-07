import ProjectDetailPage from "@/pages/Project/ProjectDetailPage";
import { useLocalSearchParams } from "expo-router";

const ProjectDetailPageById = () => {
  const { id } = useLocalSearchParams();

  return <ProjectDetailPage id={id} />;
};

export default ProjectDetailPageById;
