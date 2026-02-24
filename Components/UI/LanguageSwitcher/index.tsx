import { Box, SxProps, Theme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CheckIconStyled, LangFlag, LangText } from "./styled";

import ExpandLessIcon from "@/assets/Icons/ExpendLess-Arrow.svg";
import ExpandMoreIcon from "@/assets/Icons/ExpendMore-Arrow.svg";
import CheckIcon from "@/assets/Icons/true-icon.svg";
import portugalFlag from "@/assets/Images/Icons/flags/portugal-flag.png";
import unitedStatesFlag from "@/assets/Images/Icons/flags/united-states-flag.png";

import useIsMobile from "@/hooks/useIsMobile";
import i18n from "i18next";
import Image from "next/image";

const languages = [
  { code: "pt", label: "Português", flag: portugalFlag },
  { code: "en", label: "English", flag: unitedStatesFlag },
];

export default function LanguageSwitcher({
  sx,
  mobileBreakpoint,
  onLanguageChange,
}: {
  sx?: SxProps<Theme>;
  mobileBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl";
  onLanguageChange?: () => void;
}) {
  const current = i18n.language || "en";
  const isMobile = useIsMobile(mobileBreakpoint || "md");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    onLanguageChange?.();
    handleClose();
  };

  const selected = languages.find((l) => l.code === current) ?? languages[1];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (anchorEl) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <Box ref={wrapperRef} sx={{ position: "relative" }} width={"fit-content"}>
      <Box
        onClick={Boolean(anchorEl) ? handleClose : handleOpen}
        height={isMobile ? "28px" : "40px"}
        sx={{
          width: "fit-content",
          padding: isMobile ? "7px 10px" : "10px 14px",
          border: "1px solid #E8F0FF",
          display: "flex",
          justifyContent: "space-between",
          gap: isMobile ? "10px" : "14px",
          alignItems: "center",
          borderRadius: "6px",
          cursor: "pointer",
          background: "#fff",
          ...sx,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
            gap: isMobile ? "10px" : "14px",
          }}
        >
          <Box
            style={{
              height: isMobile ? "14px" : "20px",
              width: "1px",
              background: "#ddd",
            }}
          />
          {Boolean(anchorEl) ? (
            <Image
              src={ExpandLessIcon.src}
              alt="expand"
              width={isMobile ? 7 : 11}
              height={isMobile ? 4 : 6}
            />
          ) : (
            <Image
              src={ExpandMoreIcon.src}
              alt="expand"
              width={isMobile ? 7 : 11}
              height={isMobile ? 4 : 6}
            />
          )}
        </Box>
      </Box>

      {/* Floating full component */}
      {Boolean(anchorEl) && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: 0,
            width: "169px",
            border: "1px solid #E8F0FF",
            borderRadius: isMobile ? "2px" : "6px",
            background: "#fff",
            zIndex: 2000,
            padding: "10px 6px 6px",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <Box
            onClick={handleClose}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isMobile ? "0px 8px 6px" : "0px 8px 10px",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LangFlag
                src={selected.flag.src}
                alt="flag"
                style={{ height: "16px", width: "16px" }}
              />
              <LangText>{selected.code.toUpperCase()}</LangText>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <Box
                style={{
                  height: isMobile ? "14px" : "20px",
                  width: "1px",
                  background: "#ddd",
                }}
              />
              <Image
                src={ExpandLessIcon.src}
                alt="expand"
                width={isMobile ? 7 : 11}
                height={isMobile ? 4 : 6}
              />
            </Box>
          </Box>

          {/* List */}
          {languages.map((lng) => (
            <Box
              key={lng.code}
              onClick={() => changeLang(lng.code)}
              sx={{
                background: lng.code === current ? "#E8F0FF" : "transparent",
                "&:hover": { background: "#E8F0FF" },
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "63px",
                cursor: "pointer",
                mb: "6px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <LangFlag
                  src={lng.flag.src}
                  alt="flag"
                  style={{ height: "16px", width: "16px" }}
                />
                <LangText>
                  {lng.code.toUpperCase()} - {lng.label}
                </LangText>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {lng.code === current && (
                  <CheckIconStyled
                    style={{
                      width: "11px",
                      height: "8px",
                    }}
                    src={CheckIcon.src}
                    alt="check"
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
