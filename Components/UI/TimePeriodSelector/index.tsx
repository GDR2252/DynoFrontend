import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import {
  useTheme,
  SxProps,
  Theme,
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  PeriodTrigger,
  CheckIconStyled,
} from "./styled";
import CalendarTodayIcon from "@/assets/Icons/calendar-icon.svg";
import useIsMobile from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import CustomDatePicker, { DateRange, DatePickerRef } from "@/Components/UI/DatePicker";
import { endOfDay, format, isAfter, isValid, startOfDay } from "date-fns";

import ExpandLessIcon from "@/assets/Icons/ExpendLess-Arrow.svg";
import ExpandMoreIcon from "@/assets/Icons/ExpendMore-Arrow.svg";
import Image from "next/image";

export type TimePeriod = "7days" | "30days" | "90days" | "custom";

export interface TimePeriodOption {
  value: TimePeriod;
  label: string;
}

interface TimePeriodSelectorProps {
  value?: TimePeriod;
  onChange?: (period: TimePeriod) => void;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange) => void;
  sx?: SxProps<Theme>;
}

export default function TimePeriodSelector({
  value = "7days",
  onChange,
  dateRange,
  onDateRangeChange,
  sx,
}: TimePeriodSelectorProps) {
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  const namespaces = ["dashboardLayout", "common"];
  const { t } = useTranslation(namespaces);
  const tDashboard = useCallback(
    (key: string) => t(key, { ns: "dashboardLayout" }),
    [t]
  );

  const timePeriods: TimePeriodOption[] = useMemo(
    () => [
      { value: "7days", label: tDashboard("last7Days") },
      { value: "30days", label: tDashboard("last30Days") },
      { value: "90days", label: tDashboard("last90Days") },
      { value: "custom", label: tDashboard("customPeriod") },
    ],
    [tDashboard]
  );

  const datePickerRef = useRef<DatePickerRef>(null);
  const calendarButtonRef = useRef<HTMLButtonElement | null>(null);
  const [uncontrolledCustomDateRange, setUncontrolledCustomDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const customDateRange = dateRange ?? uncontrolledCustomDateRange;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleCalendarButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    datePickerRef.current?.open(e);
  };

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setFocusedIndex(timePeriods.findIndex((p) => p.value === value) || 0);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setFocusedIndex(0);
  }, []);

  const handleSelect = useCallback(
    (period: TimePeriod) => {
      onChange?.(period);
      setAnchorEl(null);
      setFocusedIndex(0);
    },
    [onChange]
  );

  const handleSelectWithEvent = useCallback(
    (event: React.MouseEvent<HTMLElement>, period: TimePeriod) => {
      if (period !== "custom") {
        handleSelect(period);
        return;
      }

      // Set the value to custom and close the list first. The date picker
      // is only rendered when `value === 'custom'`, so we wait a tick to
      // ensure it mounts and then open it anchored to the calendar button.
      onChange?.("custom");
      setAnchorEl(null);
      setFocusedIndex(0);

      setTimeout(() => {
        const target = (calendarButtonRef.current ?? (event.currentTarget as HTMLElement)) as HTMLElement;
        // Cast to any to match the expected React.MouseEvent signature
        datePickerRef.current?.open(({
          currentTarget: target,
        } as unknown) as React.MouseEvent<HTMLElement>);
      }, 0);
    },
    [handleSelect, onChange]
  );

  const handleCustomDateRangeChange = (range: DateRange) => {
    const normalizedStart =
      range.startDate && isValid(range.startDate) ? startOfDay(range.startDate) : null;
    const normalizedEnd =
      range.endDate && isValid(range.endDate) ? endOfDay(range.endDate) : null;

    const normalizedRange: DateRange = {
      startDate: normalizedStart,
      endDate:
        normalizedStart && normalizedEnd && isAfter(normalizedStart, normalizedEnd)
          ? null
          : normalizedEnd,
    };

    if (dateRange === undefined) {
      setUncontrolledCustomDateRange(normalizedRange);
    }
    onDateRangeChange?.(normalizedRange);
  };

  const formatCustomDateRange = (): string => {
    if (customDateRange.startDate && customDateRange.endDate) {
      if (isMobile) {
        return `${format(customDateRange.startDate, "dd.MM.yy")}-${format(
          customDateRange.endDate,
          "dd.MM.yy"
        )}`;
      }
      return `${format(customDateRange.startDate, "MMM dd, yyyy")} - ${format(
        customDateRange.endDate,
        "MMM dd, yyyy"
      )}`;
    }
    if (customDateRange.startDate) {
      if (isMobile) {
        return format(customDateRange.startDate, "dd.MM.yy");
      }
      return format(customDateRange.startDate, "MMM dd, yyyy");
    }
    return tDashboard("customPeriod");
  };

  // Keyboard navigation
  useEffect(() => {
    if (!anchorEl) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!anchorEl) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < timePeriods.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : timePeriods.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < timePeriods.length) {
            handleSelect(timePeriods[focusedIndex].value);
          }
          break;
        case "Escape":
          event.preventDefault();
          handleClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anchorEl, focusedIndex, timePeriods, handleSelect, handleClose]);

  // Scroll focused item into view
  useEffect(() => {
    if (anchorEl && listRef.current) {
      const focusedItem = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedItem) {
        focusedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [focusedIndex, anchorEl]);

  const selected = timePeriods.find((p) => p.value === value) ?? timePeriods[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
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
    <Box
      ref={wrapperRef}
      sx={{
        position: "relative",
        width: "fit-content",
        mt: Boolean(anchorEl) && isMobile ? "-16px !important" : "0px",
      }}
    >
      {value === "custom" ? (
        <>
          <Button
            ref={calendarButtonRef}
            onClick={handleCalendarButtonClick}
            sx={[
              {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: isMobile ? "8px 10px" : "9px 16px",
                borderRadius: "6px",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "UrbanistMedium",
                color: theme.palette.text.primary,
                backgroundColor: "#FFFFFF",
                border: `1px solid ${theme.palette.border.main}`,
                justifyContent: "space-between",
                whiteSpace: "nowrap",
                width: "fit-content",
                height: isMobile ? "32px" : "40px",
                minWidth: isMobile ? "fit-content" : "200px",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                  borderColor: theme.palette.border.focus,
                },
                "& .separator": {
                  width: "1px",
                  height: isMobile ? "16px" : "20px",
                  backgroundColor: theme.palette.border.main,
                },
              },
              ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
          >
            <Image src={CalendarTodayIcon} alt="calendar" width={isMobile ? 13 : 14} height={isMobile ? 13 : 14} />

            <Typography
              sx={{
                fontSize: isMobile ? "13px" : "15px",
                fontFamily: "UrbanistMedium",
                flex: 1,
                textAlign: "left",
              }}
            >
              {formatCustomDateRange()}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: "14px" }}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget.closest("button"));
                setFocusedIndex(timePeriods.findIndex((p) => p.value === value) || 0);
              }}
            >
              <Box className="separator" />
              <Image
                src={ExpandMoreIcon.src}
                width={isMobile ? 8 : 11}
                height={isMobile ? 4 : 6}
                alt="expand"
              />
            </Box>
          </Button>

          <Box sx={{ position: "absolute", width: 0, height: 0, opacity: 0 }}>
            <CustomDatePicker
              ref={datePickerRef}
              value={customDateRange}
              onChange={handleCustomDateRangeChange}
              hideTrigger
            />
          </Box>
        </>
      ) : (
        <PeriodTrigger onClick={handleOpen}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Box component="img" src={CalendarTodayIcon.src} sx={{ width: 14, height: 14 }} />
            <Typography style={{ fontWeight: "500", fontSize: isMobile ? "13px" : "15px", fontFamily: "UrbanistMedium", whiteSpace: "nowrap" }}>{selected.label}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Box sx={{ width: 1.1, height: isMobile ? 16 : 20, backgroundColor: theme.palette.border.main }} />
            {!anchorEl ? (
              <Image src={ExpandMoreIcon.src} width={isMobile ? 8 : 11} height={isMobile ? 4 : 6} alt="expand" />
            ) : (
              <Image src={ExpandLessIcon.src} width={isMobile ? 8 : 11} height={isMobile ? 4 : 6} alt="collapse" />
            )}
          </Box>
        </PeriodTrigger>
      )}

      {/* ================= DROPDOWN (PERFECT POPOVER CLONE) ================= */}
      {Boolean(anchorEl) && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: 0,
            minWidth: isMobile ? "210px" : value === "custom" ? "256px" : "175px",
            border: "1px solid rgba(233,236,242,1)",
            borderRadius: "6px",
            backgroundColor: "#fff",
            padding: "7px 8px",
            zIndex: 100,
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
              padding: "0px 6px",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Box component="img" src={CalendarTodayIcon.src} sx={{ width: 14, height: 14 }} />
              <Typography style={{ fontWeight: "500", fontSize: isMobile ? "13px" : "15px", fontFamily: "UrbanistMedium", whiteSpace: "nowrap" }}>{selected.label}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <Box sx={{ width: 1.1, height: isMobile ? 16 : 20, backgroundColor: theme.palette.border.main }} />
              <Image src={ExpandLessIcon.src} width={isMobile ? 8 : 11} height={isMobile ? 4 : 6} alt="collapse" />
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ mt: "13px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {timePeriods.map((period, index) => (
              <Box
                key={period.value}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={(e) => handleSelectWithEvent(e, period.value)}
                sx={{
                  borderRadius: "63px",
                  fontSize: isMobile ? "13px" : "15px",
                  fontFamily: "UrbanistMedium",
                  height: "32px",
                  px: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  background:
                    period.value === value || focusedIndex === index
                      ? theme.palette.primary.light
                      : "transparent",
                  "&:hover": {
                    background: theme.palette.primary.light,
                  },
                }}
              >
                {period.label}
                {period.value === value && <CheckIconStyled sx={{ width: 16, height: 16 }} />}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}