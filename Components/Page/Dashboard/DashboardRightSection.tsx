import React, { useCallback, useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import PanelCard from "@/Components/UI/PanelCard";
import CustomButton from "@/Components/UI/Buttons";
import {
  ArrowOutward,
  CheckCircle,
  WorkspacePremium,
} from "@mui/icons-material";
import { theme } from "@/styles/theme";
import FeeTierProgress from "./FeeTierProgress";
import useIsMobile from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import CurrencyIcon from "@/assets/Icons/dollar-sign-icon.svg";
import CheckCircleIcon from "@/assets/Icons/correct-icon.png";
import BgImage from "@/assets/Images/bg-white.png";
import CrownIcon from "@/assets/Icons/premium-icon.svg";
import { formatNumberWithComma, getCurrencySymbol } from "@/helpers";
import { PremiumTierCard } from "./styled";
import ReferralAndKnowledge from "@/Components/Layout/ReferralAndKnowledge";

const DashboardRightSection = () => {
  const themeHook = useTheme();
  const namespaces = ["dashboardLayout", "common"];

  const isMobile = useIsMobile("md");
  const { t } = useTranslation(namespaces);
  const tDashboard = useCallback(
    (key: string) => t(key, { ns: "dashboardLayout" }),
    [t]
  );

  const [monthlyLimit, setMonthlyLimit] = useState(50000);
  const [usedAmount, setUsedAmount] = useState(6479.25);
  const [currentTier, setCurrentTier] = useState("Standard");

  // Validation: Ensure usedAmount doesn't exceed monthlyLimit
  useEffect(() => {
    if (usedAmount > monthlyLimit) {
      setUsedAmount(monthlyLimit);
    }
  }, [monthlyLimit, usedAmount]);

  return (
    <Box>
      {/* Fee Tier Progress */}
      <PanelCard
        title={tDashboard("feeTierProgress")}
        subTitle={tDashboard("yourProgressTowardsTheNextFeeTier")}
        showHeaderBorder={false}
        headerPadding={theme.spacing(2.5, 1.5, 0, 2.5)}
        bodyPadding={theme.spacing("26px", 2.5, 2.5, 2.5)}
        headerAction={
          <IconButton
            sx={{
              padding: "8px",
              width: isMobile ? "32px" : "40px",
              height: isMobile ? "32px" : "40px",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <Image
              src={CurrencyIcon}
              alt="Currency Icon"
              width={18}
              height={18}
              style={{
                width: "clamp(14px, 2vw, 18px)",
                height: "auto",
              }}
              draggable={false}
            />
          </IconButton>
        }
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: isMobile ? "10px" : "13px",
                color: themeHook.palette.text.secondary,
                fontFamily: "UrbanistMedium",
                fontWeight: 500,
                lineHeight: "100%",
              }}
            >
              {tDashboard("monthlyVolume")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "UrbanistMedium",
              }}
            >
              <Box component="span"
                style={{
                  fontSize: isMobile ? "13px" : "15px",
                  color: themeHook.palette.text.primary,
                  fontWeight: 500,
                }}
              >
                {getCurrencySymbol("USD", formatNumberWithComma(usedAmount))}
              </Box>
              <Box
                component="span"
                sx={{
                  px: "6px",
                  fontSize: isMobile ? "10px" : "13px",
                  color: theme.palette.text.secondary,
                }}
              >
                /
              </Box>
              <Box component="span"
                sx={{
                  fontSize: isMobile ? "10px" : "13px",
                  color: themeHook.palette.text.secondary,
                }}
              >
                {getCurrencySymbol("USD", monthlyLimit?.toLocaleString())}
              </Box>
            </Typography>
          </Box>

          {/* Fee Tier Progress */}
          <FeeTierProgress
            monthlyLimit={monthlyLimit}
            usedAmount={usedAmount}
            currentTier="Standard"
          />

          {/* Current Tier Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: 0.75,
              px: 1.5,
              py: 1.4,
              borderRadius: "100px",
              background: theme.palette.success.main,
              border: `1px solid ${theme.palette.success.light}`,
            }}
          >
            <Typography
              sx={{
                fontSize: isMobile ? "13px" : "15px",
                fontWeight: 500,
                color: theme.palette.success.dark,
                fontFamily: "UrbanistMedium",
                lineHeight: "100%",
                letterSpacing: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {tDashboard("currentTier")}:
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Image
                  src={CheckCircleIcon}
                  alt="Check Circle Icon"
                  width={16}
                  height={16}
                  draggable={false}
                />
                {currentTier}
              </Box>
            </Typography>
          </Box>
          {/* Upgrade to Premium Tier */}
          <PremiumTierCard
            sx={{
              position: "relative",
              marginTop: isMobile ? "12px" : "16px",
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "6px",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                maxWidth: "310px",
                height: "100%",
              }}
            >
              <Image
                src={BgImage}
                alt="background"
                width={310}
                height={374}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                draggable={false}
              />
            </Box>
            <Box
              sx={{
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header with title */}
              <Typography
                sx={{
                  fontSize: isMobile ? "13px" : "15px",
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  fontFamily: "UrbanistMedium",
                  lineHeight: 1.2,
                }}
              >
                {tDashboard("upgradeToPremiumTier")}
              </Typography>

              {/* Crown icon positioned at top right */}
              <Box
                sx={{
                  position: "absolute",
                  top: isMobile ? "6px" : "24px",
                  right: isMobile ? "6px" : "24px",
                  width: isMobile ? "32px" : "49px",
                  height: isMobile ? "32px" : "49px",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  zIndex: 2,
                }}
              >
                <Image
                  src={CrownIcon}
                  alt="Crown Icon"
                  width={isMobile ? 14 : 18}
                  height={isMobile ? 12 : 18}
                  draggable={false}
                />
              </Box>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: isMobile ? "10px" : "13px",
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  fontFamily: "UrbanistMedium",
                  lineHeight: 1.4,
                  paddingTop: isMobile ? "6px" : "12px",
                }}
              >
                {tDashboard("lowerFeesAndPrioritySupport")}
              </Typography>

              {/* Learn More Button */}
              <Box sx={{ marginTop: "20px" }}>
                <CustomButton
                  label={tDashboard("learnMore")}
                  variant="secondary"
                  size={isMobile ? "small" : "medium"}
                  endIcon={<ArrowOutward sx={{ fontSize: 16 }} />}
                  fullWidth={true}
                />
              </Box>
            </Box>
          </PremiumTierCard>
        </Box>
      </PanelCard>
      {/* Referral and Knowledge Base Section */}
      {isMobile && (
        <Box sx={{ marginTop: "16px" }}>
          <ReferralAndKnowledge isMobile={isMobile} />
        </Box>
      )}
    </Box>
  );
};

export default DashboardRightSection;
