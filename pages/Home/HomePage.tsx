import Topbar from "@/components/bar/Topbar";
import DashboardProjects from "@/components/dashboard/DashboardProjects";
import DashboardTotalMoneyItem from "@/components/dashboard/DashboardTotalMoneyItem";
import ProjectAddItem from "@/components/project/ProjectAddItem";
import ProjectAddItemModal from "@/components/project/ProjectAddItemModal";
import ProjectItem from "@/components/project/ProjectItem";
import { dashboardActions } from "@/redux/slices/dashboardSlice";
import { projectActions } from "@/redux/slices/projectSlice";
import { RootState, useAppDispatch } from "@/store";
import { verticalScale } from "@/themes/Metrics";
import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { totalAndProject } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(dashboardActions.setTotalMoneyAndProjects());
  }, [totalAndProject]);

  const item = [
    {
      number: totalAndProject.totalProfit,
      color1: "#6dcf8f",
      color2: "#068f16",
      iconUrl: require("@/assets/icons/money-bag.png"),
      title: "Kâr",
    },
    {
      number: totalAndProject.totalCollectedMoney,
      color1: "#5bdae3",
      color2: "#0451b0",
      iconUrl: require("@/assets/icons/accounting.png"),
      title: "Toplanan Para",
    },
    {
      number: totalAndProject.totalDebt,
      color1: "#93abfa",
      color2: "#7105b0",
      iconUrl: require("@/assets/icons/salary.png"),
      title: "Toplanacak Para",
    },
    {
      number: totalAndProject.totalMaterialCost,
      color1: "#fc8888",
      color2: "#b00404",
      iconUrl: require("@/assets/icons/money.png"),
      title: "Malzeme Gideri",
    },
    {
      number: totalAndProject.totolEmployeeCost,
      color1: "#e39759",
      color2: "#b05104",
      iconUrl: require("@/assets/icons/employee-benefit.png"),
      title: "Çalışan Gideri",
    },
    {
      number: totalAndProject.totalEmployeeDebt,
      color1: "#ff8bb1",
      color2: "#ad005d",
      iconUrl: require("@/assets/icons/payment-method.png"),
      title: "Çalışana Borç",
    },
  ];

  return (
    <View style={styles.container}>
      <Topbar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <DashboardProjects />
          {totalAndProject &&
            item.map((item) => (
              <DashboardTotalMoneyItem
                key={item.iconUrl}
                iconUrl={item.iconUrl}
                item={item.number}
                color1={item.color1}
                color2={item.color2}
                title={item.title}
              />
            ))}
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
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: verticalScale(120),
  },
});

export default HomePage;
