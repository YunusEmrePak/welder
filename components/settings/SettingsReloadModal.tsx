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
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";

import { employeeActions } from "@/redux/slices/employeeSlice";
import { deleteEmployeeById } from "@/services/employeeService";
import { useRouter } from "expo-router";
import { dashboardActions } from "@/redux/slices/dashboardSlice";
import * as Updates from "expo-updates";

const SettingsReloadModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isReloadModalVisible } = useSelector(
    (state: RootState) => state.dashboard
  );

  const reloadApp = () => {
    Updates.reloadAsync();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isReloadModalVisible}
    >
      <Pressable style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          behavior="padding"
        >
          <Pressable style={styles.modalView}>
            <Text
              style={{
                fontSize: moderateScale(16),
                marginBottom: verticalScale(10),
              }}
            >
              Değişikliklerin yüklenmesi için uygulamayı yeniden
              başlatmalısınız.
            </Text>
            <CustomButton
              name="Yeniden Başlat"
              onClick={reloadApp}
              width={"100%"}
              height={verticalScale(45)}
              bgColor="#E56E1E"
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
    alignItems: "flex-start",
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

export default SettingsReloadModal;
