import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";

export const ApiKeyCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const ApiKeyCardBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 18,
}));

export const ApiKeyCardTopRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  //   flexWrap: "wrap",
}));

export const ApiKeyViewButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 6,
  width: 40,
  height: 40,
  backgroundColor: "#fff",
}));

export const ApiKeyCopyButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 6,
  width: 40,
  height: 40,
  backgroundColor: "#fff",
}));
export const ApiKeyDeleteButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: 6,
  width: 40,
  height: 40,
  backgroundColor: "#fff",
}));

export const ApiKeyCreatedText = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "baseline",
  gap: 4,
}));

export const Tags = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  backgroundColor: "#EAFFF0",
  color: "#47B464",
  padding: "4px 8px",
  borderRadius: 50,
  fontSize: 13,
  lineHeight: 1.54,
  fontWeight: 500,
  border: "1px solid #DCF6E4",
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
}));