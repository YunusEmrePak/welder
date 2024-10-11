import { Employee } from "@/entity/employee";
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

type EmployeeProps = {
  item: Employee;
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

const EmployeeItem: React.FC<EmployeeProps> = ({ item }) => {
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
      router.push(`/employee/${item.id}`);
    } else {
      console.error("Invalid employee ID:", item.id);
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
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.column, styles.column1]}>
          <View style={styles.item}>
            <Text style={styles.title}>İsim Soyisim </Text>
            <Text
              style={[styles.value, styles.valueName]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name_surname}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Toplam Çalıştığı Gün Sayısı</Text>
            <Text
              style={[styles.value, styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.total_worked_day}
            </Text>
          </View>
        </View>
        <View style={[styles.column, styles.column2]}>
          <View style={styles.item}>
            <Text style={styles.title}>Günlük Kazanç </Text>
            <Text
              style={[styles.value, styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatMoney(item.daily_pay)}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Kazanılan Miktar</Text>
            <Text
              style={[styles.value, styles.valueNumber]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatMoney(item.total_paid_amount)}
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
    backgroundColor: "#d9d9d9",
  },
  item: {
    alignItems: "flex-start",
    paddingLeft: horizontalScale(20),
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
    width: "50%",
  },
  column2: {
    width: "50%",
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

export default EmployeeItem;
