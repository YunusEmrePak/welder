import React from "react";
import { moderateScale, verticalScale } from "@/themes/Metrics";
import { StyleSheet, Text, View } from "react-native";

const Topbar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: verticalScale(50),
    width: "100%",
    padding: moderateScale(10),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: moderateScale(20)
  },
});

export default Topbar;
