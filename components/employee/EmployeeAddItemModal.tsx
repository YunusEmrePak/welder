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
  ToastAndroid,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import CustomInput, { CutomInputItemState } from "../constant/CustomInput";

import { employeeActions } from "@/redux/slices/employeeSlice";
import { addEmployee } from "@/services/employeeService";

const inputs: CutomInputItemState[] = [
  { inputName: "name_surname" },
  { inputName: "daily_pay" },
];

const EmployeeAddItemModal = () => {
  const dispatch = useAppDispatch();
  const { isModalVisible, addEmployeeForm } = useSelector(
    (state: RootState) => state.employee
  );

  const closeModal = () => {
    dispatch(employeeActions.setEmployeeAddModalVisible());
    dispatch(employeeActions.setEmployeeFormClear());
  };

  const addEmployeeHandler = () => {
    if (
      addEmployeeForm.name_surname === "" ||
      addEmployeeForm.daily_pay.toString() === ""
    ) {
      ToastAndroid.show(
        "Bütün alanları doldurmanız gerekmektedir.",
        ToastAndroid.LONG
      );
      return;
    }
    addEmployee(addEmployeeForm);
    dispatch(employeeActions.setEmployeeList());
    dispatch(employeeActions.setEmployeeAddModalVisible());
    dispatch(employeeActions.setEmployeeFormClear());
    ToastAndroid.show("Çalışan başarıyla eklendi.", ToastAndroid.LONG);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <View style={styles.centeredView}>
          <Pressable style={styles.modalView}>
            <Text style={styles.title}>Çalışan Ekleme</Text>
            {inputs.map((item) => (
              <CustomInput key={item.inputName} item={item} />
            ))}
            <CustomButton
              name="Ekle"
              onClick={addEmployeeHandler}
              iconUrl={require("@/assets/icons/add.png")}
              width={horizontalScale(270)}
              height={verticalScale(45)}
            />
          </Pressable>
        </View>
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

export default EmployeeAddItemModal;
