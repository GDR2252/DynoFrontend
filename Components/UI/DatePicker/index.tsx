/**
 * DatePicker Component
 *
 * A customizable date range picker component with a button trigger that opens a popover
 * with presets and filter options. The button displays the selected date range.
 *
 * @example
 * ```tsx
 * import CustomDatePicker, { DateRange } from "@/Components/UI/DatePicker";
 *
 * const MyComponent = () => {
 *   const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
 *
 *   return (
 *     <CustomDatePicker
 *       value={dateRange}
 *       onChange={(range) => setDateRange(range)}
 *       onPresetChange={(preset) => console.log("Preset selected:", preset)}
 *       showPresets={true}
 *       placeholder="Select date range"
 *       fullWidth={true}
 *     />
 *   );
 * };
 * ```
 */

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Box, Typography, useTheme, Popover } from "@mui/material";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  subDays,
  addMonths,
  subMonths,
  startOfDay,
} from "date-fns";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useIsMobile from "@/hooks/useIsMobile";
import {
  StyledDatePickerContainer,
  ContentContainer,
  PresetsSidebar,
  PresetTitle,
  PresetItem,
  CalendarContainer,
  CalendarHeader,
  CalendarHeaderText,
  WeekdayHeader,
  WeekdayCell,
  CalendarGrid,
  DateCellWrapper,
  DateButton,
  NavigationButton,
  TriggerButton,
  DividerLine,
} from "./styled";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DatePickerProps {
  value?: DateRange;
  onChange?: (dateRange: DateRange) => void;
  onPresetChange?: (preset: string) => void;
  showPresets?: boolean;
  className?: string;
  placeholder?: string;
  buttonText?: string;
  fullWidth?: boolean;
  hideTrigger?: boolean;
  trigger?:
    | React.ReactElement
    | ((
        onClick: (event: React.MouseEvent<HTMLElement>) => void
      ) => React.ReactElement);
}

type PresetType =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "last7Days"
  | "last30Days";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const getPresetDates = (preset: PresetType): DateRange => {
  const today = startOfDay(new Date());
  const startOfToday = today;
  const endOfToday = today;

  switch (preset) {
    case "today":
      return { startDate: startOfToday, endDate: endOfToday };
    case "yesterday":
      const yesterday = subDays(today, 1);
      return { startDate: yesterday, endDate: yesterday };
    case "thisWeek":
      return { startDate: startOfWeek(today), endDate: endOfWeek(today) };
    case "lastWeek":
      const lastWeekStart = startOfWeek(subDays(today, 7));
      return { startDate: lastWeekStart, endDate: endOfWeek(lastWeekStart) };
    case "thisMonth":
      return { startDate: startOfMonth(today), endDate: endOfMonth(today) };
    case "lastMonth":
      const lastMonth = subMonths(today, 1);
      return {
        startDate: startOfMonth(lastMonth),
        endDate: endOfMonth(lastMonth),
      };
    case "last7Days":
      return { startDate: subDays(today, 6), endDate: today };
    case "last30Days":
      return { startDate: subDays(today, 29), endDate: today };
    default:
      return { startDate: null, endDate: null };
  }
};

const detectPreset = (dateRange: DateRange): PresetType | null => {
  if (!dateRange.startDate || !dateRange.endDate) {
    return null;
  }

  const presets: PresetType[] = [
    "today",
    "yesterday",
    "thisWeek",
    "lastWeek",
    "thisMonth",
    "lastMonth",
    "last7Days",
    "last30Days",
  ];

  for (const preset of presets) {
    const presetDates = getPresetDates(preset);
    if (
      presetDates.startDate &&
      presetDates.endDate &&
      isSameDay(dateRange.startDate, presetDates.startDate) &&
      isSameDay(dateRange.endDate, presetDates.endDate)
    ) {
      return preset;
    }
  }

  return null;
};

