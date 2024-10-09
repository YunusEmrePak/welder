import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import { CutomInputItemState } from "../constant/CustomInput";

import { AntDesign } from "@expo/vector-icons";
import { MultiSelect } from "react-native-element-dropdown";

const inputs: CutomInputItemState[] = [
  { inputName: "updateTitle" },
  { inputName: "updateCustomer" },
  { inputName: "updatePrice" },
  { inputName: "updateMaterial_cost" },
  { inputName: "updatePaid_amount" },
  { inputName: "updateDetail" },
];

interface ProjectAssignEmployeeToProjectProps {
  id: number | null;
}

const ProjectAssignEmployeeToProjectModal: React.FC<
  ProjectAssignEmployeeToProjectProps
> = ({ id }) => {
  const dispatch = useAppDispatch();
  const {
    isAssignModalVisible,
    selectedEmployee,
    listEmployeeDoesNotWorkOnProject,
  } = useSelector((state: RootState) => state.project);

  const closeModal = () => {
    dispatch(projectActions.setAssignModalVisible());
    dispatch(projectActions.setSelectedEmployee([]));
    dispatch(projectActions.setListEmployeeDoesNotWorkOnProject(id));
  };

  const assignEmployeeHandler = () => {
    if (selectedEmployee?.length && selectedEmployee?.length > 0) {
      dispatch(projectActions.setAssignEmployeeToProject(selectedEmployee));
      dispatch(projectActions.setEmployeesWorkOnProject(id));
      dispatch(projectActions.setListEmployeeDoesNotWorkOnProject(id));
      dispatch(projectActions.setSelectedEmployee([]));
      dispatch(projectActions.setAssignModalVisible());
      ToastAndroid.show("İşçi başarıyla projeye atandı.", ToastAndroid.LONG);
    }
  };

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
                activeColor="#ffc39c"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={listEmployeeDoesNotWorkOnProject}
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
              disabled={
                selectedEmployee?.length && selectedEmployee?.length > 0
                  ? false
                  : true
              }
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
    borderRadius: moderateScale(10),
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dropdownContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(10),
  },
  dropdown: {
    margin: moderateScale(15),
    height: verticalScale(50),
    width: horizontalScale(270),
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  icon: {
    marginRight: verticalScale(5),
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
  },
  selectedTextStyle: {
    fontSize: moderateScale(16),
  },
  iconStyle: {
    width: horizontalScale(20),
    height: verticalScale(20),
  },
  inputSearchStyle: {
    height: verticalScale(40),
    fontSize: moderateScale(16),
  },
});

export default ProjectAssignEmployeeToProjectModal;
