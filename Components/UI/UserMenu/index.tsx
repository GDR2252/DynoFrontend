import { useState } from "react";
import { Popover, useTheme, Box } from "@mui/material";
import { UserTrigger, UserName, PopWrapper, MenuItemRow } from "./styled";

import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SettingsIcon from "@mui/icons-material/Settings";
import useTokenData from "@/hooks/useTokenData";
import { VerticalLine } from "../LanguageSwitcher/styled";
import { useRouter } from "next/router";
import useWindow from "@/hooks/useWindow";
import CustomButton from "../Buttons";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@/assets/Icons/logout-icon.svg";
import useIsMobile from "@/hooks/useIsMobile";

export default function UserMenu() {
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const triggerWidth = anchorEl?.clientWidth || 180;
  const tokenData = useTokenData();
  const router = useRouter();
  const customWindow = useWindow();
  const { t } = useTranslation("dashboardLayout");

  const closeMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    if (customWindow) {
      customWindow.localStorage.removeItem("token");
      customWindow.location.replace("/auth/login");
    }
  };
  const firstName = tokenData?.name.split(" ")[0];

  return (
    <>
      {/* Trigger */}
      <UserTrigger onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Image
            src={tokenData?.photo as string}
            alt="user"
            width={isMobile ? 24 : 32}
            height={isMobile ? 24 : 32}
            style={{ borderRadius: 999 }}
          />

        
            <UserName sx={{ fontSize: isMobile ? 13 : 15 }}>
              {isMobile ? firstName : tokenData?.name}
            </UserName>
    
        </Box>

        {!isMobile && <VerticalLine />}
        {anchorEl ? (
          <ExpandLessIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        ) : (
          <ExpandMoreIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        )}
      </UserTrigger>

      {/* Popover */}
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isMobile ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isMobile ? "right" : "left",
        }}
        PaperProps={{
          sx: {
            width: isMobile ? 220 : triggerWidth,
            minWidth: 200,
            borderRadius: "8px",
            boxShadow: "0 6px 30px rgba(0,0,0,0.2)",
            overflow: "hidden",
          },
        }}
      >
        <PopWrapper>
          {/* Settings */}
          <MenuItemRow
            onClick={() => {
              router.push("/profile");
              closeMenu();
            }}
          >
            <SettingsIcon sx={{ fontSize: 20 }} />
            <span>{t("settings")}</span>
          </MenuItemRow>

          <Box mt={2}>
            <CustomButton
              label={t("logout")}
              onClick={handleLogout}
              variant="secondary"
              endIcon={
                <Image src={LogoutIcon} alt="logout" width={18} height={18} />
              }
              fullWidth
              size="medium"
            />
          </Box>
        </PopWrapper>
      </Popover>
    </>
  );
}
