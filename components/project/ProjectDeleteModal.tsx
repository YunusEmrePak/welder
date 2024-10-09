import { projectActions } from "@/redux/slices/projectSlice";
import {
    deleteProjectById
} from "@/services/projectService";
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
    StyleSheet,
    Text,
    ToastAndroid,
    View
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";

import { useRouter } from "expo-router";

interface ModalProps {
  id: number | null;
}

const ProjectDeleteModal: React.FC<ModalProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isDeleteModalVisible, isProjectDeletable } = useSelector(
    (state: RootState) => state.project
  );

  const closeModal = () => {
    dispatch(projectActions.setDeleteModalVisible());
  };

  const deleteProjectHandler = () => {
    dispatch(projectActions.setDeleteModalVisible());
    deleteProjectById(id ? id : 0);
    dispatch(projectActions.setProjectList());
    router.back();
    ToastAndroid.show("Proje başarıyla silindi.", ToastAndroid.LONG);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isDeleteModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          behavior="padding"
        >
          <Pressable style={styles.modalView}>
            {!isProjectDeletable ? (
              <View style={{ width: "100%" }}>
                <Text style={styles.title}>
                  Bu projede çalışan kişiler olduğu için silinemiyor
                </Text>
                <CustomButton
                  name="Tamam"
                  onClick={closeModal}
                  width={"100%"}
                  height={verticalScale(45)}
                  bgColor="#E56E1E"
                />
              </View>
            ) : (
              <View style={{ width: "100%" }}>
                <Text style={styles.title}>
                  Bu projeyi silmek istediğinizden emin misiniz?
                </Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomButton
                    name="Evet"
                    onClick={deleteProjectHandler}
                    width={"47%"}
                    height={verticalScale(45)}
                    bgColor="#b50000"
                  />
                  <CustomButton
                    name="Hayır"
                    onClick={closeModal}
                    width={"47%"}
                    height={verticalScale(45)}
                    bgColor="#E56E1E"
                  />
                </View>
              </View>
            )}
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

export default ProjectDeleteModal;
