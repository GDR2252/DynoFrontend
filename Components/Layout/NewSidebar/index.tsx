import React from "react";
import {
  SidebarWrapper,
  Menu,
  MenuItem,
  IconBox,
  ActiveIndicator,
  SidebarFooter,
  KnowledgeBaseBtn,
  KnowledgeBaseTitle,
  ReferralCard,
  ReferralCardContent,
  ReferralCardTitle,
  ReferralCardContentValue,
  ReferralCardContentValueContainer,
  CopyButton,
} from "./styled";
import Image from "next/image";
import DashboardIcon from "@/assets/Icons/dashboard-icon.svg";
import TransactionsIcon from "@/assets/Icons/transaction-icon.svg";
import WalletsIcon from "@/assets/Icons/wallet-icon.svg";
import APIIcon from "@/assets/Icons/key-icon.svg";
import NotificationsIcon from "@/assets/Icons/notification-icon.svg";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/router";
import { Box, useTheme } from "@mui/material";
import BGOverlay from "@/assets/Images/bg-overlay.png";
import CopyIcon from "@/assets/Icons/copy-icon.svg";
import FileIcon from "@/assets/Icons/file-icon.svg";
import { useTranslation } from "react-i18next";

const NewSidebar = () => {
  const isMobile = useIsMobile("md");
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation("dashboardLayout");

  const menuItems = [
    { label: t("dashboard"), icon: DashboardIcon, path: "/" },
    {
      label: t("transactions"),
      icon: TransactionsIcon,
      path: "/transactions",
      plus: true,
    },
    { label: t("wallets"), icon: WalletsIcon, path: "/wallet" },
    { label: t("api"), icon: APIIcon, path: "/apis" },
    { label: t("notifications"), icon: NotificationsIcon, path: "/notifications" },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/") return router.pathname === "/";
    return router.pathname.startsWith(path);
  };

  return (
    <SidebarWrapper>
      <Menu>
        {menuItems.map((item, i) => {
          const isActive = isActiveRoute(item.path);

          return (
            <MenuItem
              key={i}
              active={isActive}
              onClick={() => router.push(item.path)}
            >
              <ActiveIndicator active={isActive} />
              <IconBox active={isActive}>
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  alt={item.label}
                />
              </IconBox>

              <Box
                component="span"
                sx={{
                  fontSize: isMobile ? "11px" : "14px",
                  fontWeight: 500,
                  textAlign: "center",
                  lineHeight: 1.2,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "11px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  },
                }}
              >
                {isMobile ? item.label.split(" ")[0] : item.label}
              </Box>

              {item.plus && !isMobile && (
                <Box
                  sx={{
                    background: theme.palette.primary.light,
                    borderRadius: "50%",
                    padding: "4px",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                  }}
                >
                  <AddIcon
                    sx={{
                      marginLeft: "auto",
                      color: theme.palette.primary.main,
                      fontSize: "20px",
                    }}
                  />
                </Box>
              )}
            </MenuItem>
          );
        })}
      </Menu>

      <SidebarFooter>
        <ReferralCard>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              userSelect: "none",
            }}
          >
            <Image
              src={BGOverlay}
              alt="BG Overlay"
              width={150}
              height={100}
              draggable={false}
            />
          </Box>
          <ReferralCardContent>
            <ReferralCardTitle>{t("yourReferralCode")}</ReferralCardTitle>

            <ReferralCardContentValueContainer>
              <ReferralCardContentValue>DYNO2024XYZ</ReferralCardContentValue>
              <CopyButton
                onClick={() => {
                  navigator.clipboard.writeText("DYNO2024XYZ");
                }}
              >
                <Image src={CopyIcon} alt="Copy Icon" width={20} height={20} />
              </CopyButton>
            </ReferralCardContentValueContainer>
          </ReferralCardContent>
        </ReferralCard>

        <KnowledgeBaseBtn>
          <Image src={FileIcon} alt="File Icon" width={18} height={18} />
          <KnowledgeBaseTitle>{t("knowledgeBase")}</KnowledgeBaseTitle>
        </KnowledgeBaseBtn>
      </SidebarFooter>
    </SidebarWrapper>
  );
};

export default NewSidebar;
