// styles/HomeHeader.styles.ts
import { homeTheme } from "@/styles/homeTheme";
import { theme } from "@/styles/theme";
import { MenuRounded } from "@mui/icons-material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Divider, Drawer, IconButton, styled } from "@mui/material";
import HomeButton from "../HomeButton";

type FixedHeaderProps = {
  $visible: boolean;
};

export const FixedHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "$visible",
})<FixedHeaderProps>(({ $visible }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1400,
  backgroundColor: "#fff",
  transform: $visible ? "translateY(0)" : "translateY(-100%)",
  transition: "transform 0.3s ease-in-out",
  width: "100%",
}));

export const HeaderContainer = styled("nav")(({ theme }) => ({
  height: 64,
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  maxWidth: 1280,
  margin: "0 auto",

  [theme.breakpoints.down("md")]: {
    padding: "0 16px",
  },

  ".logo": {
    cursor: "pointer",
    userSelect: "none",
    [theme.breakpoints.down("md")]: {
      width: "100px",
      height: "auto",
    },
  },
}));

export const HeaderDivider = styled(Divider)({
  borderColor: homeTheme.palette.border.main,
});

export const ClickableLogo = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
  outline: "none",
  border: "none",
  background: "transparent",
  padding: 0,
});

export const LeftGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "102px",
});

export const RightGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const NavLinks = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 32,
  letterSpacing: "0px",
  fontFamily: "OutfitRegular",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },

  button: {
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0px",
    fontFamily: "OutfitRegular",
    color: homeTheme.palette.text.secondary,
    padding: 0,

    "&:hover": {
      background: "transparent",
      color: homeTheme.palette.primary.main,
    },
  },
}));

export const Actions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",

  ".signin": {
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    color: homeTheme.palette.text.primary,
    lineHeight: "20px",
    fontFamily: "OutfitMedium",
    whiteSpace: "nowrap",

    "&:hover": {
      background: "transparent",
      color: homeTheme.palette.primary.main,
    },
  },
});

export const DesktopLanguageWrapper = styled(Box)({
  marginRight: "8px",
  display: "flex",
  alignItems: "center",
  "& .MuiButtonBase-root, & .MuiInputBase-root, & .MuiOutlinedInput-root": {},
});

export const MobileLanguageWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const MobileMenuButton = styled(IconButton)({
  padding: "0px",
});

export const MenuOpenIcon = styled(MenuRounded)({
  color: theme.palette.text.primary,
  fontSize: 24,
});

export const MenuCloseIcon = styled(CloseRoundedIcon)({
  color: theme.palette.text.primary,
  fontSize: 24,
});

export const MobileMenuDrawer = styled(Drawer)({
  zIndex: 1200,

  "& .MuiDrawer-paper": {
    top: "64px !important",
    height: "calc(100vh - 64px) !important",
    width: "100%",
    maxWidth: "320px",
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
    border: "none !important",
  },

  "& .MuiBackdrop-root": {
    backgroundColor: "#FFFFFFCC",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
});

export const MobileDrawer = styled("div")({
  height: "100%",
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const MobileNavContent = styled(Box)({
  marginTop: "51px",
  padding: "0 16px",
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "36.29px",
  alignItems: "flex-end",
});

export const MobileNavItem = styled("button")({
  fontSize: "15.88px",
  fontWeight: 400,
  lineHeight: "22.68px",
  fontFamily: "OutfitRegular",
  color: homeTheme.palette.text.secondary,
  cursor: "pointer",
  transition: "color 0.2s ease",
  textAlign: "right",
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  outline: "none",
  border: "none",
  background: "transparent",
  padding: 0,
});

export const StyledGetStartedButton = styled(HomeButton)({
  borderRadius: "8px !important",
  padding: "8px 12px !important",
  minWidth: "98px !important",
});
