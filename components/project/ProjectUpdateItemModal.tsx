import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import CustomInput, { CutomInputItemState } from "../constant/CustomInput";
import { addProject, updateProject } from "@/services/projectService";

import Toast from "react-native-toast-message";
import CustomUpdateInput from "../constant/CustomUpdateInput";

const inputs: CutomInputItemState[] = [
  { inputName: "updateTitle" },
  { inputName: "updateCustomer" },
  { inputName: "updatePrice" },
  { inputName: "updateMaterial_cost" },
  { inputName: "updatePaid_amount" },
  { inputName: "updateDetail" },
];

const ProjectUpdateItemModal = () => {
  const dispatch = useAppDispatch();
  const { isUpdateModalVisible, updateProjectForm } = useSelector(
    (state: RootState) => state.project
  );

  const closeModal = () => {
    dispatch(projectActions.setProjectUpdateModalVisible());
    dispatch(projectActions.setUpdateProjectFormClear());
  };

  const addProjectHandler = () => {
    console.log(updateProjectForm)
    if (
      updateProjectForm.title === "" ||
      updateProjectForm.detail === "" ||
      updateProjectForm.customer === "" ||
      updateProjectForm.price === null ||
      updateProjectForm.price.toString() === "" ||
      updateProjectForm.price < 0 ||
      updateProjectForm.material_cost === null ||
      updateProjectForm.material_cost.toString() === "" ||
      updateProjectForm.material_cost < 0 ||
      updateProjectForm.paid_amount === null ||
      updateProjectForm.paid_amount.toString() === "" ||
      updateProjectForm.paid_amount < 0
    ) {
      ToastAndroid.show(
        "Bütün alanları doldurmanız gerekmektedir.",
        ToastAndroid.LONG
      );
      return;
    }
    updateProject(updateProjectForm);
    dispatch(projectActions.setProjectList());
    dispatch(projectActions.setProjectDetailInformation(updateProjectForm.id));
    dispatch(projectActions.setProjectUpdateModalVisible());
    dispatch(projectActions.setUpdateProjectFormClear());
    ToastAndroid.show("Proje başarıyla güncellendi.", ToastAndroid.LONG);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isUpdateModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          behavior="padding"
        >
          <Pressable style={styles.modalView}>
            <Text style={styles.title}>Proje Güncelleme</Text>
            {inputs.map((item) => (
              <CustomUpdateInput key={item.inputName} item={item} />
            ))}
            <CustomButton
              name="Güncelle"
              onClick={addProjectHandler}
              iconUrl={require("@/assets/icons/pen.png")}
              width={horizontalScale(270)}
              height={verticalScale(45)}
            />
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(20),
    marginBottom: verticalScale(15),
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(4),
    elevation: 5,
  },
  button: {
    borderRadius: moderateScale(10),
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: verticalScale(30),
    width: horizontalScale(200),
    backgroundColor: "#fcfcfc",
    borderRadius: moderateScale(10),
    borderColor: "#e3e3e9",
    borderWidth: 1,
    paddingHorizontal: horizontalScale(5),
    marginBottom: verticalScale(10),
  },
});

export default ProjectUpdateItemModal;
