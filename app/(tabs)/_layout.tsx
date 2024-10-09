import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { clearDb, createTables, dropTables } from "@/database/database";
import { AddProjectDto } from "@/dto/add/addProjectDto";
import { addProject, isProjectDeletable, listProjectByAssignedEmployee, makeProjectStatusCancelled, makeProjectStatusDone, makeProjectStatusInProgress, updateProject } from "@/services/projectService";
import { isEmployeeDeletable, listEmployeeByAssignedProjectId, listEmployeeWhoDoesNotWorkOnProject, updateEmployee } from "@/services/employeeService";
import { UpdatedEmployeeDto } from "@/dto/update/updateEmployeeDto";
import { UpdateProjectDto } from "@/dto/update/updateProjectDto";
import { renderTable } from "@/utils/renderTable";
import { done, inProgress, notStarted } from "@/enum/status";
import { assignEmployeeToProject, decreaseWorkedDayEmployeeProject, dismissEmployeeFromProject, increaseWorkedDayEmployeeProject } from "@/services/employeeProjectService";
import { numberOfCancelledProjects, numberOfDoneProjects, numberOfInProgressProjects, numberOfNotStartedProjects, totalCollectedMoney, totalDebt, totalMaterialCost, totolEmployeeCost } from "@/services/dashboardService";
import { increaseWorkedDayEmployeeProjectDb } from "@/database/employeeProjectDb";

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
  customer: "Mahmut Kara",
  status: inProgress,
  price: 6000,
  material_cost: 1500,
  paid_amount: 6000,
};

export default function TabLayout() {
  useEffect(() => {
    // clearDb();
    // dropTables();
    createTables();


    // renderTable();
    // console.log("Total collected money: ", totalCollectedMoney())
    // console.log("Total Debt: ", totalDebt())
    // console.log("Total Material Cost: ", totalMaterialCost())
    // console.log("Total Material Cost: ", totalMaterialCost())
    // console.log("Total Employee Cost: ", totolEmployeeCost())

    // console.log("Number of not started: ", numberOfNotStartedProjects())
    // console.log("Number of in progress: ", numberOfInProgressProjects())
    // console.log("Number of done: ", numberOfDoneProjects())
    // console.log("Number of canceled: ", numberOfCancelledProjects())
  }, []);

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
