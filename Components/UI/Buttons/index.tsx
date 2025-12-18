import React from "react";
import { Button as MuiButton, Box } from "@mui/material";
import { borderRadius, fontFamily, SxProps, Theme } from "@mui/system";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { theme } from "@/styles/theme";

export interface CustomButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode | StaticImageData;
  endIcon?: React.ReactNode | StaticImageData;
  iconSize?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  sx?: SxProps<Theme>;
  hideLabelWhenLoading?: boolean;
  showSuccessAnimation?: boolean;
  showErrorAnimation?: boolean;
}

/**
 * Custom Button Component with Primary and Secondary variants
 * - Primary: Blue background (#1034A6), white text
 * - Secondary: White background, blue text (#1034A6)
 * - Supports icons (startIcon/endIcon) and multiple sizes
 * - Disabled state with proper styling
 */
const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  iconSize,
  onClick,
  type = "button",
  sx,
  hideLabelWhenLoading = false,
  showSuccessAnimation = false,
  showErrorAnimation = false,
}) => {
  // Size configuration
  const sizeConfig = {
    small: {
      padding: "8px 16px",
      fontSize: "13px",
      height: "32px",
      gap: "6px",
    },
    medium: {
      padding: "15px 24px",
      fontSize: "15px",
      height: "40px",
      gap: "8px",
    },
    large: {
      padding: "16px 32px",
      fontSize: "16px",
      height: "48px",
      gap: "10px",
    },
  };

  const config = sizeConfig[size];

  // Variant configuration
  const variantConfig = {
    primary: {
      backgroundColor: "#0004FF",
      color: "#FFFFFF",
      fontFamily: "UrbanistBold",
      borderRadius: "6px",
    },
    secondary: {
      backgroundColor: "#FFFFFF",
      color: "#0004FF",
      border: "1px solid #0004FF",
    },
    outlined: {
      backgroundColor: "#FFFFFF",
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.border.main}`,
      fontFamily: "UrbanistRegular",
      fontSize: "15px",
    },
  };

  const variantStyle = variantConfig[variant];

  // Helper function to render icon (handles both React components and image imports)
  const renderIcon = (
    icon: React.ReactNode | StaticImageData | undefined,
    iconSize: number
  ): React.ReactNode => {
    if (!icon) return null;

    // Check if it's a StaticImageData (image import from Next.js)
    if (typeof icon === "object" && "src" in icon) {
      return (
        <Image
          src={icon}
          alt="icon"
          width={iconSize}
          height={iconSize}
          style={{ display: "flex", objectFit: "contain" }}
        />
      );
    }

    // Otherwise, treat it as a React component
    return icon as React.ReactNode;
  };

  // Calculate icon size: use prop if provided, otherwise default to 10px
  const finalIconSize = iconSize ?? 10;

  const shouldHideLabel = hideLabelWhenLoading && disabled;
  const animationClass = showSuccessAnimation
    ? "success-pulse"
    : showErrorAnimation
    ? "error-shake"
    : "";

  return (
    <MuiButton
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      className={animationClass}
      sx={{
        padding: config.padding,
        fontSize: config.fontSize,
        height: config.height,
        borderRadius: "8px",
        lineHeight: "1",
        textTransform: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: config.gap,
        ...variantStyle,
        ...(variant === "primary" && !disabled && {
          "&:hover": {
            backgroundColor: "#0004FF99",
            color: "#FFFFFF",
          },
        }),
        ...(disabled && {
          backgroundColor: variant === "primary" ? "#B0BEC5" : "#FFFFFF",
          color: variant === "primary" ? "#FFFFFF !important" : "#676768 !important",
          border: `1px solid ${variant === "primary" ? "#B0BEC5" : "#676768"}`,
          cursor: "not-allowed",
          lineHeight: "1",
        }),
        ...(showSuccessAnimation && {
          animation: "successPulse 0.6s ease-in-out",
          "@keyframes successPulse": {
            "0%": {
              backgroundColor: variant === "primary" ? "#0004FF" : "#FFFFFF",
            },
            "50%": {
              backgroundColor: "#4CAF50",
            },
            "100%": {
              backgroundColor: variant === "primary" ? "#0004FF" : "#FFFFFF",
            },
          },
        }),
        ...(showErrorAnimation && {
          animation: "errorShake 0.5s ease-in-out",
          "@keyframes errorShake": {
            "0%, 100%": {
              transform: "translateX(0)",
            },
            "10%, 30%, 50%, 70%, 90%": {
              transform: "translateX(-5px)",
            },
            "20%, 40%, 60%, 80%": {
              transform: "translateX(5px)",
            },
          },
        }),
        ...sx,
      }}
    >
      {startIcon && (
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize:
              size === "small" ? "16px" : size === "medium" ? "18px" : "20px",
          }}
        >
          {renderIcon(startIcon, finalIconSize)}
        </Box>
      )}

      {!shouldHideLabel && <span>{label}</span>}

      {endIcon && (
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize:
              size === "small" ? "10px" : size === "medium" ? "10px" : "20px",
          }}
        >
          {renderIcon(endIcon, finalIconSize)}
        </Box>
      )}
    </MuiButton>
  );
};

export default CustomButton;
