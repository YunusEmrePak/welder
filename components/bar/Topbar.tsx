import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { Image, StyleSheet, Text, View } from "react-native";

// import Logo from "@/assets/icons/welder.png";

const Topbar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require("@/assets/icons/welder_trans.png")}
          alt="Logo"
          style={styles.logo}
        />
        <Text style={styles.text}>Welder</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E56E1E",
    height: verticalScale(80),
    width: "100%",
    paddingHorizontal: horizontalScale(15),
    paddingTop: verticalScale(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: moderateScale(20),
    marginLeft: horizontalScale(10),
  },
  logo: {
    width: horizontalScale(32),
    height: verticalScale(32),
  },
  logo2: {
    width: horizontalScale(20),
    height: verticalScale(28),
  },
});

export default Topbar;
