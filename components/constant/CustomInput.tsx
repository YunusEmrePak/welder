import { employeeActions } from "@/redux/slices/employeeSlice";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { formatInput } from "@/utils/formatMoney";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

export interface CutomInputItemState {
  inputName: string;
}

interface CustomInputProps {
  item: CutomInputItemState;
}

const CustomInput: React.FC<CustomInputProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { addProjectForm } = useSelector((state: RootState) => state.project);
  const { addEmployeeForm } = useSelector((state: RootState) => state.employee);

  const handleInputChange = (value: string) => {
    if (
      [
        "price",
        "material_cost",
        "paid_amount",
        "daily_pay",
      ].includes(item.inputName)
    ) {
      if (value === "") {
        handleDispatch(item.inputName, value);
        return;
      }

      const numericValue = parseInt(value, 10);

      if (!isNaN(numericValue) && numericValue >= 0) {
        handleDispatch(item.inputName, numericValue.toString());
      }
    } else {
      handleDispatch(item.inputName, value);
    }
  };

  const handleDispatch = (inputName: string, value: string) => {
    switch (inputName) {
      case "title":
        dispatch(projectActions.setProjectTitle(value));
        break;
      case "detail":
        dispatch(projectActions.setProjectDetail(value));
        break;
      case "customer":
        dispatch(projectActions.setProjectCustomer(value));
        break;
      case "price":
        dispatch(
          projectActions.setProjectPrice(value === "" ? "" : parseInt(value))
        );
        break;
      case "material_cost":
        dispatch(
          projectActions.setProjectMaterialCost(
            value === "" ? "" : parseInt(value)
          )
        );
        break;
      case "paid_amount":
        dispatch(
          projectActions.setProjectPaidAmount(
            value === "" ? "" : parseInt(value)
          )
        );
        break;
      case "name_surname":
        dispatch(employeeActions.setEmployeeName(value));
        break;
      case "daily_pay":
        dispatch(
          employeeActions.setEmployeeDailyPay(
            value === "" ? "" : parseInt(value)
          )
        );
        break;
      default:
        break;
    }
  };

  const getInputValue = () => {
    switch (item.inputName) {
      case "title":
        return addProjectForm.title;
      case "detail":
        return addProjectForm.detail;
      case "customer":
        return addProjectForm.customer;
      case "price":
        return addProjectForm.price.toString() === ""
          ? ""
          : addProjectForm.price.toString();
      case "material_cost":
        return addProjectForm.material_cost.toString() === ""
          ? ""
          : addProjectForm.material_cost.toString();
      case "paid_amount":
        return addProjectForm.paid_amount.toString() === ""
          ? ""
          : addProjectForm.paid_amount.toString();
      case "name_surname":
        return addEmployeeForm.name_surname;
      case "daily_pay":
        return addEmployeeForm.daily_pay.toString() === ""
          ? ""
          : addEmployeeForm.daily_pay.toString();
      default:
        return "";
    }
  };

  const getPlaceholder = () => {
    switch (item.inputName) {
      case "title":
        return "Başlık";
      case "detail":
        return "Detay";
      case "customer":
        return "Müşteri İsmi";
      case "price":
        return "Ücret";
      case "material_cost":
        return "Malzeme Ücreti";
      case "paid_amount":
        return "Ödenen Miktar";
      case "name_surname":
        return "İsim Soyisim";
      case "daily_pay":
        return "Günlük Kazanç";
      default:
        return "";
    }
  };

  const isNumberInput = [
    "price",
    "material_cost",
    "paid_amount",
    "daily_pay",
  ].includes(item.inputName);

  const isDetailInput = item.inputName === "detail";

  return (
    <View
      style={[styles.container, isDetailInput && styles.detailInputContainer]}
    >
      <Text style={styles.label}>
        {getPlaceholder()} {`${!isDetailInput ? `(*)` : ""}`}
      </Text>
      <TextInput
        style={[styles.input, isDetailInput && styles.detailInput]}
        onChangeText={handleInputChange}
        value={getInputValue()}
        keyboardType={isNumberInput ? "number-pad" : "default"}
        multiline={isDetailInput ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "red",
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    height: verticalScale(45),
    width: horizontalScale(270),
  },
  input: {
    height: verticalScale(45),
    width: horizontalScale(270),
    backgroundColor: "#fcfcfc",
    borderRadius: moderateScale(10),
    borderColor: "#e3e3e9",
    borderWidth: 1,
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(10),
    textAlignVertical: "center",
    position: "relative",
  },
  detailInputContainer: {
    height: verticalScale(90),
    textAlignVertical: "top",
  },
  detailInput: {
    height: verticalScale(90),
    textAlignVertical: "top",
    paddingTop: verticalScale(15),
  },
  label: {
    marginLeft: verticalScale(3),
    marginBottom: horizontalScale(2),
    position: "absolute",
    top: 2,
    left: 2,
    zIndex: 5,
    fontSize: moderateScale(10),
    color: "grey",
  },
});
export default CustomInput;
