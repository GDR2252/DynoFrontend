import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";

export const ApiKeyCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const ApiKeyCardSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.primary,
  fontWeight: 500,
  lineHeight: "17px",
  fontFamily: "UrbanistMedium",

  display: "inline-flex",
  alignItems: "center",
  gap: 6,

  "& .flag": {
    display: "inline-flex",
    alignItems: "center",
  },

  "& img": {
    display: "block",
    position: "relative",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 11,
    lineHeight: "13px",
  },
}));

export const ApiKeyCardBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 18,
}));

export const ApiKeyCardTopRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  //   flexWrap: "wrap",
}));

export const ApiKeyViewButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 6,
  width: 40,
  height: 40,
  backgroundColor: "#fff",
  [theme.breakpoints.down("md")]: {
    width: 32,
    height: 32,
  },
  "& img": {
    width: 20,
    height: 14,
    [theme.breakpoints.down("md")]: {
      width: 14,
      height: 10,
    },
  },
}));

export const ApiKeyCopyButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 6,
  width: 40,
  height: 40,
  backgroundColor: "#fff",
  [theme.breakpoints.down("md")]: {
    width: 32,
    height: 32,
  },
  "& img": {
    width: 14,
    height: 14,
    [theme.breakpoints.down("md")]: {
      width: 12,
      height: 12,
    },
  },
}));

export const ApiKeyDeleteButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: 6,
  width: 40,
  height: 40,
  backgroundColor: "#fff",
  [theme.breakpoints.down("md")]: {
    width: 32,
    height: 32,
  },
  "& img": {
    width: 14,
    height: 14,
    [theme.breakpoints.down("md")]: {
      width: 12,
      height: 12,
    },
  },
}));

export const ApiKeyCreatedText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  gap: 4,
  "& .created-on-text": {
    fontSize: 13,
  },
  [theme.breakpoints.down("md")]: {
    "& .created-on-text": {
      fontSize: 10,
    },
  },
}));

export const Tags = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.dark,
  padding: "4px 8px",
  borderRadius: 50,
  fontSize: 13,
  lineHeight: 1.54,
  fontWeight: 500,
  border: `1px solid ${theme.palette.success.light}`,
  textTransform: "capitalize",
  fontFamily: "UrbanistMedium",
  position: "absolute",
  top: 12,
  right: 12,
  zIndex: 1,
}));

// ApiDocsCardRoot
export const ApiDocsCardRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.text.primary,
  fontWeight: 500,
  lineHeight: "18px",
  fontFamily: "UrbanistMedium",
  [theme.breakpoints.down("md")]: {
    fontSize: 13,
    lineHeight: "17px",
  },
}));

export const ApiDocumentationCardDescription = styled(Typography)(
  ({ theme }) => ({
    fontSize: 13,
    color: theme.palette.text.secondary,
    fontWeight: 500,
    lineHeight: "17px",
    fontFamily: "UrbanistMedium",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
      lineHeight: "14px",
    },
  })
);
