import { theme } from "@/styles/theme";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { homeTheme } from "@/styles/homeTheme";

export const StyledCard = styled(Card)(({ theme }) => ({
  background: "#fff",
  width: "100%",
  height: "100%",
  maxHeight: "612px",
  border: `1px solid ${homeTheme.palette.border.main}`,
  boxShadow: "none !important",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    top: "220px",
    width: "100%",
    boxShadow: "none !important",
    height: "576px",
    borderRadius: "1000px",
    background: "radial-gradient(at center bottom, #0004FF4D, #FFFFFF)",
    filter: "blur(100px)",
    overflow: "hidden",
    opacity: 0.5,
    zIndex: 0,
    pointerEvents: "none",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  [theme.breakpoints.down("md")]: {
    height: "auto",
  },
}));

export const GoLiveCount = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  fontWeight: 500,
  lineHeight: "48px",
  letterSpacing: 0,
  fontFamily: "OutfitMedium",
  color: theme.palette.primary.main,
  opacity: 0.2,
}));

export const GoLiveTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: 0,
  fontFamily: "OutfitMedium",
  color: theme.palette.text.primary,
}));

export const GoLiveDescription = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  letterSpacing: 0,
  fontFamily: "OutfitRegular",
  color: theme.palette.text.secondary,
}));

export const FeatureIcon = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "16px",
  background: homeTheme.palette.background.default,
}));

export const WhyChooseUsCard = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  maxWidth: "294px",
  maxHeight: "218px",
  padding: "25px",
  background: theme.palette.primary.contrastText,
  border: `1px solid #E7E8EF`,
  boxShadow: "none !important",
  borderRadius: "20px",
}));

export const WhyChooseDynoPayTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "28px",
  fontStyle: "semibold",
  letterSpacing: 0,
  textAlign: "center",
  fontFamily: "OutfitMedium",
  color: homeTheme.palette.text.primary,
}));

export const WhyChooseDynoPayDescription = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  letterSpacing: 0,
  textAlign: "center",
  fontFamily: "OutfitRegular",
  color: homeTheme.palette.text.secondary,
}));

export const WhyChooseDynoPayIcon = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  minHeight: "56px",
  minWidth: "56px",
  borderRadius: "20px",
  background: "#0004FF1A",
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2.5, 2.5, 0, 2.5),
  gap: theme.spacing(2),
  position: "relative",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2, 2, 0, 2),
  },
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
  fontFamily: "OutfitMedium",
  color: "#242428",
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
  },
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
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: theme.palette.text.secondary,
  fontFamily: "OutfitRegular",
}));
