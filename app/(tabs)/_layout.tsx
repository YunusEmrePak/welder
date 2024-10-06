import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { createTables, dropTables } from "@/database/database";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { addProject } from "@/services/projectService";
import { UpdateProjectDto } from "@/dto/update/updateProjectDto";
import { done } from "@/enum/status";

const projectDto: AddProjectDto = {
  title: "dis kapi",
  detail: "6x2 metal dis kapi",
  customer: "yunus emre",
  price: 6000,
  material_cost: 1500,
  paid_amount: 6000,
};

const updateProjectDto: UpdateProjectDto = {
  id: 2,
  title: "Bahçe Kapısı",
  detail: null,
  customer: "Ali Gülüm",
  status: done,
  price: 120000,
  material_cost: 80000,
  paid_amount: 20000,
};

export default function TabLayout() {
  useEffect(() => {
    createTables();

    // addProject(projectDto);
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["dark"].tint,
        headerShown: false,
        tabBarActiveBackgroundColor: Colors["dark"].background,
        tabBarInactiveBackgroundColor: Colors["dark"].background,
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
          title: "İşçi Listesi",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
