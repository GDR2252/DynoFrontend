import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import Image from "next/image";
import PopupModal from "@/Components/UI/PopupModal";
import CustomButton from "@/Components/UI/Buttons";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import PanelCard from "@/Components/UI/PanelCard";
import useIsMobile from "@/hooks/useIsMobile";
import * as yup from "yup";
import { Lock, ArrowBack } from "@mui/icons-material";
import { DialogCloseButton } from "../OtpDialog/styled";
import CloseIcon from "@/assets/Icons/close-icon.svg";
import OtpDialog from "@/Components/UI/OtpDialog";
import { useTranslation } from "react-i18next";

export interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onEmailSubmit?: (email: string) => void;
  onOtpVerify?: (otp: string, email: string) => void;
  onResendCode?: (email: string) => void;
  countdown?: number;
  loading?: boolean;
  emailError?: string;
  otpError?: string;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  open,
  onClose,
  onEmailSubmit,
  onOtpVerify,
  onResendCode,
  countdown = 0,
  loading = false,
  emailError,
  otpError,
}) => {
  const { t } = useTranslation("auth");
  const theme = useTheme();
  const isMobile = useIsMobile("sm");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [localEmailError, setLocalEmailError] = useState("");

  // Create email schema with translations
  const emailSchema = React.useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(t("emailInvalid"))
          .required(t("emailRequired")),
      }),
    [t]
  );

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setStep("email");
      setEmail("");
      setEmailTouched(false);
      setLocalEmailError("");
    }
  }, [open]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailTouched && localEmailError) {
      setLocalEmailError("");
    }
  };

  const validateEmail = async () => {
    if (!email) {
      setLocalEmailError(t("emailRequired"));
      return false;
    }
    try {
      await emailSchema.validate({ email });
      setLocalEmailError("");
      return true;
    } catch (err: any) {
      setLocalEmailError(err.message);
      return false;
    }
  };

  const handleEmailSubmit = async () => {
    setEmailTouched(true);
    const isValid = await validateEmail();
    if (!isValid) return;

    if (onEmailSubmit) {
      onEmailSubmit(email);
      setStep("otp");
    }
  };

  const handleOtpVerify = (otp: string) => {
    if (onOtpVerify) {
      onOtpVerify(otp, email);
    }
  };

  const handleResendCode = () => {
    if (onResendCode) {
      onResendCode(email);
    }
  };

  const handleReturnToAuth = () => {
    onClose();
  };

  const handleClose = () => {
    setStep("email");
    setEmail("");
    setEmailTouched(false);
    setLocalEmailError("");
    onClose();
  };

  // Email Input Step
  if (step === "email") {
    return (
      <PopupModal
        open={open}
        handleClose={handleClose}
        showHeader={false}
        transparent
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "14px",
            maxWidth: "536px",
            width: "100%",
          },
          [theme.breakpoints.down("md")]: {
            "& .MuiDialog-paper": {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "14px",
              maxWidth: "536px",
              width: "90%",
              margin: 0,
              position: "fixed",
            },
          },
        }}
      >
        <PanelCard
          title={t("passwordRecovery")}
          headerIcon={<Lock sx={{ width: 24, height: 24, color: "#242428" }} />}
          headerAction={
            <DialogCloseButton onClick={handleClose}>
              <Image
                src={CloseIcon.src}
                alt="close icon"
                width={16}
                height={16}
              />
            </DialogCloseButton>
          }
          showHeaderBorder={false}
          bodyPadding="0"
          headerPadding="0"
          headerSx={{
            "& .MuiTypography-root": {
              fontWeight: 700,
              fontSize: "20px",
              color: "#242428",
            },
          }}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "14px",
            padding: "24px",
            boxShadow: "none",
            outline: "none",
            [theme.breakpoints.down("sm")]: {
              padding: "20px",
            },
          }}
          bodySx={{
            padding: "0",
          }}
        >
          {/* Instructions */}
          <Typography
            sx={{
              fontSize: "15px",
              color: "#6B7280",
              fontFamily: "UrbanistMedium",
              marginBottom: "24px",
              marginTop: "12px",
              lineHeight: "1.5",
            }}
          >
            {t("passwordRecoveryInstructions")}
          </Typography>

          {/* Email Input Field */}
          <Box sx={{ marginBottom: "24px" }}>
            <InputField
              label={`${t("email")} *`}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={t("emailPlaceHolder")}
              error={emailTouched && (!!localEmailError || !!emailError)}
              helperText={
                emailTouched ? localEmailError || emailError || "" : ""
              }
            />
          </Box>

          {/* Get Code Button */}
          <Box sx={{ marginBottom: "16px" }}>
            <CustomButton
              variant="primary"
              size="medium"
              label={t("getCode")}
              onClick={handleEmailSubmit}
              disabled={loading}
              fullWidth
              sx={{
                fontWeight: 700,
                padding: "15px 24px",
                fontSize: isMobile ? "13px" : "15px",
              }}
            />
          </Box>

          {/* Return to authorization link */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <Link
              component="button"
              onClick={handleReturnToAuth}
              sx={{
                fontSize: "13px",
                color: "#6B7280",
                fontFamily: "UrbanistMedium",
                textDecoration: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <ArrowBack sx={{ fontSize: "16px", color: "#6B7280" }} />
              {t("returnToAuthorization")}
            </Link>
          </Box>
        </PanelCard>
      </PopupModal>
    );
  }

  // OTP Verification Step
  return (
    <OtpDialog
      open={open}
      onClose={handleClose}
      title={t("passwordRecovery")}
      subtitle=""
      contactInfo={email}
      contactType="email"
      otpLength={6}
      resendCodeLabel={t("resendCode")}
      resendCodeCountdownLabel={(seconds) => `${t("codeIn")} ${seconds}s`}
      primaryButtonLabel={t("confirm")}
      onResendCode={handleResendCode}
      onVerify={handleOtpVerify}
      countdown={countdown}
      loading={loading}
      error={otpError}
    />
  );
};

export default ForgotPasswordDialog;
