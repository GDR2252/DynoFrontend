import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RefreshIcon from "@/assets/Icons/refresh-icon.svg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import { useTranslation } from "react-i18next";
import CopyIcon from "@/assets/Icons/copy-icon.svg";
import SettingsAccordion from "@/Components/UI/SettingsAccordion";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CustomButton from "@/Components/UI/Buttons";
import useIsMobile from "@/hooks/useIsMobile";
import SidebarIcon from "@/utils/customIcons/sidebar-icons";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Image from "next/image";

const iconButtonSize = { width: 40, height: 40, minWidth: 40, minHeight: 40 };
const iconButtonSizeMobile = { width: 32, height: 32, minWidth: 32, minHeight: 32 };

export type WebhookNotificationsSectionProps = {
  notificationUrl: string;
  secretKey: string;
  onNotificationUrlChange?: (value: string) => void;
  onSecretKeyChange?: (value: string) => void;
  onRegenerateSecret?: () => void;
  onSendTest?: () => void;
  isMobile?: boolean;
  expanded: boolean;
  onAccordionChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

export default function WebhookNotificationsSection({
  notificationUrl,
  secretKey,
  onNotificationUrlChange,
  onSecretKeyChange,
  onRegenerateSecret,
  onSendTest,
  isMobile: isMobileProp = false,
  expanded,
  onAccordionChange,
}: WebhookNotificationsSectionProps) {
  const { t: tSettings } = useTranslation("companySettings");
  const theme = useTheme();
  const isMobile = useIsMobile("sm") ?? isMobileProp;
  const [showSecret, setShowSecret] = useState(false);
  const [regenerateConfirmOpen, setRegenerateConfirmOpen] = useState(false);

  const handleRegenerateClick = useCallback(() => {
    setRegenerateConfirmOpen(true);
  }, []);

  const handleRegenerateConfirm = useCallback(() => {
    onRegenerateSecret?.();
    setRegenerateConfirmOpen(false);
  }, [onRegenerateSecret]);

  const handleRegenerateCancel = useCallback(() => {
    setRegenerateConfirmOpen(false);
  }, []);

  const handleCopyUrl = useCallback(() => {
    if (notificationUrl) {
      navigator.clipboard.writeText(notificationUrl);
    }
  }, [notificationUrl]);

  const handleCopySecret = useCallback(() => {
    if (secretKey) {
      navigator.clipboard.writeText(secretKey);
    }
  }, [secretKey]);

  const sizeSx = isMobile ? iconButtonSizeMobile : iconButtonSize;
  const primaryBorder = theme.palette.primary.main;
  const outlineBorder = "1px solid rgba(0, 0, 0, 0.23)";

  return (
    <SettingsAccordion
      icon={
        <SidebarIcon
          name="notifications"
          size={16}
          color={theme.palette.text.primary}
        />
        // <NotificationsIcon sx={{ color: "text.primary", height: 16, width: 16 }} />
      }
      title={tSettings("webhookNotifications")}
      subtitle={tSettings("webhookSubtitle")}
      expanded={expanded}
      onChange={onAccordionChange}
      isMobile={isMobile}
    >

      {/* Notification URL */}
      <Box sx={{ mb: 2.5, width: "100%" }}>
        <InputField
          fullWidth
          label={tSettings("webhookNotificationUrl")}
          placeholder="https://mystore.com/dynopay-webhook"
          name="webhook_notification_url"
          value={notificationUrl}
          onChange={(e) =>
            onNotificationUrlChange?.(e.target.value)
          }
          onBlur={() => { }}
          helperText={tSettings("webhookNotificationUrlHelper")}
          inputHeight={isMobile ? "32px" : "38px"}
          sideButton
          onSideButtonClick={handleCopyUrl}
          sideButtonIcon={<Image
            src={CopyIcon}
            alt="Copy Icon"
            width={isMobile ? 12 : 14}
            height={isMobile ? 12 : 14}
            draggable={false}
          />}
          sideButtonType="secondary"
        />
      </Box>

      {/* Secret Key */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          component="label"
          sx={{
            display: "block",
            fontWeight: 500,
            fontSize: isMobile ? "13px" : "15px",
            fontFamily: "UrbanistMedium",
            color: "text.primary",
            mb: 0.75,
          }}
        >
          {tSettings("webhookSecretKey")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          <InputField
            fullWidth
            placeholder="wh_sec_....................xyz123"
            name="webhook_secret_key"
            type={showSecret ? "text" : "password"}
            value={secretKey}
            onChange={(e) => onSecretKeyChange?.(e.target.value)}
            onBlur={() => { }}
            readOnly={!onSecretKeyChange}
            inputHeight={isMobile ? "32px" : "38px"}
            sx={{ flex: 1 }}
          />
          <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
            <Tooltip title={tSettings("webhookCopy")}>
              <IconButton
                onClick={handleCopySecret}
                aria-label={tSettings("webhookCopy")}
                sx={{
                  ...sizeSx,
                  borderRadius: "6px",
                  border: `1px solid ${primaryBorder}`,
                  color: primaryBorder,
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                    borderColor: primaryBorder,
                  },
                }}
              ><Image
                  src={CopyIcon}
                  alt="Copy Icon"
                  width={isMobile ? 12 : 14}
                  height={isMobile ? 12 : 14}
                  draggable={false}
                />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                showSecret
                  ? tSettings("webhookHide")
                  : tSettings("webhookReveal")
              }
            >
              <IconButton
                onClick={() => setShowSecret((prev) => !prev)}
                aria-label={showSecret ? "Hide" : "Reveal"}
                sx={{
                  ...sizeSx,
                  borderRadius: "6px",
                  border: outlineBorder,
                  color: "text.primary",
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                {showSecret ? (
                  <VisibilityOffIcon sx={{ fontSize: 18 }} />
                ) : (
                  <VisibilityIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title={tSettings("webhookRegenerate")}>
              <IconButton
                onClick={handleRegenerateClick}
                aria-label={tSettings("webhookRegenerate")}
                sx={{
                  ...sizeSx,
                  borderRadius: "6px",
                  border: outlineBorder,
                  color: "text.primary",
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                <Image
                  src={RefreshIcon}
                  alt="Refresh Icon"
                  width={isMobile ? 12 : 22}
                  height={isMobile ? 12 : 16}
                  draggable={false}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Typography
          sx={{
            mt: 0.75,
            fontSize: isMobile ? "10px" : "13px",
            fontFamily: "UrbanistMedium",
            fontWeight: 500,
            color: "text.secondary",
            lineHeight: 1.2,
          }}
        >
          {tSettings("webhookSecretKeyHelper")}
        </Typography>
      </Box>

      {/* Send Test */}
      <CustomButton
        label={tSettings("webhookSendTest")}
        variant="secondary"
        size="medium"
        endIcon={<OpenInNewIcon sx={{ fontSize: 18 }} />}
        onClick={onSendTest}
        sx={{
          width: "100%",
          fontSize: isMobile ? "13px" : "15px",
        }}
      />

      {/* Regenerate Secret Key Confirmation Dialog */}
      <Dialog
        open={regenerateConfirmOpen}
        onClose={handleRegenerateCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 0,
            maxWidth: 576,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 0,
            pt: 2.5,
            px: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image
              src={InfoIcon}
              alt="Info Icon"
              width={isMobile ? 12 : 22}
              height={isMobile ? 12 : 16}
              draggable={false}
            />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? "16px" : "18px",
                fontFamily: "UrbanistMedium",
                color: "text.primary",
              }}
            >
              {tSettings("webhookRegenerateConfirmTitle")}
            </Typography>
          </Box>
          <IconButton
            onClick={handleRegenerateCancel}
            aria-label="Close"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: "action.hover",
              "&:hover": { bgcolor: "action.selected" },
            }}
          >
            <Image
              src={RefreshIcon}
              alt="Close Icon"
              width={isMobile ? 12 : 22}
              height={isMobile ? 12 : 16}
              draggable={false}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 2.5, pt: 1.5, pb: 0 }}>
          <Typography
            sx={{
              fontSize: isMobile ? "13px" : "14px",
              color: "text.secondary",
              lineHeight: 1.5,
            }}
          >
            {tSettings("webhookRegenerateConfirmMessage")}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "flex-end",
            gap: 1,
            px: 2.5,
            pb: 2.5,
            pt: 2,
          }}
        >
          <CustomButton
            label={tSettings("actions.cancel")}
            variant="outlined"
            size="medium"
            onClick={handleRegenerateCancel}
            sx={{ fontSize: isMobile ? "13px" : "14px", width: "100%"}}
          />
          <CustomButton
            label={tSettings("webhookRegenerateConfirmButton")}
            variant="danger"
            size="medium"
            onClick={handleRegenerateConfirm}
            sx={{ fontSize: isMobile ? "13px" : "14px", width: "100%" }}
          />
        </DialogActions>
      </Dialog>
    </SettingsAccordion>
  );
}
