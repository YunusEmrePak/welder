import { Tabs, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useCallback } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { createTables } from "@/database/database";
import { useAppDispatch } from "@/store";
import { dashboardActions } from "@/redux/slices/dashboardSlice";

export default function TabLayout() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    createTables();
  }, []);

  const handlePanelTabPress = useCallback(() => {
    dispatch(dashboardActions.setTotalMoneyAndProjects());

    router.push(`/(tabs)/`);
  }, [navigation]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["dark"].tint,
        headerShown: false,
        tabBarActiveBackgroundColor: Colors["dark"].background,
        tabBarInactiveBackgroundColor: Colors["dark"].background,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Panel",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default behavior
            e.preventDefault();
            // Call your custom function
            handlePanelTabPress();
          },
        }}
      />
      <Tabs.Screen
        name="projectList"
        options={{
          title: "Proje Listesi",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="employeeList"
        options={{
          title: "Çalışan Listesi",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ayarlar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
