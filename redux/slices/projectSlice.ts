import { Project } from "@/entity/project";
import { listProject } from "@/services/projectService";
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectState {
  projectList: Project[];
}

const initialState: ProjectState = {
  projectList: [],
};

// export const getOrdersList = createAsyncThunk<OrderListResponse>(
//   "orderListk",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get<OrderListResponse>(`order/list`);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       if (!axiosError.response) {
//         throw axiosError;
//       }
//       return rejectWithValue(axiosError.response.data);
//     }
//   }
// );

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setProjectList: (state) => {
      state.projectList = listProject();
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
