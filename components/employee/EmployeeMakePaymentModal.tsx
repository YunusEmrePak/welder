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
import { CutomInputItemState } from "../constant/CustomInput";

import { employeeActions } from "@/redux/slices/employeeSlice";
import {
  makePaymentToEmployee,
  updateEmployee,
} from "@/services/employeeService";
import CustomUpdateInput from "../constant/CustomUpdateInput";

const inputs: CutomInputItemState[] = [{ inputName: "amount" }];

interface ButtonProps {
  id: number | null;
}

const EmployeeMakePaymentModal: React.FC<ButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const {
    isMakePaymentModalVisible,
    updateEmployeeForm,
    makePaymentForm,
    employeeDetailInformation,
  } = useSelector((state: RootState) => state.employee);

  const closeModal = () => {
    dispatch(employeeActions.setEmployeeMakePaymentModalVisible());
    dispatch(employeeActions.setUpdateEmployeeFormClear());
  };

  const makePayment = () => {
    if (
      makePaymentForm.amount === null ||
      makePaymentForm.amount.toString() === "" ||
      makePaymentForm.amount < 0
    ) {
      ToastAndroid.show(
        "Bütün alanları doldurmanız gerekmektedir.",
        ToastAndroid.LONG
      );
      return;
    }
    if (employeeDetailInformation?.total_paid_amount) {
      if (
        makePaymentForm.amount > employeeDetailInformation?.amount_will_be_given
      ) {
        ToastAndroid.show(
          "Ödenecek miktardan daha fazlasını ödeyemezsiniz!",
          ToastAndroid.LONG
        );
        return;
      }
    }
    makePaymentToEmployee(id ? id : 0, makePaymentForm.amount);
    dispatch(employeeActions.setEmployeeList());
    dispatch(
      employeeActions.setEmployeeDetailInformation(updateEmployeeForm.id)
    );
    dispatch(employeeActions.setEmployeeMakePaymentModalVisible());
    dispatch(employeeActions.setEmployeeMakePaymentAmount(0));
    ToastAndroid.show(
      "Ödenen miktar başarıyla güncellendi.",
      ToastAndroid.LONG
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isMakePaymentModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <View style={styles.centeredView}>
          <Pressable style={styles.modalView}>
            <Text style={styles.title}>Proje Güncelleme</Text>
            {inputs.map((item) => (
              <CustomUpdateInput key={item.inputName} item={item} />
            ))}
            <CustomButton
              name="Ödeme Yap"
              onClick={makePayment}
              iconUrl={require("@/assets/icons/payment-method.png")}
              width={horizontalScale(270)}
              height={verticalScale(45)}
              bgColor="#b50000"
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

export default EmployeeMakePaymentModal;
