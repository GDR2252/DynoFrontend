import React from "react";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export type InfoBannerProps = {
  /** Message to display (e.g. "Please set up your USDT/USDC wallet first.") */
  message: string;
  /** Optional custom content instead of message */
  children?: React.ReactNode;
  /** Optional sx for the root container */
  sx?: object;
};

/**
 * Info banner with rounded corners, light blue/lavender background,
 * dark circle with info icon on the left, and message text.
 * Use for prerequisites or informational callouts.
 */
export default function InfoBanner({
  message,
  children,
  sx,
}: InfoBannerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1.5,
        px: 2,
        borderRadius: "8px",
        bgcolor: "#E8EBFB",
        width: "fit-content",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          bgcolor: "grey.800",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <InfoOutlinedIcon
          sx={{
            color: "common.white",
            fontSize: 16,
          }}
        />
      </Box>
      {children ?? (
        <Typography
          variant="body2"
          sx={{
            color: "text.primary",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "UrbanistMedium",
            lineHeight: 1.4,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}