// CalendarMonth Component
interface CalendarMonthProps {
  month: Date;
  selectedRange: DateRange;
  onDateClick: (date: Date) => void;
  hoverDate: Date | null;
  onDateHover: (date: Date | null) => void;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  selectedRange,
  onDateClick,
  hoverDate,
  onDateHover,
  onNavigateLeft,
  onNavigateRight,
  showLeftArrow = false,
  showRightArrow = false,
}) => {
  const theme = useTheme();
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const emptyCells = Array(startDayOfWeek).fill(null);

  const isInRange = (date: Date) => {
    const { startDate, endDate } = selectedRange;
    if (!startDate) return false;

    const end = endDate || hoverDate;
    if (!end) return false;

    const start = startDate < end ? startDate : end;
    const endDateValue = startDate < end ? end : startDate;

    return isWithinInterval(date, { start, end: endDateValue });
  };

  const isRangeStart = (date: Date) => {
    const { startDate, endDate } = selectedRange;
    if (!startDate) return false;
    const end = endDate || hoverDate;
    if (!end) return isSameDay(date, startDate);
    return isSameDay(date, startDate < end ? startDate : end);
  };

  const isRangeEnd = (date: Date) => {
    const { startDate, endDate } = selectedRange;
    if (!startDate) return false;
    const end = endDate || hoverDate;
    if (!end) return false;
    return isSameDay(date, startDate < end ? end : startDate);
  };

  const isSelected = (date: Date) => {
    const { startDate, endDate } = selectedRange;
    return (
      (startDate && isSameDay(date, startDate)) ||
      (endDate && isSameDay(date, endDate))
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignSelf: "stretch",
      }}
    >
      <CalendarHeader>
        {showLeftArrow && onNavigateLeft ? (
          <NavigationButton onClick={onNavigateLeft} size="small">
            <ChevronLeftIcon sx={{ fontSize: "16px" }} />
          </NavigationButton>
        ) : (
          <Box sx={{ width: "28px" }} />
        )}
        <CalendarHeaderText>{format(month, "MMMM yyyy")}</CalendarHeaderText>
        {showRightArrow && onNavigateRight ? (
          <NavigationButton onClick={onNavigateRight} size="small">
            <ChevronRightIcon sx={{ fontSize: "16px" }} />
          </NavigationButton>
        ) : (
          <Box sx={{ width: "28px" }} />
        )}
      </CalendarHeader>

      <WeekdayHeader>
        {WEEKDAYS.map((day, i) => (
          <WeekdayCell key={i}>{day}</WeekdayCell>
        ))}
      </WeekdayHeader>

      <CalendarGrid>
        {/* Empty cells at the start to align with weekday headers */}
        {emptyCells.map((_, i) => (
          <DateCellWrapper key={`empty-${i}`} />
        ))}
        {/* Dates from the current month */}
        {days.map((day, i) => {
          const inRange = isInRange(day);
          const isStart = isRangeStart(day);
          const isEnd = isRangeEnd(day);
          const selected = isSelected(day);

          // Check if this is the start or end of the week
          const dayOfWeek = day.getDay();
          const isWeekStart = dayOfWeek === 0; // Sunday (like 7, 14, 21, 28)
          const isWeekEnd = dayOfWeek === 6; // Saturday (like 6, 13, 20, 27)

          // Apply rounded corners if date is in range (but not the actual start/end of the range)
          // - Sunday (start of week) → round left side
          // - Saturday (end of week) → round right side
          const shouldRoundWeekStart =
            inRange && !isStart && !isEnd && isWeekStart;
          const shouldRoundWeekEnd = inRange && !isStart && !isEnd && isWeekEnd;

          return (
            <DateCellWrapper
              key={`day-${i}`}
              inRange={!!(inRange && !isStart && !isEnd)}
              isStart={!!(isStart && !isEnd)}
              isEnd={!!(isEnd && !isStart)}
              isWeekStart={shouldRoundWeekStart}
              isWeekEnd={shouldRoundWeekEnd}
            >
              <DateButton
                selected={!!selected}
                iscurrentmonth={true}
                isStart={!!(isStart && !isEnd)}
                isEnd={!!(isEnd && !isStart)}
                onClick={() => onDateClick(day)}
                onMouseEnter={() => onDateHover(day)}
                onMouseLeave={() => onDateHover(null)}
              >
                {format(day, "d")}
              </DateButton>
            </DateCellWrapper>
          );
        })}
      </CalendarGrid>
    </Box>
  );
};

