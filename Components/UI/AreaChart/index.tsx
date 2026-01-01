import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import Image from "next/image";
import { Box, Typography, useTheme } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import CalendarTodayIcon from "@/assets/Icons/calendar-icon.svg";
import { RoundedStackIcon } from "@/utils/customIcons";


export interface AreaChartData {
  [key: string]: string | number;
}

export interface AreaChartProps {
  // Data
  data: AreaChartData[];
  dataKey: string; // Key for X-axis (e.g., "date", "label")
  valueKey: string; // Key for Y-axis values (e.g., "value", "volume")

  // Styling
  height?: number;
  width?: string | number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  dotColor?: string;
  dotRadius?: number;
  showDots?: boolean;
  showGrid?: boolean;
  gridColor?: string;
  gridStrokeDasharray?: string;
  showVerticalGrid?: boolean;
  showXAxisLine?: boolean;
  showYAxisLine?: boolean;

  // Axis customization
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisTickFormatter?: (value: any, index: number) => string;
  yAxisTickFormatter?: (value: any, index: number) => string;
  yAxisDomain?: [number | string, number | string];
  yAxisInterval?: number;
  yAxisTickCount?: number;

  // Tooltip
  showTooltip?: boolean;
  tooltipLabelFormatter?: (value: any) => string;
  tooltipValueFormatter?: (value: any, name: string) => [string, string];
  tooltipLabel?: string;
  tooltipValuePrefix?: string;
  tooltipValueSuffix?: string;

  // Area fill
  fillOpacity?: number;
  gradientId?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  gradientStartOpacity?: number;
  gradientEndOpacity?: number;

  // Spacing
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  // Additional customization
  curveType?:
    | "monotone"
    | "linear"
    | "natural"
    | "step"
    | "stepBefore"
    | "stepAfter";
  connectNulls?: boolean;
  isAnimationActive?: boolean;
  animationDuration?: number;

  // Container styling
  containerSx?: any;
  chartSx?: any;

  // Fixed width and scroll
  fixedWidth?: number;
  enableHorizontalScroll?: boolean;

  // Grid cell dimensions (for fixed grid sizing)
  gridCellWidth?: number; // Width of each grid cell (horizontal spacing between data points)
  gridCellHeight?: number; // Height of each grid cell (vertical spacing between Y-axis ticks)
  gridCellWidthMobile?: number; // Mobile grid cell width (default: 70)
  gridCellHeightMobile?: number; // Mobile grid cell height (default: 70)
  gridCellWidthDesktop?: number; // Desktop grid cell width (default: 150)
  gridCellHeightDesktop?: number; // Desktop grid cell height (default: 75)
  
  // Data visibility
  hasData?: boolean; // Whether to show the area/line (default: true, calculated from data if not provided)
}

