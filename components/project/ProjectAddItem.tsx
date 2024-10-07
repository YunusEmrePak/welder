import { projectActions } from "@/redux/slices/projectSlice";
import { useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../constant/CustomButton";

const ProjectAddItem: React.FC = () => {
  const dispatch = useAppDispatch();

  const openAddItemModal = () => {
    dispatch(projectActions.setProjectAddModalVisible());
  };

  return (
    <View style={[styles.container]}>
      <CustomButton
        name="Proje Ekle"
        onClick={openAddItemModal}
        iconUrl={require("@/assets/icons/new-project.png")}
        width={"100%"}
        height={verticalScale(55)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
});

export default ProjectAddItem;
