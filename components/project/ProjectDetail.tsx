import Topbar from "@/components/bar/Topbar";
import ProjectAddItem from "@/components/project/ProjectAddItem";
import ProjectAddItemModal from "@/components/project/ProjectAddItemModal";
import ProjectItem from "@/components/project/ProjectItem";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";

const ProjectDetail = () => {
  const dispatch = useAppDispatch();

  const { projectDetailInformation } = useSelector(
    (state: RootState) => state.project
  );

  const openUpdateProjectModal = () => {
    console.log("Update Page");
  };

  const statusMessage = {
    notStarted: "Başlanmadı",
    inProgress: "Devam Ediyor",
    done: "Bitti",
    cancelled: "İptal Edildi",
  };

  const color = {
    notStarted: "grey",
    inProgress: "#0084ff",
    done: "#007a3f",
    cancelled: "#b50000",
  };

  const bgColor = {
    notStarted: "#d9d9d9",
    inProgress: "#d4f3fc",
    done: "#d4fce0",
    cancelled: "#fcd4d4",
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            bgColor[projectDetailInformation?.status as keyof typeof bgColor] ||
            bgColor.notStarted,
        },
      ]}
    >
      <View style={styles.titleDetailContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require("@/assets/icons/titleIcon.png")}
            style={styles.titleIcon}
          />
          <Text style={[styles.text, styles.titleText]}>
            {projectDetailInformation?.title}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={[styles.text, styles.detailText]}>
            {projectDetailInformation?.detail}
          </Text>
        </View>
      </View>
      <View style={styles.customerContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require("@/assets/icons/user.png")}
            style={styles.titleIcon}
          />
          <Text style={[styles.text, styles.titleText]}>
            {projectDetailInformation?.customer}
          </Text>
        </View>
        <View style={styles.moneyContainer}>
          <View style={[styles.row]}>
            <View style={[styles.col]}>
              <Text style={styles.moneyTitle}>Gider</Text>
              <Text style={styles.moneyText}>
                {projectDetailInformation?.material_cost}₺
              </Text>
            </View>
            <View style={[styles.col]}>
              <Text style={styles.moneyTitle}>Ödenen</Text>
              <Text style={styles.moneyText}>
                {projectDetailInformation?.paid_amount}₺
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={[styles.col]}>
              <Text style={styles.moneyTitle}>Ücret</Text>
              <Text style={styles.moneyText}>
                {projectDetailInformation?.price}₺
              </Text>
            </View>
            <View style={[styles.col]}>
              <Text style={styles.moneyTitle}>Borç</Text>
              <Text style={styles.moneyText}>
                {projectDetailInformation?.debt_amount}₺
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            name="Güncelle"
            onClick={openUpdateProjectModal}
            iconUrl={require("@/assets/icons/pen.png")}
            width={horizontalScale(125)}
            height={verticalScale(45)}
          />
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressDot,
            {
              backgroundColor:
                color[projectDetailInformation?.status as keyof typeof color] ||
                color.notStarted,
            },
          ]}
        ></View>
        <Text
          style={[
            styles.progressText,
            {
              color:
                color[projectDetailInformation?.status as keyof typeof color] ||
                color.notStarted,
            },
          ]}
        >
          {statusMessage[
            projectDetailInformation?.status as keyof typeof statusMessage
          ] || statusMessage.notStarted}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "95%",
    height: "auto",
    marginTop: verticalScale(10),
    borderRadius: moderateScale(10),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
  },
  titleIcon: {
    width: horizontalScale(25),
    height: verticalScale(25),
    marginLeft: verticalScale(5),
    justifyContent: "center",
    alignItems: "center",
    marginRight: horizontalScale(8),
  },
  text: {
    color: "#000",
  },
  titleDetailContainer: {
    width: "100%",
    height: "auto",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: moderateScale(25),
  },
  detailContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: verticalScale(5),
  },
  detailText: {
    fontSize: moderateScale(16),
    paddingLeft: horizontalScale(5),
  },
  customerContainer: {
    width: "100%",
    height: verticalScale(240),
    marginTop: verticalScale(20),
  },
  moneyContainer: {
    width: "100%",
    marginTop: verticalScale(20),
  },
  moneyTitle: {
    fontSize: moderateScale(20),
  },
  moneyText: {
    fontSize: moderateScale(26),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(20),
  },
  col: {
    alignItems: "center",
    width: "50%",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  progressContainer: {
    position: "absolute",
    top: verticalScale(5),
    right: horizontalScale(10),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
  },
  progressDot: {
    width: horizontalScale(10),
    height: verticalScale(10),
    borderRadius: 100,
    marginRight: horizontalScale(5),
  },
  progressText: {
    fontSize: moderateScale(16),
  },
});

export default ProjectDetail;
