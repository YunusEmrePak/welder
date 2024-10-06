import { Project } from "@/entity/project";
import { listProject } from "@/services/projectService";
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectState {
  projectList: Project[];
  isModalVisible: boolean;
}

const initialState: ProjectState = {
  projectList: [],
  isModalVisible: false,
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setProjectList: (state) => {
      state.projectList = listProject();
    },
    setProjectAddModalVisible: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(getOrdersList.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.orderList = action.payload.data;
  //       })
  //       .addCase(getOrdersList.pending, (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(getOrdersList.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.error.message || "Error fetching filtered data";
  //       });
  //   },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
