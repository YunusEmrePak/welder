import { projectActions } from "@/redux/slices/projectSlice";
import { useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProjectAddItem: React.FC = () => {
  const dispatch = useAppDispatch();

  const openAddItemModal = () => {
    dispatch(projectActions.setProjectAddModalVisible());
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={openAddItemModal}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Proje Ekle</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(90),
    width: "95%",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(1),
    paddingHorizontal: horizontalScale(8),
    marginTop: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e3e3e9",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: moderateScale(10),
    elevation: 3,
    backgroundColor: "#d9d9d9",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4f3fc",
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(5),
  },
  buttonText: {
    fontSize: moderateScale(18),
  },
});

export default ProjectAddItem;
