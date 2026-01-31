import axiosBaseApi from "@/axiosConfig";
import { useEffect, useState } from "react";

export interface ServiceStatus {
  name: string;
  status: string;
  uptime: string;
}

interface ServiceApiItem {
  id: string;
  name: string;
  status: string;
  uptime: string;
  uptime_value: number;
  latency_ms: number;
  total_checks: number;
  failed_checks: number;
  last_check: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface ApiData {
  services: ServiceApiItem[];
}

export interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  date: string;
  formatted_date: string;
  services_affected: string[];
}

interface IncidentsData {
  total: number;
  incidents: Incident[];
}

export interface UptimeSummary {
  operational_days: number;
  degraded_days: number;
  outage_days: number;
}

export interface DailyStatus {
  date: string;
  status: string;
}

export interface UptimeData {
  period_days: number;
  uptime_percentage: string;
  summary: UptimeSummary;
  daily_status: DailyStatus[];
}

export interface DailyStatus {
  date: string;
  status: string;
}

export const useApiServices = () => {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [serviceLoading, setServiceLoading] = useState<boolean>(true);
  const [serviceError, setServiceError] = useState<any>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setServiceLoading(true);
      setServiceError(null);

      try {
        const response = await axiosBaseApi.get<ApiResponse<ApiData>>("status");

        const filtered = response.data.data.services.map((service) => ({
          name: service.name,
          status: service.status,
          uptime: service.uptime,
        }));

        setServices(filtered);
      } catch (err) {
        setServiceError(err);
      } finally {
        setServiceLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, serviceLoading, serviceError };
};

export const useApiIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [incidentLoading, setIncidentLoading] = useState<boolean>(true);
  const [incidentError, setIncidentError] = useState<any>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      setIncidentLoading(true);
      setIncidentError(null);

      try {
        const response =
          await axiosBaseApi.get<ApiResponse<IncidentsData>>(
            "status/incidents",
          );

        setIncidents(response.data.data.incidents);
      } catch (err) {
        setIncidentError(err);
      } finally {
        setIncidentLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return { incidents, incidentLoading, incidentError };
};

export const useUptimeData = () => {
  const [uptime, setUptime] = useState<DailyStatus[] | null>(null);
  const [uptimeLoading, setUptimeLoading] = useState<boolean>(true);
  const [uptimeError, setUptimeError] = useState<any>(null);

  useEffect(() => {
    const fetchUptime = async () => {
      setUptimeLoading(true);
      setUptimeError(null);

      try {
        const response =
          await axiosBaseApi.get<ApiResponse<UptimeData>>("status/uptime");

        setUptime(response.data.data.daily_status);
      } catch (err) {
        setUptimeError(err);
      } finally {
        setUptimeLoading(false);
      }
    };

    fetchUptime();
  }, []);

  return { uptime, uptimeLoading, uptimeError };
};
