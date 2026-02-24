import CustomButton from "@/Components/UI/Buttons";
import CustomSwitch from "@/Components/UI/CustomSwitch";
import PanelCard from "@/Components/UI/PanelCard";
import { theme } from "@/styles/theme";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";

import BellIcon from "@/assets/Icons/bell-icon.svg";
import EnvelopeIcon from "@/assets/Icons/envelope-icon.svg";
import MobileIcon from "@/assets/Icons/mobile-icon.svg";
import Toast from "@/Components/UI/Toast";
import useIsMobile from "@/hooks/useIsMobile";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface NotificationItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  showDivider?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  checked,
  onChange,
  showDivider = true,
}) => {
  const isMobile = useIsMobile("md");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: "13px", md: "15px" },
              fontWeight: 700,
              fontFamily: "UrbanistBold",
              color: theme.palette.text.primary,
              mb: isMobile ? "9px" : 1,
              lineHeight: 1.2,
              letterSpacing: 0,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "13px", md: "15px" },
              fontFamily: "UrbanistMedium",
              color: theme.palette.text.primary,
              lineHeight: 1.2,
            }}
          >
            {description}
          </Typography>
        </Box>
        <CustomSwitch
          checked={checked}
          onChange={(e, checked) => onChange(checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      </Box>
      {showDivider && (
        <Divider
          sx={{
            borderColor: theme.palette.border.main,
            my: 0,
          }}
        />
      )}
    </>
  );
};

