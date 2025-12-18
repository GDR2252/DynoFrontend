import { styled } from "@mui/material";

export const SidebarWrapper = styled("aside")(({ theme }) => ({
  width: "100%",
  height: "100%",
  // minHeight: "65vh",
  background: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "14px",
  outline: `1px solid ${theme.palette.border.main}`,
  padding: "16px",
  overflow: "auto",
}));

export const Menu = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  background: theme.palette.common.white,
  borderRadius: "12px",
}));

export const MenuItem = styled("div")<{ active?: boolean }>(
  ({ active, theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "7px",
    cursor: "pointer",
    background: active ? theme.palette.primary.light : "transparent",
    fontSize: "14px",
    fontWeight: 500,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    transition: "all 0.2s ease",
    position: "relative",

    "&:hover": {
      background: active ? theme.palette.primary.light : "#f9fafb",
    },
  })
);

export const ActiveIndicator = styled("div")<{ active?: boolean }>(
  ({ active, theme }) => ({
    position: "absolute",
    left: "-16px",
    top: 0,
    bottom: 0,
    width: "4px",
    background: active ? theme.palette.primary.main : "transparent",
    borderRadius: "0 7px 7px 0",
    transition: "all 0.2s ease",
  })
);

export const IconBox = styled("div")<{ active?: boolean }>(
  ({ active, theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "26px",
    height: "26px",
    borderRadius: "6px",
    background: active ? theme.palette.primary.light : "transparent",

    "& img": {
      filter: active
        ? "brightness(0) saturate(100%) invert(13%) sepia(94%) saturate(7151%) hue-rotate(240deg) brightness(101%) contrast(150%)"
        : "brightness(0) saturate(100%) invert(27%) sepia(8%) saturate(1018%) hue-rotate(182deg) brightness(95%) contrast(88%)",
    },
  })
);

export const SidebarFooter = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

export const KnowledgeBaseBtn = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  background: theme.palette.common.white,
  border: `1px solid ${theme.palette.border.main}`,
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const KnowledgeBaseTitle = styled("div")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const ReferralCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "14px",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.border.main}`,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  background: theme.palette.secondary.main,
  position: "relative",
  overflow: "hidden",
}));

export const ReferralCardTitle = styled("div")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 500,
  fontFamily: "UrbanistMedium",
  color: theme.palette.text.primary,
}));

export const ReferralCardContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  zIndex: 1,
  color: theme.palette.text.primary,
  position: "relative",
}));

export const ReferralCardContentValueContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
}));

export const ReferralCardContentValue = styled("span")(({ theme }) => ({
  borderRadius: "7px",
  padding: "10px 12px",
  border: `1px dashed ${theme.palette.border.main}`,
  background: theme.palette.common.white,
  fontSize: "15px",
  fontWeight: 500,
  fontFamily: "UrbanistMedium",
  color: theme.palette.primary.main,
  flex: 1,
}));

export const CopyButton = styled("button")(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "7px",
  padding: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  transition: "background 0.2s ease",
  flexShrink: 0,
}));
