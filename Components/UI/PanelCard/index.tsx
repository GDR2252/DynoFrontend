import React, { ReactNode, memo } from "react";
import { Box, SxProps } from "@mui/material";
import {
  StyledCard,
  CardHeader,
  HeaderContent,
  CardBody,
  HeaderTitle,
  HeaderSubTitle,
} from "./styled";
import useIsMobile from "@/hooks/useIsMobile";

export interface PanelCardProps {
  title?: string;
  subTitle?: string;
  headerIcon?: ReactNode;
  headerAction?: ReactNode;
  headerActionLayout?: "absolute" | "inline";
  headerActionWrapperSx?: SxProps;
  children: ReactNode;
  bodyPadding?: number | string;
  headerPadding?: number | string;
  showHeaderBorder?: boolean;
  sx?: SxProps;
  headerSx?: SxProps;
  subTitleSx?: SxProps;
  bodySx?: SxProps;
  onClick?: () => void;
}

const PanelCard: React.FC<PanelCardProps> = ({
  title,
  subTitle,
  headerIcon,
  headerAction,
  headerActionLayout = "absolute",
  headerActionWrapperSx,
  children,
  bodyPadding,
  headerPadding,
  showHeaderBorder = true,
  sx,
  headerSx,
  subTitleSx,
  bodySx,
  onClick,
}) => {
  const isMobile = useIsMobile("md");

  const showHeader = Boolean(title || headerIcon || headerAction);

  return (
    <StyledCard sx={sx} onClick={onClick}>
      {showHeader && (
        <CardHeader
          sx={{
            padding: headerPadding,
            borderBottom: showHeaderBorder ? undefined : "none",
            ...headerSx,
          }}
        >
          <HeaderContent>
            {headerIcon && <>{headerIcon}</>}
            {(title || subTitle) && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {title && <HeaderTitle sx={headerSx}>{title}</HeaderTitle>}
                {subTitle && (
                  <HeaderSubTitle sx={subTitleSx}>
                    {subTitle}
                  </HeaderSubTitle>
                )}
              </Box>
            )}
          </HeaderContent>

          {headerAction &&
            (headerActionLayout === "inline" ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {headerAction}
              </Box>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: isMobile ? 6 : 12,
                  right: isMobile ? 6 : 12,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "secondary.main",
                  borderRadius: "50px",
                  border: "1px solid #E9ECF2",
                  ...headerActionWrapperSx,
                }}
              >
                {headerAction}
              </Box>
            ))}
        </CardHeader>
      )}

      <CardBody
        sx={{
          padding: bodyPadding,
          ...bodySx,
        }}
      >
        {children}
      </CardBody>
    </StyledCard>
  );
};

export default memo(PanelCard);