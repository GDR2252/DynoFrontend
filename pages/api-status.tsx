import useIsMobile from "@/hooks/useIsMobile";
import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { homeTheme } from "@/styles/homeTheme";
import {
  SuccessChip,
  TypographyDescription,
  TypographyTime,
  TypographyTitle,
} from "@/Components/UI/HomeCard/styled";
import successIcon from "@/assets/Icons/home/success.svg";
import serviceIcon from "@/assets/Icons/home/service.svg";
import Image from "next/image";
import { getApiIncidents, getApiServices, getUptimeData } from "@/services/api-status/getApiStatus";
import { theme } from "@/styles/theme";

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

export interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  date: string;
  formatted_date: string;
  services_affected: string[];
}

export interface UptimeData {
  date: string;
  status: string;
}

const ApiStatus = () => {

  const isMobile = useIsMobile();
  const [services, setServices] = useState<ServiceApiItem[] | null>(null);
  const [serviceLoading, setServiceLoading] = useState<boolean>(true);

  const [incidents, setIncidents] = useState<Incident[] | null>(null);
  const [incidentLoading, setIncidentLoading] = useState<boolean>(true);

  const [uptime, setUptime] = useState<UptimeData[] | null>(null);
  const [uptimeLoading, setUptimeLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchServices() {
      setServiceLoading(true);
      try {
        const data = await getApiServices();
        setServices(data);
      } finally {
        setServiceLoading(false);
      }
    }
    fetchServices();
  }, [])

  useEffect(() => {
    async function fetchIncidents() {
      setIncidentLoading(true);
      try {
        const data = await getApiIncidents();
        setIncidents(data);
      } finally {
        setIncidentLoading(false);
      }
    }
    fetchIncidents();
  }, [])

  useEffect(() => {
    async function fetchUptime() {
      setUptimeLoading(true);
      try {
        const data = await getUptimeData();
        setUptime(data);
      } finally {
        setUptimeLoading(false);
      }
    }
    fetchUptime();
  }, [])

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 768,
        maxWidth: "100%",
        minWidth: 320,
        px: "24px",
        mx: "auto",
        pt: isMobile ? "113px" : "128px",
        mb: isMobile ? 6 : "93px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "23px" : "48px",
      }}
    >
      {/* STATUS */}
      <Box
        height={134}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SuccessChip>
          <Image src={successIcon} alt="success" width={24} height={24} />
          <Typography
            sx={{
              fontWeight: 600,
              color: homeTheme.palette.success.main,
              fontFamily: "OutfitSemiBold",
              lineHeight: "24px",
              letterSpacing: 0,
            }}
          >
            All Systems Operational
          </Typography>
        </SuccessChip>

        <Typography
          sx={{
            mt: "16px",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "36px",
            fontFamily: "OutfitBold",
            color: "#131520",
            letterSpacing: 0,
          }}
        >
          DynoPay Status
        </Typography>

        <Typography
          sx={{
            mt: "8px",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: 0,
            fontFamily: "OutfitRegular",
            color: "#676B7E",
          }}
        >
          Current status of all DynoPay services
        </Typography>
      </Box>

      {/* SERVICES */}
      <Box
        width="100%"
        height={isMobile ? 455 : 343}
        sx={{
          border: "1px solid #E7E8EF",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          height={57}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            pl: "24px",
          }}
        >
          <Image src={serviceIcon} alt="service" width={20} height={20} />
          <TypographyTitle>Services</TypographyTitle>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {serviceLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={i}
                  height={isMobile ? 79 : 57}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: "24px",
                    borderTop: "1px solid #E7E8EF",
                  }}
                >
                  <Box
                    width={isMobile ? 120 : "auto"}
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width={90} height={24} />
                  </Box>

                  <Box
                    width={isMobile ? 141 : 182}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      ml: "auto",
                    }}
                  >
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={60} height={20} />
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            services?.map((service, index) => (
              <Box
                key={index}
                height={isMobile ? 79 : 57}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: "24px",
                  borderTop: "1px solid #E7E8EF",
                }}
              >
                <Box
                  width={isMobile ? 120 : "auto"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Image
                    src={successIcon}
                    alt={service.name}
                    width={isMobile ? 19.02 : 20}
                    height={20}
                  />
                  <Typography
                    sx={{
                      fontFamily: "OutfitRegular",
                      lineHeight: "24px",
                      letterSpacing: 0,
                      color: "#131520",
                    }}
                  >
                    {service.name}
                  </Typography>
                </Box>

                <Box
                  width={isMobile ? 141 : 182}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    ml: "auto",
                  }}
                >
                  <TypographyDescription>
                    {service.uptime} uptime
                  </TypographyDescription>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: 0,
                      fontFamily: "OutfitRegular",
                      color: homeTheme.palette.success.main,
                    }}
                  >
                    {service.status}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Box
        height={146}
        width={"100%"}
        sx={{ border: "1px solid", borderColor: homeTheme.palette.border.main, borderRadius: "16px", p: "24px" }}
      >
        <TypographyTitle>90-Day Uptime</TypographyTitle>
        <Box sx={{ display: "flex", gap: "2px", mt: "16px" }}>
          {uptimeLoading
            ? Array.from({ length: 90 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={5.47}
                height={32}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: theme.palette.grey[300],
                }}
              />
            ))
            : uptime?.map((item) => (
              <Box
                key={item.date}
                sx={{
                  width: "5.47px",
                  height: "32px",
                  background: item.status === "operational" ? homeTheme.palette.success.light : item.status === "degraded" ? theme.palette.error.main : theme.palette.border.main,
                  borderRadius: "20px",
                }}
              />
            ))}
        </Box>
        <Box
          sx={{ mt: "8px", display: "flex", justifyContent: "space-between" }}
        >
          <TypographyTime>90 days ago</TypographyTime>
          <TypographyTime>Today</TypographyTime>
        </Box>
      </Box>

      <Box
        height={328}
        width={"100%"}
        sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TypographyTitle>Recent Incidents</TypographyTitle>

        {incidentLoading ? (
          <>
            {Array.from({ length: 2 }).map((_, i) => (
              <Box
                key={i}
                height={isMobile ? 156 : 136}
                sx={{
                  border: "1px solid #E7E8EF",
                  borderRadius: "16px",
                  p: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width={80} height={20} />
                </Box>

                <Skeleton variant="text" width="100%" height={20} />

                <Skeleton variant="text" width={80} height={20} />
              </Box>
            ))}
          </>
        ) : (
          incidents?.map((incident, index) => (
            <Box
              key={index}
              height={isMobile ? 156 : 136}
              sx={{
                border: "1px solid #E7E8EF",
                borderRadius: "16px",
                p: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontFamily: "OutfitMedium",
                    fontWeight: 500,
                    lineHeight: "24px",
                    letterSpacing: 0,
                    color: "#131520",
                  }}
                >
                  {incident.title}
                </Typography>
                <TypographyTime>{incident.formatted_date}</TypographyTime>
              </Box>
              <TypographyDescription>
                {incident.description}
              </TypographyDescription>
              <Box
                height={26}
                width={64}
                sx={{
                  px: "8px",
                  pt: "6px",
                  pb: "4px",
                  backgroundColor: "#22C55E1A",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontFamily: "OutfitRegular",
                    fontWeight: 400,
                    lineHeight: "16px",
                    letterSpacing: 0,
                    color: homeTheme.palette.success.main,
                  }}
                >
                  Resolved
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ApiStatus;
