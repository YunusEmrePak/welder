import Topbar from "@/components/bar/Topbar";
import CustomButton from "@/components/constant/CustomButton";
import ProjectAddItem from "@/components/project/ProjectAddItem";
import ProjectAddItemModal from "@/components/project/ProjectAddItemModal";
import ProjectItem from "@/components/project/ProjectItem";
import { projectActions } from "@/redux/slices/projectSlice";
import { importDb, shareDb } from "@/services/backupService";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as Updates from "expo-updates";

const SettingsPage = () => {
  const dispatch = useAppDispatch();

  const importHandler = async () => {
    await importDb();
    Updates.reloadAsync();
  };

  const exportHandler = () => {
    shareDb();
  };

  return (
    <View style={styles.container}>
      <Topbar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: verticalScale(10),
            }}
          >
            <CustomButton
              name="Veriyi Dışa Aktar"
              onClick={exportHandler}
              iconUrl={require("@/assets/icons/export.png")}
              width={"100%"}
              height={verticalScale(45)}
              bgColor="#5D15EB"
            />
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: verticalScale(10),
            }}
          >
            <CustomButton
              name="Veriyi İçe Aktar"
              onClick={importHandler}
              iconUrl={require("@/assets/icons/import.png")}
              width={"100%"}
              height={verticalScale(45)}
              bgColor="#5D15EB"
            />
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              marginTop: verticalScale(15),
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(18),
                lineHeight: verticalScale(26),
              }}
            >
              * Veriyi içe aktarırken olan verileriniz silinir.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollView: {
    width: "80%",
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: verticalScale(120),
  },
});

export default SettingsPage;
