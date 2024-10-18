import { TotalAndProjects } from "@/redux/slices/dashboardSlice";
import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { formatMoney } from "@/utils/formatMoney";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSelector } from "react-redux";

const DashboardProjects: React.FC = () => {
  const dispatch = useAppDispatch();

  const { totalAndProject } = useSelector(
    (state: RootState) => state.dashboard
  );

  return (
    <Animated.View
      entering={FadeInUp.duration(400).springify()}
      style={[styles.container]}
    >
      <Text style={styles.containerTitle}>Projeler</Text>
      <View style={styles.detail}>
        <View style={[styles.row, styles.row1]}>
          <View style={styles.item}>
            <Text style={styles.title}>Bitirilen </Text>
            <Text
              style={[styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {totalAndProject.numberOfDoneProjects}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Devam Eden </Text>
            <Text
              style={[styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {totalAndProject.numberOfInProgressProjects}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.row2]}>
          <View style={styles.item}>
            <Text style={styles.title}>Başlanmamış </Text>
            <Text
              style={[styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {totalAndProject.numberOfNotStartedProjects}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>İptal Edilen </Text>
            <Text
              style={[styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {totalAndProject.numberOfCancelledProjects}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "95%",
    backgroundColor: "#fce2cf",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(8),
    marginVertical: moderateScale(10),
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e3e3e9",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: moderateScale(10),
    elevation: 3,
  },
  containerTitle: {
    fontSize: moderateScale(22),
    marginBottom: verticalScale(10),
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "50%",
    height: verticalScale(100),
  },
  row1: {
    // paddingRight: horizontalScale(3),
  },
  row2: {},
  title: {
    color: "#614340",
    fontSize: moderateScale(16),
  },
  valueStatus: {
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  valueName: {
    // minWidth: "100%",
  },
  valueNumber: {
    // minWidth: "100%",
    fontSize: moderateScale(20),
  },
});

export default DashboardProjects;
