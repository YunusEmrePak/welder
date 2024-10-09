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
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomButton from "../constant/CustomButton";
import {
  makeProjectStatusCancelled,
  makeProjectStatusDone,
  makeProjectStatusInProgress,
} from "@/services/projectService";

interface StatusButtonProps {
  status: string;
  id: number;
}

const ProjectDetailStatusButton: React.FC<StatusButtonProps> = ({
  status,
  id,
}) => {
  const dispatch = useAppDispatch();

  const { projectDetailInformation } = useSelector(
    (state: RootState) => state.project
  );

  const cancelProject = () => {
    makeProjectStatusCancelled(id);
    dispatch(projectActions.setProjectDetailInformation(id));
    dispatch(projectActions.setProjectList());
    ToastAndroid.show("Proje İptal Edildi.", ToastAndroid.LONG);
  };

  const startProject = () => {
    makeProjectStatusInProgress(id);
    dispatch(projectActions.setProjectDetailInformation(id));
    dispatch(projectActions.setProjectList());
    ToastAndroid.show("Proje Başlatıldı.", ToastAndroid.LONG);
  };

  const finishProject = () => {
    makeProjectStatusDone(id);
    dispatch(projectActions.setProjectDetailInformation(id));
    dispatch(projectActions.setProjectList());
    ToastAndroid.show("Proje Bitirildi.", ToastAndroid.LONG);
  };

  const buttonColor = {
    notStarted: "grey",
    inProgress: "#0084ff",
    done: "#007a3f",
    cancelled: "#b50000",
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: status === "cancelled" ? "flex-end" : "space-between",
        },
      ]}
    >
      {status !== "cancelled" && (
        <CustomButton
          name="İptal Et"
          onClick={cancelProject}
          iconUrl={require("@/assets/icons/cancel.png")}
          width={horizontalScale(140)}
          height={verticalScale(45)}
          bgColor={buttonColor["cancelled"]}
        />
      )}

      {status === "notStarted" ||
      status === "cancelled" ||
      status === "done" ? (
        <CustomButton
          name="Başlat"
          onClick={startProject}
          iconUrl={require("@/assets/icons/start.png")}
          width={horizontalScale(140)}
          height={verticalScale(45)}
          bgColor={buttonColor["inProgress"]}
        />
      ) : (
        status !== "done" && (
          <CustomButton
            name="Bitir"
            onClick={finishProject}
            iconUrl={require("@/assets/icons/check-mark.png")}
            width={horizontalScale(140)}
            height={verticalScale(45)}
            bgColor={buttonColor["done"]}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: "auto",
    marginVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
  },

  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
});

export default ProjectDetailStatusButton;
