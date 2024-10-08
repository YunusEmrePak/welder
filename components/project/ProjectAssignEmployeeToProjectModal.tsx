import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import { CutomInputItemState } from "../constant/CustomInput";

import { AntDesign } from "@expo/vector-icons";
import { MultiSelect } from "react-native-element-dropdown";
import { printEmployeeProject } from "@/services/employeeProjectService";

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
    projectDetailInformation,
  } = useSelector((state: RootState) => state.project);
  const { employeeList } = useSelector((state: RootState) => state.employee);
  const [value, setValue] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[] | null>([]);

  const closeModal = () => {
    dispatch(projectActions.setAssignModalVisible());
  };

  useEffect(() => {
    dispatch(
      projectActions.setListEmployeeDoesNotWorkOnProject(
        projectDetailInformation?.id
      )
    );
  }, [isAssignModalVisible]);

  const assignEmployeeHandler = () => {
    dispatch(projectActions.setAssignEmployeeToProject(selectedEmployee));
    dispatch(projectActions.setAssignModalVisible());
    dispatch(projectActions.setSelectedEmployee([]));
    dispatch(projectActions.setEmployeesWorkOnProject(id));
    // printEmployeeProject();
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
    height: verticalScale(50),
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
