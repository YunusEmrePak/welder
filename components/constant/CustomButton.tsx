import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  name?: string;
  iconDirection?: "left" | "right";
  bgColor?: string;
  textColor?: string;
  width: number | string;
  height: number | string;
  iconUrl?: ImageSourcePropType;
  disabled?: boolean;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  name = "",
  iconDirection = "right",
  bgColor = "#E56E1E",
  textColor = "#fff",
  iconUrl,
  width,
  height,
  disabled = false,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        {
          justifyContent: "center",
          alignItems: "center",
          opacity: disabled ? 0.5 : 1,
          backgroundColor: bgColor,
          width,
          height,
        } as ViewStyle,
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
    width: horizontalScale(21),
    height: verticalScale(21),
    marginLeft: verticalScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomButton;
