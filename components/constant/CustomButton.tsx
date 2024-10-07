import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ViewStyle,
} from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";

interface CustomButtonProps {
  name: string;
  iconDirection?: "left" | "right";
  bgColor?: string;
  textColor?: string;
  width: number | string;
  height: number | string;
  iconUrl?: ImageSourcePropType;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  name,
  iconDirection = "right",
  bgColor = "#E56E1E",
  textColor = "#fff",
  iconUrl,
  width,
  height,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={
        {
          width,
          justifyContent: "center",
          alignItems: "center",
        } as ViewStyle
      }
    >
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: bgColor, width, height } as ViewStyle,
        ]}
      >
        {iconDirection === "left" && iconUrl && (
          <Image source={iconUrl} style={styles.icon} />
        )}
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor,
            },
          ]}
        >
          {name}
        </Text>
        {iconDirection === "right" && iconUrl && (
          <Image source={iconUrl} style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: moderateScale(10),
    elevation: 3,
  },
  buttonText: {
    fontSize: moderateScale(18),
    color: "#fff",
  },
  icon: {
    width: horizontalScale(22),
    height: verticalScale(22),
    marginLeft: verticalScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomButton;
