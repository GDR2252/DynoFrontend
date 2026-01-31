import axiosBaseApi from "@/axiosConfig";

export const getApiServices = async () => {
  try {
    const res = await axiosBaseApi.get("status");
    return res.data.data.services;
  } catch (err) {
    console.log(err || "Error fetching services");
  }
};

export const getApiIncidents = async () => {
  try {
    const res = await axiosBaseApi.get("status/incidents");
    return res.data.data.incidents;
  } catch (err) {
    console.log(err || "Error fetching incidents");
  }
};

export const getUptimeData = async () => {
  try {
    const res = await axiosBaseApi.get("status/uptime");
    return res.data.data.daily_status;
  } catch (err) {
    console.log(err || "Error fetching uptime");
  }
};
