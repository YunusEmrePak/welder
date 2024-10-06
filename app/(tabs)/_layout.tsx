import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { createTables, dropTables } from "@/database/database";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { addProject, updateProject } from "@/services/projectService";
import { updateEmployee } from "@/services/employeeService";
import { UpdatedEmployeeDto } from "@/dto/update/updateEmployeeDto";
import { UpdateProjectDto } from "@/dto/update/updateProjectDto";
import { renderTable } from "@/utils/renderTable";
import { cancelled, done, inProgress, notStarted } from "@/enum/status";

const projectDto: AddProjectDto = {
  title: "dis kapi",
  detail: "6x2 metal dis kapi",
  customer: "yunus emre",
  price: 6000,
  material_cost: 1500,
  paid_amount: 6000,
};

const updateProjectDto: UpdateProjectDto = {
  id: 1,
  title: "Ev kapisi",
  detail: null,
  customer: "Mehmet Subasi",
  status: inProgress,
  price: 1000,
  material_cost: 500,
  paid_amount: 500,
};

export default function TabLayout() {
  useEffect(() => {
    createTables();

    // updateProject(updateProjectDto)
    // updateEmployee(updateEmployeeDto)
    // addProject(projectDto);
    // renderTable();
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
