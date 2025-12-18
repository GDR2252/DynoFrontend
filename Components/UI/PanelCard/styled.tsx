import { theme } from "@/styles/theme";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  background: "#fff",
  outline: `1px solid ${theme.palette.border.main}`,
  boxShadow: "rgba(47, 47, 101, 0.08) 0 2px 8px 0",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "rgba(47, 47, 101, 0.12) 0 4px 12px 0",
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2.5, 2.5, 0, 2.5),
  borderBottom: `1px solid ${theme.palette.border.main}`,
  gap: theme.spacing(2),
  position: "relative",
}));

export const HeaderContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1,
});

export const HeaderTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  fontFamily: "UrbanistMedium",
  color: "#242428",
});

export const HeaderIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: theme.palette.grey[100],
  color: theme.palette.text.secondary,
  "& svg": {
    fontSize: "20px",
  },
}));
export const CardBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 2.5, 2.5, 2.5),
  flex: 1,
}));

export const CardFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.border.main}`,
  gap: theme.spacing(1.5),
}));

export const HeaderSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: theme.palette.text.secondary,
  fontFamily: "UrbanistRegular",
}));