export const DASHBOARD_INIT: any = "DASHBOARD_INIT";
export const DASHBOARD_FETCH = "DASHBOARD_FETCH";
export const DASHBOARD_CHART = "DASHBOARD_CHART";
export const DASHBOARD_API_ERROR = "DASHBOARD_API_ERROR";

export const DashboardAction = (type?: string, data?: any) => {
  return {
    type: DASHBOARD_INIT,
    crudType: type,
    payload: data,
  };
};
