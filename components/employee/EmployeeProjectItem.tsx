import { Project } from "@/entity/project";
import { useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { formatMoney } from "@/utils/formatMoney";
import { StyleSheet, Text, View } from "react-native";

type ProjectProps = {
  item: ProjectDetailEmployeeDto;
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

const EmployeeProjectItem: React.FC<ProjectProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={[styles.container]}>
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
          <Text style={styles.title}>Ödenen Miktar </Text>
          <Text
            style={[styles.value, styles.valueNumber]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formatMoney(item.paid_amount)}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Çalışılan Gün Sayısı </Text>
          <Text
            style={[styles.value, styles.valueNumber]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formatMoney(item.worked_day)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(90),
    backgroundColor: "#fff",
    width: "95%",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(1),
    paddingHorizontal: horizontalScale(8),
    marginBottom: moderateScale(10),
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

export default EmployeeProjectItem;
