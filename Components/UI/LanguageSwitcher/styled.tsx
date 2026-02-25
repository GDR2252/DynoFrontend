import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Image from "next/image";

type Bool = boolean;

export const WrapperBox = styled(Box)`
  position: relative;
  width: fit-content;
`;

export const TriggerBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$isMobile",
})<{ $isMobile: Bool }>`
  width: fit-content;
  border: 1px solid #e8f0ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  background: #fff;
  height: ${({ $isMobile }) => ($isMobile ? "28px" : "40px")};
  padding: ${({ $isMobile }) => ($isMobile ? "7px 10px" : "10px 14px")};
  gap: ${({ $isMobile }) => ($isMobile ? "10px" : "14px")};
`;

export const TriggerLeft = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TriggerRight = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$isMobile",
})<{ $isMobile: Bool }>`
  display: flex;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "10px" : "14px")};
`;

export const TriggerDivider = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$height",
})<{ $height: number }>`
  width: 1px;
  background: #ddd;
  height: ${({ $height }) => `${$height}px`};
`;

export const TriggerExpandIcon = styled(Image)``;

export const DropdownContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$isMobile",
})<{ $isMobile: Bool }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 169px;
  border: 1px solid #e8f0ff;
  border-radius: ${({ $isMobile }) => ($isMobile ? "2px" : "6px")};
  background: #fff;
  z-index: 2000;
  padding: 10px 6px 6px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

export const DropdownHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$isMobile",
})<{ $isMobile: Bool }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isMobile }) => ($isMobile ? "0px 8px 6px" : "0px 8px 10px")};
  cursor: pointer;
`;

export const HeaderSelectedLeft = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const HeaderDivider = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$height",
})<{ $height: number }>`
  width: 1px;
  background: #ddd;
  height: ${({ $height }) => `${$height}px`};
`;

export const HeaderIcon = styled(Image)``;

export const DropdownListWrapper = styled(Box)``;

export const DropdownListItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active: Bool }>`
  background: ${({ $active }) => ($active ? "#E8F0FF" : "transparent")};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 63px;
  cursor: pointer;
  margin-bottom: 6px;

  &:hover {
    background: #e8f0ff;
  }
`;

export const ListItemLeft = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ListItemRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const LangFlag = styled.img<{ $size?: number }>`
  width: ${({ $size }) => ($size ? `${$size}px` : "20px")};
  height: ${({ $size }) => ($size ? `${$size}px` : "20px")};
  border-radius: 50%;
`;

export const LangText = styled.span<{ $fontSize?: number }>`
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : "15px")};
  font-weight: 500;
  font-family: UrbanistMedium;
  line-height: 1.2;
  letter-spacing: 0;
  ${theme.breakpoints.down("md")} {
    font-size: 13px;
  }
`;

export const CheckIconStyled = styled.img<{ $w?: number; $h?: number }>`
  width: ${({ $w }) => ($w ? `${$w}px` : "18px")};
  height: ${({ $h }) => ($h ? `${$h}px` : "18px")};
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background: #ddd;
  ${theme.breakpoints.down("md")} {
    height: 16px;
  }
`;
