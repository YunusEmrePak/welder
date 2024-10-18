import { RootState, useAppDispatch } from "@/store";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/themes/Metrics";
import { formatMoney } from "@/utils/formatMoney";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSelector } from "react-redux";

type TotalAndProjectsProps = {
  item: number;
  iconUrl?: ImageSourcePropType;
  color1: string;
  color2: string;
  title: string;
  index: number;
};

const DashboardTotalMoneyItem: React.FC<TotalAndProjectsProps> = ({
  item,
  iconUrl,
  color1,
  color2,
  title,
  index,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { totalAndProject } = useSelector(
    (state: RootState) => state.dashboard
  );

  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index+1 * 200)
        .springify()}
    >
      <LinearGradient
        style={[styles.container]}
        colors={[color1, color2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.item, styles.iconItem]}>
          <Image style={styles.icon} source={iconUrl} />
        </View>
        <View style={[styles.item, styles.item1]}>
          <Text style={styles.title}>{title} </Text>
          <Text
            style={[styles.valueName]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item !== null ? formatMoney(item) : "0₺"}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: verticalScale(115),
    borderRadius: moderateScale(10),
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
  icon: {
    width: horizontalScale(50),
    height: verticalScale(50),
    marginLeft: horizontalScale(25),
  },
  iconItem: {
    width: "40%",
    height: "auto",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    // width: "40%",
    // height: "100%",
  },
  item1: {
    // backgroundColor: "red",
    width: "60%",
    height: verticalScale(70),
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(20),
  },
  valueName: {
    color: "#fff",
    fontSize: moderateScale(26),
  },
});

export default DashboardTotalMoneyItem;
