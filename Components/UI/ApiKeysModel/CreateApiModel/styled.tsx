import { theme } from "@/styles/theme";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PermissionsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(2),
  borderRadius: "7px",
  border: `1px solid ${theme.palette.border.main}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(2),
}));

export const IconContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
});

export const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const PermissionsTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  fontSize: "13px",
}));

export const PermissionsList = styled("ul")(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(1),
  listStyle: "none",
  "& li": {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    fontSize: "13px",
    lineHeight: 1,
    position: "relative",
    paddingLeft: theme.spacing(1.5),
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      backgroundColor: theme.palette.text.primary,
    },
  },
}));
