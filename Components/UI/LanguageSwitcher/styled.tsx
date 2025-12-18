import styled from "@emotion/styled";
import { styled as muiStyled } from "@mui/material/styles";
import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export const LangTrigger = muiStyled(Box)(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "7px 12px",
  borderRadius: "6px",
  border: "1px solid",
  borderColor: theme?.palette?.border?.main,
  cursor: "pointer",
  background: "white",
  color: theme?.palette?.text?.primary ?? "#000",
  minWidth: "fit-content",

  "&.MuiTypography-root span": {
    fontSize: theme.breakpoints.down("sm") ? "12px" : "15px",
  },
}));

export const LangFlag = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;

export const LangText = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-family: UrbanistMedium;
`;

export const CheckIconStyled = styled(CheckIcon)`
  font-size: 18px;
  color: #000;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background: #ddd;
`;
