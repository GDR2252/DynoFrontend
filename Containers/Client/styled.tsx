import { Box, styled, Typography } from "@mui/material";

export const FixedBottomWrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  padding: theme.spacing(1.5),
  background: "transparent",
  zIndex: 999,
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: theme.palette.secondary.main,
}));

export const PageHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontFamily: "UrbanistMedium",
  lineHeight: 1.2,
  mb: 1,
  [theme.breakpoints.up("md")]: {
    fontSize: "32px",
  },
}));

export const PageHeaderDescription = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  color: theme.palette.text.secondary,
  lineHeight: 1.5,
  fontFamily: "UrbanistMedium",
  paddingLeft: 0,
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
    paddingLeft: theme.spacing(0.5),
  },
}));
