import React, { useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import PopupModal from "@/Components/UI/PopupModal";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CustomButton from "@/Components/UI/Buttons";
import { theme } from "@/styles/theme";
import useIsMobile from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import {
  CloseIconButton,
  LabelText,
  PaymentDetailsContainer,
  PaymentDetailsTitle,
  Row,
  ValueText,
} from "./styled";

import CloseIcon from "@/assets/Icons/close-icon.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import HourglassIcon from "@/assets/Icons/hourglass-icon.svg";
import PaymentIcon from "@/assets/Icons/payment-icon.svg";
import NoteIcon from "@/assets/Icons/note-icon.svg";
import CopyIcon from "@/assets/Icons/copy-icon.svg";
import PanelCard from "@/Components/UI/PanelCard";
import { ApiKeyCopyButton } from "../API/styled";

interface PaymentLinkSuccessModalProps {
  open: boolean;
  onClose: () => void;
  paymentLink: string;
  paymentSettings: {
    value: string;
    expire: string;
    description: string;
    blockchainFees: string;
  };
  onCopyLink: () => void;
}

interface PaymentDetailRowProps {
  icon: string;
  alt: string;
  label: string;
  value: React.ReactNode;
  iconStyle?: React.CSSProperties;
  alignTop?: boolean;
}

const PaymentDetailRow: React.FC<PaymentDetailRowProps> = ({
  icon,
  alt,
  label,
  value,
}) => {
  const isMobile = useIsMobile("md");

  return (
    <Row>
      <Image
        src={icon}
        alt={alt}
        width={isMobile ? 12 : 16}
        height={isMobile ? 12 : 16}
        draggable={false}
        style={{
          filter: "brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
        }}
      />

      <LabelText>{label}:</LabelText>

      <ValueText>{value}</ValueText>
    </Row>
  );
};

const PaymentLinkSuccessModal: React.FC<PaymentLinkSuccessModalProps> = ({
  open,
  onClose,
  paymentLink,
  paymentSettings,
  onCopyLink,
}) => {
  const isMobile = useIsMobile("md");
  const { t } = useTranslation("createPaymentLinkScreen");
  const tPaymentLink = useCallback(
    (key: string): string => {
      const result = t(key, { ns: "createPaymentLinkScreen" });
      return typeof result === "string" ? result : String(result);
    },
    [t]
  );

  const getExpireText = () => {
    if (paymentSettings.expire === "no") return tPaymentLink("noExpiration");
    return tPaymentLink("expires24h");
  };

  const getBlockchainFeesText = () => {
    return paymentSettings.blockchainFees === "customer"
      ? tPaymentLink("paidByCustomer")
      : tPaymentLink("paidByClient");
  };

  const handleCopyPaymentLink = () => {
    if (paymentLink) {
      navigator.clipboard.writeText(paymentLink);
    }
  };

  return (
    <PopupModal
      open={open}
      handleClose={onClose}
      showHeader={false}
      transparent
      hasFooter={false}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "481px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
        },
      }}
    >
      <PanelCard
        title={tPaymentLink("paymentLinkSuccessfullyCreated")}
        subTitle={tPaymentLink("shareLinkToReceivePayment")}
        showHeaderBorder={false}
        bodyPadding={
          isMobile
            ? theme.spacing(1.5, 2, 2, 2)
            : theme.spacing(2, 3.75, 3.75, 3.75)
        }
        headerPadding={
          isMobile
            ? theme.spacing(2, 2, 0, 2)
            : theme.spacing(3.75, 3.75, 0, 3.75)
        }
        headerActionLayout="inline"
        headerAction={
          <CloseIconButton onClick={onClose}>
            <Image
              src={CloseIcon.src}
              alt="close icon"
              width={16}
              height={16}
              draggable={false}
            />
          </CloseIconButton>
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
            <InputField
              value={paymentLink}
              readOnly
              label={tPaymentLink("paymentLink")}
              inputHeight={isMobile ? "32px" : "40px"}
            />
            <ApiKeyCopyButton onClick={handleCopyPaymentLink}>
              <Image
                src={CopyIcon.src}
                alt="copy"
                width={14}
                height={14}
                draggable={false}
              />
            </ApiKeyCopyButton>
          </Box>

          <PaymentDetailsContainer>
            <PaymentDetailsTitle>{tPaymentLink("paymentDetails")}</PaymentDetailsTitle>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <PaymentDetailRow
                icon={RoundedStackIcon.src}
                alt="value"
                label={tPaymentLink("value").replace(" ($)", "")}
                value={`$${paymentSettings.value || "0.00"}`}
              />

              <PaymentDetailRow
                icon={HourglassIcon.src}
                alt="expire"
                label={tPaymentLink("expiresOn")}
                value={getExpireText()}
              />

              <PaymentDetailRow
                icon={PaymentIcon.src}
                alt="blockchain fees"
                label={tPaymentLink("blockchainFees")}
                value={getBlockchainFeesText()}
              />

              <PaymentDetailRow
                icon={NoteIcon.src}
                alt="description"
                label={tPaymentLink("description")}
                value={paymentSettings.description || tPaymentLink("nA")}
              />
            </Box>
          </PaymentDetailsContainer>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              marginTop: 1,
            }}
          >
            <CustomButton
              label={tPaymentLink("toClose")}
              variant="outlined"
              size="medium"
              onClick={onClose}
              fullWidth
              sx={{
                [theme.breakpoints.down("md")]: {
                  height: "32px",
                  fontSize: "13px",
                },
              }}
            />
            <CustomButton
              label={tPaymentLink("copyLink")}
              variant="primary"
              size="medium"
              onClick={onCopyLink}
              fullWidth
              sx={{
                [theme.breakpoints.down("md")]: {
                  height: "32px",
                  fontSize: "13px",
                },
              }}
            />
          </Box>
        </Box>
      </PanelCard>
    </PopupModal>
  );
};

export default PaymentLinkSuccessModal;
