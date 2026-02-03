import React, { useCallback, useMemo, useRef, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { formatNumberWithComma, getCurrencySymbol } from "@/helpers";
import useIsMobile from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next";

interface FeeTierProgressProps {
  monthlyLimit?: number;
  usedAmount?: number;
  percentage?: number;
}

const FeeTierProgress: React.FC<FeeTierProgressProps> = ({
  monthlyLimit = 50000,
  usedAmount = 6479.25,
  percentage = 0,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");

  /* Translation */
  const { t } = useTranslation(["dashboardLayout", "common"]);
  const tDashboard = useCallback(
    (key: string) => t(key, { ns: "dashboardLayout" }),
    [t]
  );

  /* Drag Scroll State */
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  /* Drag Handlers */
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    e.preventDefault();
    dragState.current = {
      isDragging: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.isDragging) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragState.current.startX) * 2;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  }, []);

  const stopDragging = useCallback(() => {
    dragState.current.isDragging = false;
    setIsDragging(false);
  }, []);

  /* Date Logic */
  const daysInMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }, []);

  /* Progress */
  const filledBars = useMemo(
    () => Math.round((percentage / 100) * daysInMonth),
    [percentage, daysInMonth]
  );

  /* Amounts */
  const remainingAmount = useMemo(
    () => Math.max(0, monthlyLimit - usedAmount),
    [monthlyLimit, usedAmount]
  );

  const formattedRemaining = useMemo(
    () => formatNumberWithComma(remainingAmount),
    [remainingAmount]
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        sx={{
          display: "flex",
          gap: isMobile ? "3.78px" : "6.19px",
          mb: isMobile ? "8px" : "14px",
          width: "max-content",
          maxWidth: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          willChange: isDragging ? "scroll-position" : "auto",
          "& *": {
            userSelect: "none",
            WebkitUserDrag: "none",
          },
          "&::-webkit-scrollbar": { height: 0 },
          scrollbarWidth: "none",
        }}
      >
        {/* Filled bars */}
        {Array.from({ length: filledBars }).map((_, i) => (
          <Box
            key={`filled-${i}`}
            sx={{
              width: { xs: "8px", md: "10px" },
              maxWidth: { xs: "8px", md: "10px" },
              minWidth: { xs: "8px", md: "10px" },
              flex: { xs: "0 0 8px", md: 1 },
              height: "205px",
              maxHeight: { xs: "85px", md: "205px" },
              minHeight: { xs: "85px", md: "205px" },
              background: theme.palette.primary.main,
              borderRadius: "20px",
              flexShrink: 0,
            }}
          />
        ))}

        {/* Remaining bars */}
        {Array.from({ length: daysInMonth - filledBars }).map((_, i) => (
          <Box
            key={`remaining-${i}`}
            sx={{
              width: { xs: "8px", md: "10px" },
              maxWidth: { xs: "8px", md: "10px" },
              minWidth: { xs: "8px", md: "10px" },
              flex: { xs: "0 0 8px", md: 1 },
              height: "205px",
              maxHeight: { xs: "85px", md: "205px" },
              minHeight: { xs: "85px", md: "205px" },
              background: theme.palette.primary.light,
              borderRadius: "20px",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? "10px" : "13px",
            fontWeight: 500,
            color: theme.palette.primary.main,
            fontFamily: "UrbanistMedium",
            lineHeight: "100%",
            letterSpacing: 0,
          }}
        >
          {percentage.toFixed(1)}% {tDashboard("complete")}
        </Typography>

        <Typography
          sx={{
            fontSize: isMobile ? "10px" : "13px",
            fontWeight: 500,
            color: theme.palette.text.secondary,
            fontFamily: "UrbanistMedium",
            lineHeight: "100%",
            letterSpacing: 0,
          }}
        >
          {getCurrencySymbol("USD", formattedRemaining)}{" "}
          {tDashboard("toNextTier")}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeeTierProgress;