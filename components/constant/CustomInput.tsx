import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React from "react";
import { StyleSheet, TextInput } from "react-native";
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

  const handleInputChange = (value: string) => {
    // For number inputs, disallow negative values and "-"
    if (["price", "material_cost", "paid_amount"].includes(item.inputName)) {
      // Allow empty string (for clearing the input)
      if (value === "") {
        handleDispatch(item.inputName, value);
        return;
      }

      // Only allow numeric values (no negative signs or non-numeric characters)
      const numericValue = value.replace(/[^0-9]/g, "");
      handleDispatch(item.inputName, numericValue);
    } else {
      // For non-number inputs, just dispatch the value as is
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
        dispatch(projectActions.setProjectPrice(value === "" ? 0 : parseFloat(value)));
        break;
      case "material_cost":
        dispatch(projectActions.setProjectMaterialCost(value === "" ? 0 : parseFloat(value)));
        break;
      case "paid_amount":
        dispatch(projectActions.setProjectPaidAmount(value === "" ? 0 : parseFloat(value)));
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
        return addProjectForm.price === 0 ? "" : addProjectForm.price.toString();
      case "material_cost":
        return addProjectForm.material_cost === 0
          ? ""
          : addProjectForm.material_cost.toString();
      case "paid_amount":
        return addProjectForm.paid_amount === 0
          ? ""
          : addProjectForm.paid_amount.toString();
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
      default:
        return "";
    }
  };

  const isNumberInput = ["price", "material_cost", "paid_amount"].includes(
    item.inputName
  );

  const isDetailInput = item.inputName === "detail";

  return (
    <TextInput
      style={[styles.input, isDetailInput && styles.detailInput]}
      placeholder={getPlaceholder()}
      onChangeText={handleInputChange}
      value={getInputValue()}
      keyboardType={isNumberInput ? "number-pad" : "default"}
    />
  );
};

const styles = StyleSheet.create({
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
  },
  detailInput: {
    height: verticalScale(90),
    textAlignVertical: "top",
  },
});

export default CustomInput;