const CustomTooltip = ({
  active,
  payload,
  labelFormatter,
  valueFormatter,
  label,
  valuePrefix = "",
  valueSuffix = "",
  isMobile,
  coordinate,
}: any) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const labelText = labelFormatter
      ? labelFormatter(data)
      : payload[0].payload[payload[0].dataKey];
    const value = payload[0].value;
    const formattedValue = valueFormatter
      ? valueFormatter(value, payload[0].name)
      : [`${valuePrefix}${value}${valueSuffix}`, label || "Value"];

    return (
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          padding: isMobile ? "8px" : "12px",
          border: `1px solid ${theme.palette.border.main}`,
          borderRadius: "14px",
          position: "relative",
          boxShadow: "0 4px 6.3px 0 rgba(52, 93, 157, 0.09)",
          zIndex: 50,
          transform: "translateX(-50%)", // Center the tooltip horizontally below the dot

          "&::before": {
            content: '""',
            position: "absolute",
            left: "50%",
            top: "-7px",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: `7px solid ${theme.palette.border.main}`,
            zIndex: -1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            top: "-5px",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "7px solid #fff",
            zIndex: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "4px" : "5px",
          }}
        >
          <Image
            src={CalendarTodayIcon}
            alt="calendar-icon"
            width={isMobile ? 11 : 14}
            height={isMobile ? 11 : 14}
          />
          <Typography
            sx={{
              fontSize: isMobile ? "10px" : "12px",
              fontFamily: "UrbanistMedium",
              color: theme.palette.text.secondary,
              lineHeight: 1.2,
            }}
          >
            {labelText}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "4px" : "5px",
            paddingTop: isMobile ? "8px" : "10px",
          }}
        >
          <RoundedStackIcon fill={theme.palette.primary.main} size={isMobile ? 10 : 12} />
          {/* <Image
            src={RoundedStackIcon}
            alt="Rounded Stack Icon"
            width={isMobile ? 10 : 12}
            height={isMobile ? 10 : 12}
            style={{
              color: theme.palette.primary.main,
              filter:
                "invert(9%) sepia(100%) saturate(6955%) hue-rotate(246deg) brightness(96%) contrast(142%)",
            }}
          /> */}
          <Typography
            sx={{
              fontSize: isMobile ? "10px" : "12px",
              fontFamily: "UrbanistMedium",
              color: theme.palette.primary.main,
              lineHeight: 1.2,
            }}
          >
            {typeof formattedValue === "string"
              ? formattedValue
              : `${formattedValue[1]}: ${formattedValue[0]}`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

const CustomDot = ({ cx = 20, cy = 20, fill, r = 5, ...props }: any) => {
  // Use a static filter ID since all dots can share the same filter
  // Ensure dots are interactive for tooltip
  return (
    <g {...props} style={{ pointerEvents: "all", cursor: "pointer" }}>
      {/* Blurred background circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        strokeWidth={1}
        stroke={fill}
        filter={`blur(12px)`}
        opacity={0.6}
      />
      {/* Sharp foreground circle */}
      <circle cx={cx} cy={cy} r={r} strokeWidth={1} fill={fill} />
    </g>
  );
};

const ReusableAreaChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  valueKey,
  height = 200,
  width = "100%",
  strokeColor,
  fillColor,
  strokeWidth = 2.5,
  dotColor,
  dotRadius = 0,
  showDots = true,
  showGrid = true,
  gridColor = "#E9ECF2",
  gridStrokeDasharray = "3 3",
  showVerticalGrid = true,
  showXAxisLine = true,
  showYAxisLine = true,
  showXAxis = true,
  showYAxis = true,
  xAxisLabel,
  yAxisLabel,
  xAxisTickFormatter,
  yAxisTickFormatter,
  yAxisDomain,
  yAxisInterval,
  yAxisTickCount,
  showTooltip = true,
  tooltipLabelFormatter,
  tooltipValueFormatter,
  tooltipLabel,
  tooltipValuePrefix = "",
  tooltipValueSuffix = "",
  fillOpacity = 0.2,
  gradientId = "areaGradient",
  gradientStartColor,
  gradientEndColor,
  gradientStartOpacity = 0.2,
  gradientEndOpacity = 0.05,
  margin = { top: 5, right: 0, bottom: 5, left: 0 },
  curveType = "monotone",
  connectNulls = false,
  isAnimationActive = true,
  animationDuration = 500,
  containerSx,
  chartSx,
  fixedWidth,
  enableHorizontalScroll = false,
  gridCellWidth,
  gridCellHeight,
  gridCellWidthMobile = 70,
  gridCellHeightMobile = 70,
  gridCellWidthDesktop = 150,
  gridCellHeightDesktop = 75,
  hasData: hasDataProp,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");

  // Drag scroll refs and state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Use theme colors if not provided
  const finalStrokeColor = strokeColor || theme.palette.primary.main;
  const finalFillColor = fillColor || theme.palette.primary.main;
  const finalDotColor = dotColor || theme.palette.primary.main;
  const finalGradientStartColor =
    gradientStartColor || theme.palette.primary.main;
  const finalGradientEndColor = gradientEndColor || theme.palette.primary.main;

  // Determine if we should show the area/line
  const shouldShowArea = useMemo(() => {
    if (hasDataProp !== undefined) return hasDataProp;
    // Auto-detect: check if there are any non-zero values
    const values = data
      .map((item) => Number(item[valueKey]))
      .filter((v) => !isNaN(v));
    return values.some((v) => v > 0);
  }, [hasDataProp, data, valueKey]);

  // Use the provided data directly (it should already be processed with all dates filled)
  const chartData = data;

  // Calculate Y-axis domain if not provided
  const calculatedYAxisDomain = useMemo(() => {
    const values = chartData
      .map((item) => Number(item[valueKey]))
      .filter((v) => !isNaN(v));
    
    if (values.length === 0) {
      // If no data, return default domain or provided domain
      return yAxisDomain || [0, 16000];
    }

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    if (yAxisDomain) {
      // If domain is provided, ensure it accommodates all data points
      const [minDomain, maxDomain] = yAxisDomain;
      const minNum = typeof minDomain === "string" ? parseFloat(minDomain) : Number(minDomain);
      const maxNum = typeof maxDomain === "string" ? parseFloat(maxDomain) : Number(maxDomain);
      
      // Always ensure the domain can accommodate the max value with padding for curve interpolation
      if (maxValue > maxNum) {
        // Calculate appropriate rounding based on value magnitude
        let roundedMax;
        if (maxValue >= 100000) {
          roundedMax = Math.ceil((maxValue * 1.3) / 10000) * 10000; // 30% padding for large values
        } else if (maxValue >= 10000) {
          roundedMax = Math.ceil((maxValue * 1.3) / 5000) * 5000;
        } else if (maxValue >= 1000) {
          roundedMax = Math.ceil((maxValue * 1.3) / 1000) * 1000;
        } else {
          roundedMax = Math.ceil((maxValue * 1.3) / 100) * 100;
        }
        return [minNum, roundedMax];
      }
      // If max value fits, use the provided domain but ensure it's properly rounded
      let roundedMax;
      if (maxNum >= 100000) {
        roundedMax = Math.ceil(maxNum / 10000) * 10000;
      } else if (maxNum >= 10000) {
        roundedMax = Math.ceil(maxNum / 5000) * 5000;
      } else if (maxNum >= 1000) {
        roundedMax = Math.ceil(maxNum / 1000) * 1000;
      } else {
        roundedMax = Math.ceil(maxNum / 100) * 100;
      }
      return [minNum, roundedMax];
    }

    // Auto-calculate domain if not provided
    // Add padding to ensure all values fit within the domain
    // For natural curves, add extra padding as interpolation can create peaks beyond data points
    const valueRange = maxValue - minValue;
    const basePadding = Math.max(
      valueRange * 0.15, // 15% padding based on range
      maxValue * 0.1 // Or 10% of max value, whichever is larger
    );
    
    // Add extra padding for natural/curved interpolation types
    let curvePadding = 0;
    if (curveType === "natural") {
      // For natural curves, use aggressive padding for large value jumps
      const hasLargeJump = valueRange > maxValue * 0.5;
      if (hasLargeJump) {
        curvePadding = maxValue * 0.4; // 40% for large jumps
      } else {
        curvePadding = maxValue * 0.25; // 25% for smaller ranges
      }
    } else if (curveType === "monotone") {
      curvePadding = maxValue * 0.15; // 15% for monotone
    }
    
    const padding = basePadding + curvePadding;
    const paddedMax = maxValue + padding;

    // Determine appropriate rounding based on value magnitude
    let roundedMax;
    if (paddedMax >= 100000) {
      roundedMax = Math.ceil((paddedMax + 1000) / 10000) * 10000;
    } else if (paddedMax >= 10000) {
      roundedMax = Math.ceil((paddedMax + 500) / 5000) * 5000;
    } else if (paddedMax >= 1000) {
      roundedMax = Math.ceil((paddedMax + 100) / 1000) * 1000;
    } else {
      roundedMax = Math.ceil((paddedMax + 10) / 100) * 100;
    }

    // Final safety check: ensure roundedMax is always significantly greater than maxValue
    if (roundedMax <= maxValue) {
      if (maxValue >= 100000) {
        roundedMax = Math.ceil((maxValue * 1.5) / 10000) * 10000;
      } else if (maxValue >= 10000) {
        roundedMax = Math.ceil((maxValue * 1.5) / 5000) * 5000;
      } else if (maxValue >= 1000) {
        roundedMax = Math.ceil((maxValue * 1.5) / 1000) * 1000;
      } else {
        roundedMax = Math.ceil((maxValue * 1.5) / 100) * 100;
      }
    } else {
      // Add additional safety buffer for curve interpolation
      const safetyBuffer = curveType === "natural" 
        ? roundedMax * 0.15 // 15% extra buffer for natural curves
        : roundedMax * 0.1; // 10% for others
      roundedMax = roundedMax + safetyBuffer;
      
      // Re-round after adding buffer
      if (roundedMax >= 100000) {
        roundedMax = Math.ceil(roundedMax / 10000) * 10000;
      } else if (roundedMax >= 10000) {
        roundedMax = Math.ceil(roundedMax / 5000) * 5000;
      } else if (roundedMax >= 1000) {
        roundedMax = Math.ceil(roundedMax / 1000) * 1000;
      } else {
        roundedMax = Math.ceil(roundedMax / 100) * 100;
      }
      
      // Final verification: ensure it's at least 20% above maxValue for natural curves
      if (curveType === "natural" && roundedMax < maxValue * 1.2) {
        if (maxValue >= 100000) {
          roundedMax = Math.ceil((maxValue * 1.2) / 10000) * 10000;
        } else if (maxValue >= 10000) {
          roundedMax = Math.ceil((maxValue * 1.2) / 5000) * 5000;
        } else if (maxValue >= 1000) {
          roundedMax = Math.ceil((maxValue * 1.2) / 1000) * 1000;
        } else {
          roundedMax = Math.ceil((maxValue * 1.2) / 100) * 100;
        }
      }
    }

    return [0, roundedMax];
  }, [chartData, valueKey, yAxisDomain, curveType]);

  // Calculate chart dimensions based on grid cell size
  const calculatedChartDimensions = useMemo(() => {
    // Check if any grid cell props are provided
    const hasGridCellProps =
      gridCellWidth ||
      gridCellHeight ||
      gridCellWidthMobile ||
      gridCellHeightMobile ||
      gridCellWidthDesktop ||
      gridCellHeightDesktop;

    if (hasGridCellProps) {
      const dataPoints = data.length;

      // Adjust cell width based on data points count
      // If data points > 10, reduce cell width to make chart more compact
      let baseCellWidth =
        gridCellWidth ||
        (isMobile ? gridCellWidthMobile : gridCellWidthDesktop);
      let baseCellHeight =
        gridCellHeight ||
        (isMobile ? gridCellHeightMobile : gridCellHeightDesktop);

      if (dataPoints > 10) {
        // Reduce cell width proportionally for mobile and desktop
        if (isMobile) {
          // Mobile: reduce more aggressively
          baseCellWidth = baseCellWidth * (10 / dataPoints) * 0.8; // Scale down more
        } else {
          // Desktop: reduce less aggressively
          baseCellWidth = baseCellWidth * (10 / dataPoints) * 0.9; // Scale down less
        }
      }

      const cellWidth = baseCellWidth;
      const cellHeight = baseCellHeight;

        // Calculate width: (number of data points - 1) * cell width + margins
        const calculatedWidth =
          (dataPoints - 1) * cellWidth +
          (margin?.left || 0) +
          (margin?.right || 0) +
          20; // Minimal padding for Y-axis labels

        // Calculate height: number of Y-axis intervals * cell height + margins
        const [minDomain, maxDomain] = calculatedYAxisDomain;
        const minNum =
          typeof minDomain === "string"
            ? parseFloat(minDomain)
            : Number(minDomain);
        const maxNum =
          typeof maxDomain === "string"
            ? parseFloat(maxDomain)
            : Number(maxDomain);
        const yIntervals = 4; // Based on our tick count
        const calculatedHeight =
          yIntervals * cellHeight +
          (margin?.top || 0) +
          (margin?.bottom || 0) +
          10; // Minimal padding

      return { width: calculatedWidth, height: calculatedHeight };
    }
    return null;
  }, [
    gridCellWidth,
    gridCellHeight,
    gridCellWidthMobile,
    gridCellHeightMobile,
    gridCellWidthDesktop,
    gridCellHeightDesktop,
    isMobile,
    chartData.length,
    calculatedYAxisDomain,
    margin,
  ]);

  const chartWidth =
    fixedWidth ||
    calculatedChartDimensions?.width ||
    (enableHorizontalScroll ? 800 : undefined);
  const chartHeight = calculatedChartDimensions?.height || height;

  // Enable scroll if: explicitly enabled OR chart width is calculated (grid cells provided)
  // This ensures scroll works on all screen sizes when grid dimensions are set
  const shouldScroll =
    enableHorizontalScroll || calculatedChartDimensions?.width !== undefined;

  // Drag scroll handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!scrollContainerRef.current || !shouldScroll) return;
      // Don't start drag if clicking on interactive elements
      if (
        (e.target as HTMLElement).closest("button") ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest(".recharts-tooltip-wrapper")
      )
        return;
      e.preventDefault();
      e.stopPropagation();
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current =
        e.pageX - (scrollContainerRef.current.offsetLeft || 0);
      scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    },
    [shouldScroll]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleMouseUp = useCallback((e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) {
      e.stopPropagation();
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(
    (e?: React.MouseEvent<HTMLDivElement>) => {
      if (e) {
        e.stopPropagation();
      }
      isDraggingRef.current = false;
      setIsDragging(false);
    },
    []
  );

  return (
    <Box
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: shouldScroll ? "100%" : width,
        height: chartHeight,
        position: "relative",
        overflowX: shouldScroll ? "auto" : "visible",
        overflowY: "hidden",
        outline: "none",
        border: "none",
        cursor: shouldScroll ? (isDragging ? "grabbing" : "grab") : "pointer",
        userSelect: shouldScroll ? "none" : "auto",
        WebkitUserSelect: shouldScroll ? "none" : "auto",
        MozUserSelect: shouldScroll ? "none" : "auto",
        msUserSelect: shouldScroll ? "none" : "auto",
        willChange: shouldScroll && isDragging ? "scroll-position" : "auto",
        "&:focus": {
          outline: "none",
          border: "none",
        },
        "&:focus-visible": {
          outline: "none",
          border: "none",
        },
        "& *": {
          outline: "none !important",
          userSelect: shouldScroll ? "none" : "auto",
          WebkitUserDrag: shouldScroll ? "none" : "auto",
          "&:focus": {
            outline: "none !important",
            border: "none !important",
          },
          "&:focus-visible": {
            outline: "none !important",
            border: "none !important",
          },
        },
        "&::-webkit-scrollbar": {
          height: "0px",
        },
        "&::-webkit-scrollbar-track": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          display: "none",
        },
        // For Firefox
        scrollbarWidth: "none",
        ...containerSx,
      }}
    >
      <Box
        sx={{
          width: shouldScroll ? chartWidth : "100%",
          height: chartHeight || "100%",
          minWidth: shouldScroll ? chartWidth : "auto",
          outline: "none",
          "&:focus": {
            outline: "none",
            border: "none",
          },
          "&:focus-visible": {
            outline: "none",
            border: "none",
          },
        }}
      >
        <ResponsiveContainer
          width={calculatedChartDimensions?.width ? chartWidth : "100%"}
          height={calculatedChartDimensions?.height ? chartHeight : "100%"}
        >
          <Box
            component="style"
            dangerouslySetInnerHTML={{
              __html: `
                /* Make the area fill and stroke not trigger tooltip - only dots will trigger */
                .recharts-area-curve {
                  pointer-events: none !important;
                }
                .recharts-area-area {
                  pointer-events: none !important;
                }
                .recharts-area {
                  pointer-events: none !important;
                }
                /* Keep dots interactive */
                .recharts-dot {
                  pointer-events: all !important;
                  cursor: pointer !important;
                }
                .recharts-active-dot {
                  pointer-events: all !important;
                  cursor: pointer !important;
                }
                /* Ensure tooltip wrapper is positioned correctly */
                .recharts-tooltip-wrapper {
                  pointer-events: none !important;
                }
              `,
            }}
          />
          <AreaChart
            data={chartData}
            margin={margin}
            style={{
              outline: "none",
              border: "none",
              cursor: isDragging ? "grabbing" : "grab",
              ...chartSx,
            }}
            responsive={true}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={finalGradientStartColor}
                  stopOpacity={gradientStartOpacity}
                />
                <stop
                  offset="80%"
                  stopColor={finalGradientEndColor}
                  stopOpacity={gradientEndOpacity}
                />
              </linearGradient>
            </defs>

            {showGrid && (
              <CartesianGrid
                strokeDasharray={gridStrokeDasharray}
                stroke={gridColor}
                vertical={showVerticalGrid}
                horizontal={true}
              />
            )}

            {showXAxis && (
              <XAxis
                dataKey={dataKey}
                tick={{
                  fontSize: isMobile ? 10 : 12,
                  fill: theme.palette.text.secondary,
                  fontFamily: "UrbanistRegular",
                  dy: isMobile ? 3 : 6,
                }}
                tickLine={true}
                axisLine={showXAxisLine}
                tickFormatter={xAxisTickFormatter}
                label={
                  xAxisLabel
                    ? {
                        value: xAxisLabel,
                        position: "insideBottom",
                        offset: -5,
                      }
                    : undefined
                }
                padding={{ left: 0, right: 0 }}
              />
            )}

            {showYAxis && (
              <YAxis
                tick={{
                  fontSize: isMobile ? 10 : 12,
                  fill: theme.palette.text.secondary,
                  fontFamily: "UrbanistRegular",
                  dx: isMobile ? -3 : -6, // Add padding between text and tick line
                }}
                tickLine={true}
                axisLine={showYAxisLine}
                domain={calculatedYAxisDomain}
                tickFormatter={yAxisTickFormatter}
                interval={yAxisInterval}
                tickCount={yAxisTickCount || 5}
                ticks={(() => {
                  const [min, max] = calculatedYAxisDomain;
                  const minNum =
                    typeof min === "string" ? parseFloat(min) : Number(min);
                  const maxNum =
                    typeof max === "string" ? parseFloat(max) : Number(max);
                  
                  // If domain is default (0, 16000) or max is 16000, use 4000 intervals
                  if ((!yAxisDomain && maxNum === 16000) || (yAxisDomain && maxNum === 16000)) {
                    return [0, 4000, 8000, 12000, 16000];
                  }
                  
                  // Otherwise, calculate equal intervals
                  const interval = (maxNum - minNum) / 4; // 5 ticks = 4 equal intervals
                  return [
                    minNum,
                    minNum + interval,
                    minNum + interval * 2,
                    minNum + interval * 3,
                    maxNum,
                  ];
                })()}
                label={
                  yAxisLabel
                    ? { value: yAxisLabel, angle: -90, position: "insideLeft" }
                    : undefined
                }
                padding={{ top: 0, bottom: 0 }}
                width={40} // Reduced width to minimize extra space
              />
            )}

            {showTooltip && (
              <Tooltip
                content={(props: any) => {
                  // Only show tooltip when hovering over a dot
                  // shared={false} ensures tooltip only shows on specific data points
                  if (!props.active || !props.payload || props.payload.length === 0) {
                    return null;
                  }
                  return (
                    <CustomTooltip
                      {...props}
                      labelFormatter={tooltipLabelFormatter}
                      valueFormatter={tooltipValueFormatter}
                      label={tooltipLabel}
                      valuePrefix={tooltipValuePrefix}
                      valueSuffix={tooltipValueSuffix}
                      isMobile={isMobile}
                    />
                  );
                }}
                cursor={false}
                shared={false}
                allowEscapeViewBox={{ x: false, y: true }}
                offset={0}
                filterNull={false}
              />
            )}

            {/* Only render Area if we have actual data, otherwise just show the grid */}
            {shouldShowArea && (
              <Area
                type={curveType}
                dataKey={valueKey}
                stroke={finalStrokeColor}
                strokeWidth={strokeWidth}
                fill={`url(#${gradientId})`}
                fillOpacity={1}
                connectNulls={connectNulls}
                isAnimationActive={isAnimationActive}
                animationDuration={animationDuration}
                dot={
                  showDots ? (
                    <CustomDot fill={finalDotColor} r={dotRadius} />
                  ) : (
                    false
                  )
                }
                activeDot={{
                  r: dotRadius + 3,
                  fill: finalDotColor,
                  stroke: "none",
                  strokeWidth: 0,
                }}
                style={{
                  outline: "none",
                  border: "none",
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ReusableAreaChart;
