import type { dashboardReducer, IDashboardChartData, IDashboardData } from "@/utils/types";
import {
  DASHBOARD_API_ERROR,
  DASHBOARD_CHART,
  DASHBOARD_FETCH,
  DASHBOARD_INIT,
} from "../Actions/DashboardAction";

const dashboardInitialState: dashboardReducer = {
  dashboardData:  {} as IDashboardData,
  chartData: {} as IDashboardChartData,
  loading: false,
  initialized: false,
};

const dashboardReducer = (state = dashboardInitialState, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case DASHBOARD_INIT:
      return {
        ...state,
        loading: true,
      };

    case DASHBOARD_FETCH:
      return {
        ...state,
        loading: false,
        initialized: true,
        dashboardData: payload,
      };

      case DASHBOARD_CHART:
        return {
          ...state,
          loading: false,
          initialized: true,
          chartData: payload,
        };

    case DASHBOARD_API_ERROR:
      return {
        ...state,
        loading: false,
        initialized: true,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
