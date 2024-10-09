import { employeeActions } from "@/redux/slices/employeeSlice";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React from "react";
import { Text, View } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { useSelector } from "react-redux";

export interface CutomInputItemState {
  inputName: string;
}

interface CustomInputProps {
  item: CutomInputItemState;
}

const CustomUpdateInput: React.FC<CustomInputProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { addProjectForm, updateProjectForm } = useSelector(
    (state: RootState) => state.project
  );
  const { addEmployeeForm, updateEmployeeForm } = useSelector(
    (state: RootState) => state.employee
  );

  const handleInputChange = (value: string) => {
    if (
      ["price", "material_cost", "paid_amount", "daily_pay"].includes(
        item.inputName
      )
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
      case "updateTitle":
        dispatch(projectActions.setUpdateProjectTitle(value));
        break;
      case "updateDetail":
        dispatch(projectActions.setUpdateProjectDetail(value));
        break;
      case "updateCustomer":
        dispatch(projectActions.setUpdateProjectCustomer(value));
        break;
      case "updatePrice":
        dispatch(
          projectActions.setUpdateProjectPrice(
            value === "" ? "" : parseFloat(value)
          )
        );
        break;
      case "updateMaterial_cost":
        dispatch(
          projectActions.setUpdateProjectMaterialCost(
            value === "" ? "" : parseFloat(value)
          )
        );
        break;
      case "updatePaid_amount":
        dispatch(
          projectActions.setUpdateProjectPaidAmount(
            value === "" ? "" : parseFloat(value)
          )
        );
        break;
      case "updatedName_surname":
        dispatch(employeeActions.setUpdateEmployeeNameSurname(value));
        break;
      case "UpdatedDaily_pay":
        dispatch(
          employeeActions.setUpdateEmployeeDailyPay(
            value === "" ? "" : parseFloat(value)
          )
        );
        break;
      default:
        break;
    }
  };

  const getInputValue = () => {
    switch (item.inputName) {
      case "updateTitle":
        return updateProjectForm.title !== null ? updateProjectForm.title : "";
      case "updateDetail":
        return updateProjectForm.detail !== null
          ? updateProjectForm.detail
          : "";
      case "updateCustomer":
        return updateProjectForm.customer !== null
          ? updateProjectForm.customer
          : "";

      case "updatePrice":
        return updateProjectForm.price?.toString() === "" ||
          updateProjectForm.price === null
          ? ""
          : updateProjectForm?.price.toString();

      case "updateMaterial_cost":
        return updateProjectForm.material_cost?.toString() === "" ||
          updateProjectForm.material_cost === null
          ? ""
          : updateProjectForm?.material_cost.toString();
      case "updatePaid_amount":
        return updateProjectForm.paid_amount?.toString() === "" ||
          updateProjectForm.paid_amount === null
          ? ""
          : updateProjectForm?.paid_amount.toString();
      case "updatedName_surname":
        return updateEmployeeForm.name_surname !== null
          ? updateEmployeeForm.name_surname
          : "";
      case "UpdatedDaily_pay":
        return updateEmployeeForm.daily_pay?.toString() === "" ||
          updateEmployeeForm.daily_pay === null
          ? ""
          : updateEmployeeForm?.daily_pay.toString();
      default:
        return "";
    }
  };

  const getPlaceholder = () => {
    switch (item.inputName) {
      case "updateTitle":
        return "Başlık";
      case "updateDetail":
        return "Detay";
      case "updateCustomer":
        return "Müşteri İsmi";
      case "updatePrice":
        return "Ücret";
      case "updateMaterial_cost":
        return "Malzeme Ücreti";
      case "updatePaid_amount":
        return "Ödenen Miktar";
      case "updatedName_surname":
        return "İsim Soyisim";
      case "UpdatedDaily_pay":
        return "Günlük Kazanç";
      default:
        return "";
    }
  };

  const isNumberInput = [
    "updatePrice",
    "updateMaterial_cost",
    "updatePaid_amount",
    "UpdatedDaily_pay",
  ].includes(item.inputName);

  const isDetailInput = item.inputName === "updateDetail";

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

export default CustomUpdateInput;
