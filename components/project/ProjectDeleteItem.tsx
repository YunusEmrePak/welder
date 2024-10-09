import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import { moderateScale, verticalScale } from "@/themes/Metrics";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import ProjectDeleteModal from "./ProjectDeleteModal";

interface ButtonProps {
  id: number | null;
}

const ProjectDeleteItem: React.FC<ButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { projectDetailInformation } = useSelector(
    (state: RootState) => state.project
  );

  const controlDeleteProject = () => {
    dispatch(projectActions.setIsProjectDeletable(id));
    dispatch(projectActions.setDeleteModalVisible());
  };

  return (
    <View style={[styles.container]}>
      <CustomButton
        name="Projeyi Sil"
        onClick={controlDeleteProject}
        iconUrl={require("@/assets/icons/delete.png")}
        width={"100%"}
        height={verticalScale(45)}
        bgColor="#b50000"
      />
      <ProjectDeleteModal id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "95%",
    height: "auto",
    marginTop: verticalScale(15),
    borderRadius: moderateScale(10),
  },
});

export default ProjectDeleteItem;
