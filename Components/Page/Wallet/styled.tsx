import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderIcon = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: theme.palette.secondary.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
  "& img": {
    objectFit: "contain",
    height: 24,
    width: 24,
  },
}));

export const WalletHeaderAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  backgroundColor: theme.palette.secondary.light,
  padding: "6px 8px",
  borderRadius: 50,
  border: `1px solid ${theme.palette.border.main}`,
  textTransform: "capitalize",
  fontFamily: "UrbanistMedium",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 1,

  "& img": {
    objectFit: "contain",
    height: 18,
    width: 18,
  },
  "& span": {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "18px",
    fontFamily: "UrbanistMedium",
  },
}));

export const WalletCardBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
}));

export const WalletCardBodyRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  gap: 18,
}));

export const WalletCopyButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 6,
  width: 40,
  height: 40,
  backgroundColor: "#fff",
  "& img": {
    width: 14,
    height: 14,
  },
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
}));

export const WalletLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& img": {
    width: 16,
    height: 16,
  },
  "& span": {
    fontSize: "15px",
    fontWeight: 500,
    color: theme.palette.text.secondary,
    lineHeight: "18px",
    fontFamily: "UrbanistMedium",
  },
}));

export const WalletEditButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
}));