export interface DatePickerRef {
  open: (event: React.MouseEvent<HTMLElement>) => void;
  close: () => void;
  isOpen: () => boolean;
}

// Main Component
const CustomDatePicker = forwardRef<DatePickerRef, DatePickerProps>(({
  value,
  onChange,
  onPresetChange,
  showPresets = true,
  className,
  placeholder = "Select date range",
  buttonText,
  fullWidth = false,
  hideTrigger = false,
  trigger,
}, ref) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const today = startOfDay(new Date());

  const [selectedRange, setSelectedRange] = useState<DateRange>(() => {
    if (value && value.startDate && value.endDate) {
      return value;
    }
    // Initialize with "thisMonth" preset if no value provided
    return getPresetDates("thisMonth");
  });
  const [leftMonth, setLeftMonth] = useState(subMonths(today, 1));
  const [rightMonth, setRightMonth] = useState(today);
  const [activePreset, setActivePreset] = useState<PresetType | null>(() => {
    if (value && value.startDate && value.endDate) {
      return detectPreset(value);
    }
    return "thisMonth";
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHoverDate(null);
    setIsSelectingEnd(false);
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    open: (event: React.MouseEvent<HTMLElement>) => {
      handleOpen(event);
    },
    close: () => {
      handleClose();
    },
    isOpen: () => {
      return isOpen;
    },
  }));

  const formatDateRange = (): string => {
    const { startDate, endDate } = selectedRange;
    if (startDate && endDate) {
      if (isMobile) {
        return `${format(startDate, "dd.MM.yy")}-${format(endDate, "dd.MM.yy")}`;
      }
      return `${format(startDate, "MMM dd, yyyy")} - ${format(
        endDate,
        "MMM dd, yyyy"
      )}`;
    }
    if (startDate) {
      if (isMobile) {
        return format(startDate, "dd.MM.yy");
      }
      return format(startDate, "MMM dd, yyyy");
    }
    if (buttonText) {
      return buttonText;
    }
    return placeholder;
  };

  useEffect(() => {
    if (value) {
      setSelectedRange(value);
      const detectedPreset = detectPreset(value);
      setActivePreset(detectedPreset);
      if (value.startDate) {
        setLeftMonth(subMonths(value.startDate, 0));
        setRightMonth(addMonths(value.startDate, 1));
      }
    } else if (!value) {
      // If value is cleared, reset to "thisMonth" preset
      const presetDates = getPresetDates("thisMonth");
      setSelectedRange(presetDates);
      setActivePreset("thisMonth");
      if (onChange) {
        onChange(presetDates);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handlePresetClick = (preset: PresetType) => {
    setActivePreset(preset);
    const presetDates = getPresetDates(preset);
    setSelectedRange(presetDates);
    if (onChange) {
      onChange(presetDates);
    }
    if (onPresetChange) {
      onPresetChange(preset);
    }
    if (presetDates.startDate) {
      setLeftMonth(subMonths(presetDates.startDate, 0));
      setRightMonth(addMonths(presetDates.startDate, 1));
    }
  };

  const handleDateClick = (date: Date) => {
    if (!isSelectingEnd || !selectedRange.startDate) {
      const newRange = { startDate: date, endDate: null };
      setSelectedRange(newRange);
      setActivePreset(null);
      setIsSelectingEnd(true);
    } else {
      const newRange = {
        startDate:
          selectedRange.startDate < date ? selectedRange.startDate : date,
        endDate:
          selectedRange.startDate < date ? date : selectedRange.startDate,
      };
      setSelectedRange(newRange);
      // Detect if the manually selected range matches a preset
      const detectedPreset = detectPreset(newRange);
      setActivePreset(detectedPreset);
      if (onChange) {
        onChange(newRange);
      }
      setIsSelectingEnd(false);
    }
  };

  const navigateLeft = () => {
    setLeftMonth(subMonths(leftMonth, 1));
    setRightMonth(subMonths(rightMonth, 1));
  };

  const navigateRight = () => {
    setLeftMonth(addMonths(leftMonth, 1));
    setRightMonth(addMonths(rightMonth, 1));
  };

  const presets = [
    { key: "today" as PresetType, label: "Today" },
    { key: "yesterday" as PresetType, label: "Yesterday" },
    { key: "thisWeek" as PresetType, label: "This Week" },
    { key: "lastWeek" as PresetType, label: "Last Week" },
    { key: "thisMonth" as PresetType, label: "This Month" },
    { key: "lastMonth" as PresetType, label: "Last Month" },
    { key: "last7Days" as PresetType, label: "Last 7 Days" },
    { key: "last30Days" as PresetType, label: "Last 30 Days" },
  ];

  const renderTrigger = () => {
    if (hideTrigger) {
      return null;
    }

    if (trigger) {
      if (typeof trigger === "function") {
        return trigger(handleOpen);
      }
      // If it's a React element, clone it and add onClick handler
      if (React.isValidElement(trigger)) {
        const existingOnClick = (trigger.props as any)?.onClick;
        return React.cloneElement(trigger, {
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            handleOpen(e);
            if (existingOnClick) {
              existingOnClick(e);
            }
          },
        } as any);
      }
      return trigger;
    }

    return (
      <TriggerButton
        ref={triggerRef}
        onClick={handleOpen}
        fullWidth={fullWidth}
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "16px", rotate: isOpen ? "180deg" : "0deg" }} />}
        startIcon={<CalendarTodayIcon sx={{ fontSize: "18px" }} />}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontFamily: "UrbanistMedium",
            color:
              selectedRange.startDate && selectedRange.endDate
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
            flex: 1,
            textAlign: "left",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {formatDateRange()}
        </Typography>
      </TriggerButton>
    );
  };

  return (
    <Box sx={{ width: fullWidth ? "100%" : "auto", position: "relative" }}>
      {renderTrigger()}

      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: "8px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "rgba(16, 24, 40, 0.12) 0px 8px 24px 0px",
            maxWidth: isMobile ? "95vw" : "auto",
            border: `1px solid ${theme.palette.border.main}`,
          },
        }}
      >
        <StyledDatePickerContainer className={className}>
          <ContentContainer>
            {showPresets && (
              <PresetsSidebar>
                <PresetTitle>Presets</PresetTitle>
                {presets.map((preset) => (
                  <PresetItem
                    key={preset.key}
                    active={activePreset === preset.key}
                    onClick={() => handlePresetClick(preset.key)}
                  >
                    <p className="label">{preset.label}</p>
                    {activePreset === preset.key && (
                      <Box className="arrow">
                        <ArrowForwardIosIcon
                          sx={{
                            fontSize: "12px",
                            color: theme.palette.text.secondary,
                          }}
                        />
                      </Box>
                    )}
                  </PresetItem>
                ))}
              </PresetsSidebar>
            )}

            <DividerLine />

            <CalendarMonth
              month={leftMonth}
              selectedRange={selectedRange}
              onDateClick={handleDateClick}
              hoverDate={isSelectingEnd ? hoverDate : null}
              onDateHover={setHoverDate}
              onNavigateLeft={navigateLeft}
              onNavigateRight={navigateRight}
              showLeftArrow={true}
              showRightArrow={isMobile}
            />

            <DividerLine
              sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}
            />

            {!isMobile && (
              <CalendarMonth
                month={rightMonth}
                selectedRange={selectedRange}
                onDateClick={handleDateClick}
                hoverDate={isSelectingEnd ? hoverDate : null}
                onDateHover={setHoverDate}
                onNavigateRight={navigateRight}
                showRightArrow={true}
              />
            )}
          </ContentContainer>
        </StyledDatePickerContainer>
      </Popover>
    </Box>
  );
});

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
