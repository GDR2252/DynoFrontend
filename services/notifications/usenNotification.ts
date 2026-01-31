import axiosBaseApi from "@/axiosConfig";


export interface NotificationPreferences {
  browser_notifications: boolean;
  company_id: string | null;
  email_notifications: boolean;
  is_default: boolean;
  payment_pending: boolean;
  payment_received: boolean;
  security_alerts: boolean;
  sms_notifications: boolean;
  transaction_updates: boolean;
  user_id: number;
  weekly_summary: boolean;
}

export const getNotifications = async () => {
  try {
    const res = await axiosBaseApi.get("notifications/preferences");
    return res.data.data;
  } catch (err) {
    console.log(err || "Error fetching notifications");
  }
};

export const updateNotifications = async (data: NotificationPreferences) => {
  try {
    const res = await axiosBaseApi.put("notifications/preferences", data);
    return res.data.data;
  } catch (err) {
    console.log(err || "Error updating notifications");
  }
};