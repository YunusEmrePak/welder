import { employeeActions } from "@/redux/slices/employeeSlice";
import { useAppDispatch } from "@/store";
import { moderateScale, verticalScale } from "@/themes/Metrics";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../constant/CustomButton";
import ProjectDeleteModal from "./EmployeeDeleteModal";
import EmployeeDeleteModal from "./EmployeeDeleteModal";

interface ButtonProps {
  id: number | null;
}

const EmployeeDeleteItem: React.FC<ButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const controlDeleteEmployee = () => {
    dispatch(employeeActions.setIsEmployeeDeletable(id));
    dispatch(employeeActions.setDeleteModalVisible());
  };

  return (
    <View style={[styles.container]}>
      <CustomButton
        name="Çalışanı Sil"
        onClick={controlDeleteEmployee}
        iconUrl={require("@/assets/icons/delete.png")}
        width={"100%"}
        height={verticalScale(45)}
        bgColor="#b50000"
      />
      <EmployeeDeleteModal id={id} />
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

export default EmployeeDeleteItem;
