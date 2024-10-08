import { Project } from "@/entity/project";
import { projectActions } from "@/redux/slices/projectSlice";
import { useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { formatMoney } from "@/utils/formatMoney";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ProjectProps = {
  item: Project;
};

const bgColor = {
  notStarted: "#d9d9d9",
  inProgress: "#d4f3fc",
  done: "#d4fce0",
  cancelled: "#fcd4d4",
};

const statusMessage = {
  notStarted: "Başlanmadı",
  inProgress: "Devam Ediyor",
  done: "Bitti",
  cancelled: "İptal Edildi",
};

const ProjectItem: React.FC<ProjectProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [scaleAnim] = useState(new Animated.Value(1));
  const router = useRouter();

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (typeof item.id === "number") {
      router.push(`/project/${item.id}`);
    } else {
      console.error("Invalid project ID:", item.id);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor:
              bgColor[item.status as keyof typeof bgColor] ||
              bgColor.notStarted,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.column, styles.column1]}>
          <View style={styles.item}>
            <Text style={styles.title}>Başlık </Text>
            <Text
              style={[styles.value, styles.valueName]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Müşteri </Text>
            <Text
              style={[styles.value, styles.valueName]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.customer}
            </Text>
          </View>
        </View>
        <View style={[styles.column, styles.column2]}>
          <View style={styles.item}>
            <Text style={styles.title}>Fiyat </Text>
            <Text
              style={[styles.value, styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatMoney(item.price)}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Borç </Text>
            <Text
              style={[
                styles.value,
                styles.valueNumber,
                {
                  color: item.debt_amount === 0 ? "green" : "#e37500",
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatMoney(item.debt_amount)}
            </Text>
          </View>
        </View>
        <View style={[styles.column, styles.column3]}>
          <View style={styles.itemStatus}>
            <Text
              style={[
                styles.valueStatus,
                {
                  color: item.status === "cancelled" ? "red" : "#000",
                },
              ]}
            >
              {statusMessage[item.status as keyof typeof statusMessage] ||
                statusMessage.notStarted}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(90),
    width: "95%",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(1),
    paddingHorizontal: horizontalScale(8),
    marginTop: moderateScale(10),
    flexDirection: "row",
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
  item: {
    alignItems: "flex-start",
  },
  itemStatus: {
    alignItems: "flex-start",
    width: "auto",
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(15),
  },
  column: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: verticalScale(85),
  },
  column1: {
    width: "45%",
    paddingRight: horizontalScale(3),
  },
  column2: {
    width: "25%",
  },
  column3: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    color: "#000",
    fontSize: moderateScale(10),
  },
  value: {
    color: "#000",
    fontSize: moderateScale(17),
  },
  valueStatus: {
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  valueName: {
    minWidth: "100%",
  },
  valueNumber: {
    minWidth: "100%",
  },
});

export default ProjectItem;
