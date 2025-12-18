import React from "react";
import { Radio, RadioProps, styled, SxProps, Theme } from "@mui/material";

export interface CustomRadioProps extends Omit<RadioProps, "sx"> {
  sx?: SxProps<Theme>;
}

/**
 * Custom Radio Button Component with consistent styling
 * - Selected: Blue inner circle (#0004FF) with light grey border (#E9ECF2)
 * - Unselected: White inner circle with light grey border (#E9ECF2)
 * - Hover effects with light blue background
 * - Fully customizable via sx prop
 */
const CustomRadio = styled(Radio)<CustomRadioProps>(({ theme }) => ({
  height: "24px",
  width: "24px",
  color: "#F4F6FA",
  padding: "6px",
  border: "1px solid ",
  borderColor: theme.palette.border.main,
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    borderRadius: "50%",
  },
  "&.Mui-checked": {
    color: "#0004FF",
  },
  "& .MuiSvgIcon-root": {
    width: "24px",
    height: "24px",
  },
  "&.Mui-disabled": {
    color: "#E9ECF2",
    opacity: 0.5,
  },
  "& .MuiRadio-root": {
    outline: "none",
    fill: "transparent",
  },
  ".Mui-focusVisible &": {
    outline: "none !important",
    outlineOffset: 0,
  },
  '& input[type="radio"]': {
    outline: "none !important",
    boxShadow: "none !important",
  },
}));

export default CustomRadio;
