import { useState } from "react";
import {
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  SxProps,
  Theme,
  Box,
} from "@mui/material";
import {
  LangFlag,
  LangTrigger,
  LangText,
  CheckIconStyled,
  VerticalLine,
} from "./styled";

import portugalFlag from "@/assets/Images/Icons/flags/portugal-flag.png";
import unitedStatesFlag from "@/assets/Images/Icons/flags/united-states-flag.png";
import franceFlag from "@/assets/Images/Icons/flags/france-flag.png";
import spainFlag from "@/assets/Images/Icons/flags/spain-flag.png";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";
import i18n from "i18next";
import useIsMobile from "@/hooks/useIsMobile";

const languages = [
  { code: "pt", label: "Português", flag: portugalFlag },
  { code: "en", label: "English", flag: unitedStatesFlag },
  // { code: "fr", label: "Français", flag: franceFlag },
  // { code: "es", label: "Español", flag: spainFlag },
];

export default function LanguageSwitcher({ sx }: { sx?: SxProps<Theme> }) {
  const current = i18n.language || "en";
  const theme = useTheme();
  const isMobile = useIsMobile("md");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    handleClose();
  };

  const selected = languages.find((l) => l.code === current) ?? languages[1];

  return (
    <>
      <LangTrigger
        onClick={handleOpen}
        sx={[
          { maxHeight: isMobile ? "28px" : "40px" },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LangFlag
            src={selected.flag.src}
            alt="flag"
            style={{
              height: isMobile ? "14px" : "20px",
              width: isMobile ? "14px" : "20px",
            }}
          />
          <LangText style={{ fontSize: isMobile ? "10.5px" : "15px" }}>
            {selected.code.toUpperCase()}
          </LangText>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "4px",
            gap: 0.2,
          }}
        >
          <VerticalLine
            style={{
              height: isMobile ? "14px" : "20px",
              minHeight: isMobile ? "14px" : "20px",
              marginRight: isMobile ? "4px" : "9px",
            }}
          />
          {!anchorEl ? (
            <ExpandMoreIcon
              style={{
                color: theme.palette.text.secondary,
                width: isMobile ? "16px" : "24px",
                height: isMobile ? "16px" : "24px",
              }}
            />
          ) : (
            <ExpandLess
              style={{
                color: theme.palette.text.secondary,
                width: isMobile ? "16px" : "24px",
                height: isMobile ? "16px" : "24px",
              }}
            />
          )}
        </Box>
      </LangTrigger>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: "6px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
          },
        }}
      >
        <List sx={{ width: "100%", p: 1.5 }}>
          {languages.map((lng) => (
            <ListItemButton
              key={lng.code}
              onClick={() => changeLang(lng.code)}
              sx={{
                borderRadius: "50px",
                fontSize: isMobile ? "12px !important" : "15px",
                mb: 0.5,
                py: isMobile ? "4px" : 1,
                gap: isMobile ? "4px" : 2,
                background: lng.code === current ? "#E8F0FF" : "transparent",
                "&:hover": {
                  background: "#E8F0FF",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "fit-content" }}>
                <LangFlag src={lng.flag.src} alt={lng.label} />
              </ListItemIcon>

              <ListItemText
                sx={{
                  fontFamily: "UrbanistMedium",
                  fontWeight: 500,
                }}
                primaryTypographyProps={{
                  sx: {
                    fontSize: isMobile ? "13px !important" : "15px",
                    lineHeight: 1.2,
                  },
                }}
                primary={`${lng.code.toUpperCase()} – ${lng.label}`}
              />

              {lng.code === current && <CheckIconStyled />}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
}
