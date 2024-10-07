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
  const { isModalVisible, addProjectForm } = useSelector(
    (state: RootState) => state.project
  );

  const renderInput = (val: string) => {
    if (val === "title")
      return (
        <TextInput
          style={styles.input}
          placeholder="Başlık"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectTitle(value))
          }
          value={addProjectForm.title}
        />
      );
    if (val === "detail")
      return (
        <TextInput
          style={styles.input}
          placeholder="Detay"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectDetail(value))
          }
          value={addProjectForm.detail}
        />
      );
    if (val === "customer")
      return (
        <TextInput
          style={styles.input}
          placeholder="Müşteri İsmi"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectCustomer(value))
          }
          value={addProjectForm.customer}
        />
      );
    if (val === "price")
      return (
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Ücret"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectPrice(value))
          }
          value={addProjectForm.price === 0 ? "" : addProjectForm.price.toString()}
        />
      );
    if (val === "material_cost")
      return (
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Malzeme Ücreti"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectMaterialCost(value))
          }
          value={addProjectForm.material_cost === 0 ? "" : addProjectForm.material_cost.toString()}
        />
      );
    if (val === "paid_amount")
      return (
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Ödenmiş Miktar"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectPaidAmount(value))
          }
          value={addProjectForm.paid_amount === 0 ? "" : addProjectForm.paid_amount.toString()}
        />
      );
  };

  return renderInput(item.inputName);
};

const styles = StyleSheet.create({
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

export default CustomInput;
