import React from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslation } from "react-i18next";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import TimeIcon from "@/assets/Icons/time-icon.svg";
import SettingsAccordion from "@/Components/UI/SettingsAccordion";
import AdornedInputField from "@/Components/UI/AdornedInputField";
import Image from "next/image";

export type PaymentToleranceSectionProps = {
  values: {
    accept_underpayments_up_to: string;
    flag_overpayments_above: string;
    time_for_partial_payments: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isMobile?: boolean;
  expanded: boolean;
  onAccordionChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

export default function PaymentToleranceSection({
  values,
  handleChange,
  handleBlur,
  isMobile = false,
  expanded,
  onAccordionChange,
}: PaymentToleranceSectionProps) {
  const { t: tSettings } = useTranslation("companySettings");

  return (
    <SettingsAccordion
      icon={

        <Image
          src={RoundedStackIcon}
          alt="rounded stack"
          width={16}
          height={16}
          style={{
            filter: `brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(100%)`,
          }}
          draggable={false}
        />
      }
      title={tSettings("paymentTolerance")}
      subtitle={tSettings("paymentToleranceSubtitle")}
      expanded={expanded}
      onChange={onAccordionChange}
      isMobile={isMobile}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <AdornedInputField
          fullWidth
          inputHeight={isMobile ? "32px" : "38px"}
          label={tSettings("paymentToleranceFields.acceptUnderpaymentsUpTo")}
          name="accept_underpayments_up_to"
          value={String(values.accept_underpayments_up_to ?? "1.00")}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={tSettings("paymentToleranceFields.acceptUnderpaymentsHelper")}
          startAdornment={<Typography
            component="span"
            variant="body2"
            sx={{
              fontFamily: "UrbanistMedium",
              color: "text.secondary",
              fontSize: isMobile ? "13px" : "14px",
            }}
          >
            $
          </Typography>}
          type="text"
          inputMode="decimal"
        />
        <AdornedInputField
          fullWidth
          inputHeight={isMobile ? "32px" : "38px"}
          label={tSettings("paymentToleranceFields.flagOverpaymentsAbove")}
          name="flag_overpayments_above"
          value={String(values.flag_overpayments_above ?? "5.00")}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={tSettings("paymentToleranceFields.flagOverpaymentsHelper")}
          startAdornment={
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontFamily: "UrbanistMedium",
                color: "text.secondary",
                fontSize: isMobile ? "13px" : "14px",
              }}
            >
              $
            </Typography>
          }
          type="text"
          inputMode="decimal"
        />
        <AdornedInputField
          fullWidth
          inputHeight={isMobile ? "32px" : "38px"}
          label={tSettings("paymentToleranceFields.timeForPartialPayments")}
          name="time_for_partial_payments"
          value={String(values.time_for_partial_payments ?? "30")}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={tSettings("paymentToleranceFields.timeForPartialPaymentsHelper")}
          startAdornment={
              <Image
                src={TimeIcon}
                alt="time"
                width={16}
                height={16}
                style={{
                filter: `brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(100%)`,
              }}
            />
          }
          endAdornment={tSettings("paymentToleranceFields.minutes")}
          type="text"
          inputMode="numeric"
        />
      </Box>
    </SettingsAccordion>
  );
}
