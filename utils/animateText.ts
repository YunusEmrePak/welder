import { Animated } from "react-native";

export const animateMoneyText = (scaleAnimation: Animated.Value) => {
  Animated.sequence([
    Animated.timing(scaleAnimation, {
      toValue: 1.2,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }),
  ]).start();
};
