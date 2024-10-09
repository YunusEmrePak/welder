import React, { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../constant/CustomButton";
import { formatMoney } from "@/utils/formatMoney";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { RootState, useAppDispatch } from "@/store";
import { projectActions } from "@/redux/slices/projectSlice";
import { animateMoneyText } from "@/utils/animateText";
import { employeeActions } from "@/redux/slices/employeeSlice";
import EmployeeProjectList from "./EmployeeProjectList";

const EmployeeDetail = () => {
  const dispatch = useAppDispatch();

  const { employeeDetailInformation } = useSelector(
    (state: RootState) => state.employee
  );

  const openUpdateEmployeeModal = () => {
    dispatch(employeeActions.setEmployeeUpdateModalVisible());
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.customerContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require("@/assets/icons/user.png")}
            style={styles.titleIcon}
          />
          <Text style={[styles.text, styles.titleText]}>
            {employeeDetailInformation?.name_surname}
          </Text>
        </View>

        <View style={styles.moneyContainer}>
          <View style={[styles.row]}>
            <View style={[styles.col]}>
              <Text style={styles.moneyTitle}>Günlük Kazanç:</Text>
              <Text style={[styles.moneyText]}>
                {formatMoney(employeeDetailInformation?.daily_pay)}
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={[styles.col]}>
              <Text style={styles.moneyTitle}>Toplam Ödenen Miktar:</Text>
              <Text style={[styles.moneyText]}>
                {formatMoney(employeeDetailInformation?.total_paid_amount)}
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={[styles.col]}>
              <Text style={styles.moneyTitle}>
                Toplam Çalıştığı Gün Sayısı:
              </Text>
              <Text style={[styles.moneyText]}>
                {employeeDetailInformation?.total_worked_day}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            name="Güncelle"
            onClick={openUpdateEmployeeModal}
            iconUrl={require("@/assets/icons/pen.png")}
            width={horizontalScale(140)}
            height={verticalScale(45)}
          />
        </View>
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
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    backgroundColor: "#d9d9d9",
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
    marginLeft: horizontalScale(10),
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(20),
  },
  col: {
    flexDirection: "row",
    alignItems: "center",
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

export default EmployeeDetail;
