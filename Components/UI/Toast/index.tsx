import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { TOAST_HIDE, ToastAction } from "../../../Redux/Actions/ToastAction";
import LoadingIcon from "@/assets/Icons/LoadingIcon";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import { IToastProps } from "@/utils/types";
import useIsMobile from "@/hooks/useIsMobile";

const Toast = (props: IToastProps) => {
  const dispatch = useDispatch();
  const { open, severity, message, loading } = props;
  const isMobile = useIsMobile("sm");

  const handleClose = () => {
    dispatch({ type: TOAST_HIDE });

  };

  // Auto-hide toast after 4 seconds (unless it's loading)
  // Reset timer when message or severity changes (new toast)
  useEffect(() => {
    if (open && !loading) {
      const timer = setTimeout(() => {
        dispatch({ type: TOAST_HIDE });

      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [open, loading, message, severity, dispatch]);

  if (!open) return null;

  // Determine colors and icon based on severity
  const getToastStyles = () => {
    if (loading) {
      return {
        borderColor: "#4CAF50",
        backgroundColor: "#FFFFFF",
        icon: <LoadingIcon size={20} fill="#4CAF50" />,
      };
    }
    
    // Explicitly check for error severity
    if (severity === "error") {
      return {
        borderColor: "#F44336",
        backgroundColor: "#FFFFFF",
        icon: <ErrorOutlineIcon sx={{ color: "#F44336", fontSize: "20px" }} />,
      };
    }
    
    // Default to success (green)
    return {
      borderColor: "#4CAF50",
      backgroundColor: "#FFFFFF",
      icon: <CheckCircleOutlineIcon sx={{ color: "#4CAF50", fontSize: "20px" }} />,
    };
  };

  const toastStyles = getToastStyles();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: isMobile ? "16px" : "24px",
        right: isMobile ? "16px" : "24px",
        zIndex: 99999,
        minWidth: isMobile ? "280px" : "320px",
        maxWidth: isMobile ? "calc(100vw - 32px)" : "400px",
        backgroundColor: toastStyles.backgroundColor,
        border: `1px solid ${toastStyles.borderColor}`,
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        animation: "slideInRight 0.3s ease-out",
        "@keyframes slideInRight": {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {toastStyles.icon}
      </Box>

      {/* Message */}
      <Typography
        sx={{
          flex: 1,
          fontSize: isMobile ? "13px" : "14px",
          fontFamily: "UrbanistMedium",
          color: "#242428",
          lineHeight: "1.5",
        }}
      >
        {message}
      </Typography>

      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          padding: "4px",
          color: "#676768",
          flexShrink: 0,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
        size="small"
      >
        <CloseIcon sx={{ fontSize: "18px" }} />
      </IconButton>
    </Box>
  );
};

export default Toast;
