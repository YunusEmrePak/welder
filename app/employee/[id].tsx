import EmployeeDetailPage from "@/pages/Employee/EmployeeDetailPage";
import ProjectDetailPage from "@/pages/Project/ProjectDetailPage";
import { useLocalSearchParams } from "expo-router";

const EmployeeDetailPageById = () => {
  const { id } = useLocalSearchParams();

  return <EmployeeDetailPage id={id} />;
};

export default EmployeeDetailPageById;
