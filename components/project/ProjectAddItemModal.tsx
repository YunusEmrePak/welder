import { projectActions } from "@/redux/slices/projectSlice";
import { addProject } from "@/services/projectService";
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
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import CustomInput, { CutomInputItemState } from "../constant/CustomInput";


const inputs: CutomInputItemState[] = [
  { inputName: "title" },
  { inputName: "customer" },
  { inputName: "price" },
  { inputName: "material_cost" },
  { inputName: "paid_amount" },
  { inputName: "detail" },
];

const ProjectAddItemModal = () => {
  const dispatch = useAppDispatch();
  const { isModalVisible, addProjectForm } = useSelector(
    (state: RootState) => state.project
  );

  const closeModal = () => {
    dispatch(projectActions.setProjectAddModalVisible());
    dispatch(projectActions.setProjectFormClear());
  };

  const addProjectHandler = () => {
    if (
      addProjectForm.title === "" ||
      addProjectForm.customer === "" ||
      addProjectForm.price.toString() === "" ||
      addProjectForm.material_cost.toString() === "" ||
      addProjectForm.paid_amount.toString() === ""
    ) {
      ToastAndroid.show(
        "Lütfen zorunlu alanları doldurunuz.",
        ToastAndroid.LONG
      );
      return;
    }
    if (addProjectForm.paid_amount > addProjectForm.price) {
      ToastAndroid.show(
        "Ödenen miktar ücretten fazla olamaz.",
        ToastAndroid.LONG
      );
      return;
    }
    addProject(addProjectForm);
    dispatch(projectActions.setProjectList());
    dispatch(projectActions.setProjectAddModalVisible());
    dispatch(projectActions.setProjectFormClear());
    ToastAndroid.show("Proje başarıyla eklendi.", ToastAndroid.LONG);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <KeyboardAvoidingView style={styles.centeredView}>
          <Pressable style={styles.modalView}>
            <Text style={styles.title}>Proje Ekleme</Text>
            {inputs.map((item) => (
              <CustomInput key={item.inputName} item={item} />
            ))}
            <CustomButton
              name="Ekle"
              onClick={addProjectHandler}
              iconUrl={require("@/assets/icons/add.png")}
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

export default ProjectAddItemModal;