const NotificationPage = () => {
  const namespaces = ["notifications"];
  const { t } = useTranslation(namespaces);
  const tNotifications = useCallback(
    (key: string) => t(key, { ns: "notifications" }),
    [t],
  );
  const isMobile = useIsMobile("md");

  // Transaction Alerts state
  const [transactionUpdates, setTransactionUpdates] = useState(true);
  const [paymentReceived, setPaymentReceived] = useState(false);

  // Weekly Reports state
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(false);

  // Email Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const [openToast, setOpenToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log("Saving notification preferences...");

    setOpenToast(false);

    setTimeout(() => {
      setOpenToast(true);
    }, 0);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setOpenToast(false);
    }, 2000);
  };

  return (
    <Box>
      <Grid container spacing={2.5}>
        {/* Left Column - Two Cards Stacked */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Transaction Alerts Card */}
            <PanelCard
              headerSx={{ fontSize: { xs: "15px", md: "20px" } }}
              subTitleSx={{
                fontSize: { xs: "13px", md: "15px" },
                color: theme.palette.text.primary,
              }}
              titleGap={{ gap: isMobile ? "12.41px" : "12px" }}
              title={tNotifications("transactionAlertsTitle")}
              subTitle={tNotifications("transactionAlertsSubtitle")}
              showHeaderBorder={false}
              headerPadding={
                isMobile
                  ? theme.spacing(2, 2, 0, 2)
                  : theme.spacing(2.5, 2.5, 0, 2.5)
              }
              bodyPadding={
                isMobile
                  ? theme.spacing(0, 2, 2, 2)
                  : theme.spacing(0, "18px", 2.5, 2.5)
              }
              headerAction={
                <IconButton
                  sx={{
                    height: isMobile ? "32px" : "40px",
                    width: isMobile ? "32px" : "40px",
                    padding: "8px",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Image
                    src={BellIcon.src}
                    alt="bell-icon"
                    width={isMobile ? 14 : 20}
                    height={isMobile ? 14 : 20}
                    draggable={false}
                  />
                </IconButton>
              }
              sx={{ height: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "10px" : 2,
                  pt: { xs: 3, md: "46px" },
                }}
              >
                <NotificationItem
                  title={tNotifications("transactionUpdatesTitle")}
                  description={tNotifications("transactionUpdatesDescription")}
                  checked={transactionUpdates}
                  onChange={setTransactionUpdates}
                />
                <NotificationItem
                  title={tNotifications("paymentReceivedTitle")}
                  description={tNotifications("paymentReceivedDescription")}
                  checked={paymentReceived}
                  onChange={setPaymentReceived}
                  showDivider={false}
                />
              </Box>
            </PanelCard>

            {/* Weekly Reports Card */}
            <PanelCard
              headerSx={{ fontSize: { xs: "15px", md: "20px" } }}
              subTitleSx={{
                fontSize: { xs: "13px", md: "15px" },
                color: theme.palette.text.primary,
              }}
              titleGap={{ gap: isMobile ? "12.41px" : "12px" }}
              title={tNotifications("weeklyReportsTitle")}
              subTitle={tNotifications("weeklyReportsSubtitle")}
              showHeaderBorder={false}
              headerPadding={
                isMobile
                  ? theme.spacing(2, 2, 0, 2)
                  : theme.spacing(2.5, 2.5, 0, 2.5)
              }
              bodyPadding={
                isMobile
                  ? theme.spacing(0, 2, 2, 2)
                  : theme.spacing(0, "18px", 2.5, 2.5)
              }
              headerAction={
                <IconButton
                  sx={{
                    height: isMobile ? "32px" : "40px",
                    width: isMobile ? "32px" : "40px",
                    padding: "8px",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Image
                    src={MobileIcon.src}
                    alt="mobile-icon"
                    width={isMobile ? 14 : 20}
                    height={isMobile ? 14 : 20}
                    draggable={false}
                  />
                </IconButton>
              }
              sx={{ height: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "10px" : 2,
                  pt: { xs: 3, md: "46px" },
                }}
              >
                <NotificationItem
                  title={tNotifications("weeklySummaryTitle")}
                  description={tNotifications("weeklySummaryDescription")}
                  checked={weeklySummary}
                  onChange={setWeeklySummary}
                />
                <NotificationItem
                  title={tNotifications("securityAlertsTitle")}
                  description={tNotifications("securityAlertsDescription")}
                  checked={securityAlerts}
                  onChange={setSecurityAlerts}
                  showDivider={false}
                />
              </Box>
            </PanelCard>
          </Box>
        </Grid>

        {/* Right Column - Single Taller Card */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <PanelCard
              headerSx={{ fontSize: { xs: "15px", md: "20px" } }}
              subTitleSx={{
                fontSize: { xs: "13px", md: "15px" },
                color: theme.palette.text.primary,
              }}
              titleGap={{ gap: isMobile ? "12.41px" : "12px" }}
              title={tNotifications("emailNotificationsCardTitle")}
              subTitle={tNotifications("emailNotificationsCardSubtitle")}
              showHeaderBorder={false}
              bodyPadding={
                isMobile
                  ? theme.spacing(0, 2, 2, 2)
                  : theme.spacing(0, 2.5, 2.5, 2.5)
              }
              headerPadding={
                isMobile
                  ? theme.spacing(2, 2, 0, 2)
                  : theme.spacing(2.5, 2.5, 0, 2.5)
              }
              headerAction={
                <IconButton
                  sx={{
                    height: isMobile ? "32px" : "40px",
                    width: isMobile ? "32px" : "40px",
                    padding: "8px",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Image
                    src={EnvelopeIcon.src}
                    alt="envelope-icon"
                    width={isMobile ? 14 : 20}
                    height={isMobile ? 14 : 20}
                    draggable={false}
                  />
                </IconButton>
              }
              sx={{ height: "fit-content" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "10px" : 2,
                  pt: { xs: 3, md: "46px" },
                }}
              >
                <NotificationItem
                  title={tNotifications("emailNotificationsTitle")}
                  description={tNotifications("emailNotificationsDescription")}
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />
                <NotificationItem
                  title={tNotifications("smsNotificationsTitle")}
                  description={tNotifications("smsNotificationsDescription")}
                  checked={smsNotifications}
                  onChange={setSmsNotifications}
                />
                {/* Browser Notifications - Special Button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ flex: 1, pr: 2 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "13px", md: "15px" },
                        fontWeight: 700,
                        fontFamily: "UrbanistMedium",
                        color: theme.palette.text.primary,
                        mb: 1,
                        lineHeight: 1.2,
                        letterSpacing: 0,
                      }}
                    >
                      {tNotifications("browserNotificationsTitle")}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "13px", md: "15px" },
                        fontFamily: "UrbanistRegular",
                        color: theme.palette.text.primary,
                        lineHeight: 1.2,
                      }}
                    >
                      {tNotifications("browserNotificationsDescription")}
                    </Typography>
                  </Box>
                  <CustomButton
                    label={tNotifications("activate")}
                    variant="secondary"
                    size={isMobile ? "small" : "medium"}
                    sx={{ padding: isMobile ? "8px 10px" : "15px 24px" }}
                    endIcon={
                      <Box>
                        <ArrowOutwardIcon
                          style={{
                            height: "16px",
                            width: "16px",
                            marginTop: "2px",
                          }}
                        />
                      </Box>
                    }
                    onClick={() => {
                      console.log("Activating browser notifications...");
                    }}
                  />
                </Box>
              </Box>
            </PanelCard>

            <CustomButton
              label={tNotifications("saveChanges")}
              variant="primary"
              size={isMobile ? "small" : "medium"}
              fullWidth
              onClick={handleSaveChanges}
            />
          </Box>
        </Grid>
      </Grid>
      <Toast
        open={openToast}
        message={"Settings updated successfully!"}
        severity="success"
      />
    </Box>
  );
};

export default NotificationPage;
