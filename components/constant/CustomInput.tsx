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
  const { isModalVisible } = useSelector((state: RootState) => state.project);

  const renderInput = (val: string) => {
    if (val === "title")
      return (
        <TextInput
          style={styles.input}
          placeholder="Başlık"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectTitle(value))
          }
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
        />
      );
    if (val === "price")
      return (
        <TextInput
          style={styles.input}
          placeholder="Ücret"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectPrice(value))
          }
        />
      );
    if (val === "material_cost")
      return (
        <TextInput
          style={styles.input}
          placeholder="Malzeme Ücreti"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectMaterialCost(value))
          }
        />
      );
    if (val === "paid_amount")
      return (
        <TextInput
          style={styles.input}
          placeholder="Ödenmiş Miktar"
          onChangeText={(value) =>
            dispatch(projectActions.setProjectPaidAmount(value))
          }
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
