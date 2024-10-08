import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import CustomInput, { CutomInputItemState } from "../constant/CustomInput";
import { addProject, updateProject } from "@/services/projectService";

import Toast from "react-native-toast-message";
import CustomUpdateInput from "../constant/CustomUpdateInput";
import { animateMoneyText } from "@/utils/animateText";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { printEmployeeProject } from "@/services/employeeProjectService";

const inputs: CutomInputItemState[] = [
  { inputName: "updateTitle" },
  { inputName: "updateCustomer" },
  { inputName: "updatePrice" },
  { inputName: "updateMaterial_cost" },
  { inputName: "updatePaid_amount" },
  { inputName: "updateDetail" },
];

const ProjectAssignEmployeeToProjectModal = () => {
  const dispatch = useAppDispatch();
  const { isAssignModalVisible, selectedEmployee } = useSelector(
    (state: RootState) => state.project
  );
  const { employeeList } = useSelector((state: RootState) => state.employee);
  const [value, setValue] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[] | null>([]);

  const closeModal = () => {
    dispatch(projectActions.setAssignModalVisible());
  };

  const assignEmployeeHandler = () => {
    console.log(selectedEmployee)
    dispatch(projectActions.setAssignEmployeeToProject(selectedEmployee));
    dispatch(projectActions.setAssignModalVisible());
    dispatch(projectActions.setSelectedEmployee([]));
    printEmployeeProject()
  };

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isAssignModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          behavior="padding"
        >
          <Pressable style={styles.modalView}>
            <Text style={styles.title}>Projeye İşçi Atama</Text>
            <View style={styles.dropdownContainer}>
              <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={employeeList}
                labelField="name_surname"
                valueField="id"
                placeholder="İşçi Seç"
                searchPlaceholder="İşçi Ara"
                value={selectedEmployee}
                onChange={(item) => {
                  dispatch(projectActions.setSelectedEmployee(item));
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
                selectedStyle={styles.selectedStyle}
              />
            </View>

            <CustomButton
              name="İşçi Ata"
              onClick={assignEmployeeHandler}
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
  selectedStyle: {
    borderRadius: 12,
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
  dropdownContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(10),
  },
  dropdown: {
    margin: moderateScale(15),
    height: verticalScale(40),
    width: horizontalScale(270),
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ProjectAssignEmployeeToProjectModal;
