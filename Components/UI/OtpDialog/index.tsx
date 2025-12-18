import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { CancelRounded, Info } from "@mui/icons-material";
import Image from "next/image";
import PopupModal from "@/Components/UI/PopupModal";
import CustomButton from "@/Components/UI/Buttons";
import FormManager from "@/Components/Page/Common/FormManager";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import PanelCard from "@/Components/UI/PanelCard";
import useIsMobile from "@/hooks/useIsMobile";
import * as yup from "yup";
import EnvelopeIcon from "@/assets/Icons/envelope-icon.svg";
import ArrowUpwardIcon from "@/assets/Icons/up-arrow-icon.png";
import { DialogCloseButton } from "./styled";
import CloseIcon from "@/assets/Icons/close-icon.svg";
import { useTranslation } from "react-i18next";

export interface OtpDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  contactInfo?: string; // Email or phone number to display
  contactType?: "email" | "phone"; // Type of contact info
  otpLength?: number; // Default 6
  resendCodeLabel?: string;
  resendCodeCountdownLabel?: (seconds: number) => string;
  primaryButtonLabel?: string;
  onResendCode?: () => void;
  onVerify?: (otp: string) => void;
  countdown?: number; // Countdown in seconds
  loading?: boolean;
  error?: string;
}

const otpInitial = {
  otp1: "",
  otp2: "",
  otp3: "",
  otp4: "",
  otp5: "",
  otp6: "",
};

const OtpDialog: React.FC<OtpDialogProps> = ({
  open,
  onClose,
  title,
  subtitle,
  contactInfo = "",
  contactType = "email",
  otpLength = 6,
  resendCodeLabel,
  resendCodeCountdownLabel,
  primaryButtonLabel,
  onResendCode,
  onVerify,
  countdown = 0,
  loading = false,
  error,
}) => {
  const { t } = useTranslation("auth");
  const theme = useTheme();
  const isMobile = useIsMobile("sm");
  const [otpValues, setOtpValues] = useState(otpInitial);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Use translations as defaults if props are not provided
  const dialogTitle = title || t("emailVerification");
  const dialogSubtitle = subtitle;
  const dialogResendCodeLabel = resendCodeLabel || t("resendCode");
  const dialogResendCodeCountdownLabel =
    resendCodeCountdownLabel ||
    ((seconds: number) => `${t("codeIn")} ${seconds}s`);
  const dialogPrimaryButtonLabel = primaryButtonLabel || t("checkAndAdd");

  // Calculate input size based on screen size
  const inputSize = isMobile ? "32px" : "40px";

  // Create schema based on otpLength
  const otpSchema = React.useMemo(() => {
    const shape: any = {};
    for (let i = 1; i <= otpLength; i++) {
      shape[`otp${i}`] = yup.string().required(t("required"));
    }
    return yup.object().shape(shape);
  }, [otpLength, t]);

  // Reset OTP values when dialog closes
  useEffect(() => {
    if (!open) {
      setOtpValues(otpInitial);
      inputRefs.current = [];
    }
  }, [open]);

  const handleOtpChange = (
    index: number,
    value: string,
    handleChange: any,
    values: any
  ) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "").slice(0, 1);
    const fieldName = `otp${index + 1}`;
    const e: any = {
      target: {
        name: fieldName,
        value: numericValue,
      },
    };
    handleChange(e);

    // Auto-focus to next field if current field has a value
    if (numericValue && index < otpLength - 1) {
      const nextField = inputRefs.current[index + 1];
      if (nextField) {
        nextField.focus();
      }
    }
  };

  const handleOtpBlur = (fieldName: string, handleBlur: any) => {
    const e: any = {
      target: {
        name: fieldName,
      },
    };
    handleBlur(e);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    values: any,
    handleChange: any
  ) => {
    // Handle backspace to move to previous field
    if (e.key === "Backspace" && !values[`otp${index + 1}`] && index > 0) {
      const prevField = inputRefs.current[index - 1];
      if (prevField) {
        prevField.focus();
      }
    }
  };

  const handleSubmit = (values: any) => {
    // Combine OTP values into a single string
    const otp = Object.keys(values)
      .sort()
      .map((key) => values[key])
      .join("");
    if (onVerify) {
      onVerify(otp);
    }
  };

  return (
    <PopupModal
      open={open}
      handleClose={onClose}
      showHeader={false}
      transparent
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "14px",
          maxWidth: "520px",
          width: "100%",
        },
        [theme.breakpoints.down("md")]: {
          "& .MuiDialog-paper": {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "14px",
            maxWidth: "520px",
            width: "90%",
            margin: 0,
            position: "fixed",
          },
        },
      }}
    >
      <PanelCard
        title={dialogTitle}
        headerIcon={
          contactType === "email" ? (
            <Image src={EnvelopeIcon} alt="email icon" width={24} height={24} />
          ) : undefined
        }
        headerAction={
          <DialogCloseButton onClick={onClose}>
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
        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: "15px",
            color: theme.palette.text.secondary,
            fontFamily: "UrbanistMedium",
            marginBottom: "16px",
            marginTop: "12px",
            lineHeight: "1.3",
          }}
        >
          {dialogSubtitle}
        </Typography>

        {/* Info Message Box */}
        {contactInfo && (
          <Box
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "6px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: `1px solid ${theme.palette.border.main}`,
              marginBottom: "16px",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <Info
              sx={{
                color: theme.palette.primary.main,
                fontSize: "18px",
                width: "16px",
                height: "16px",
              }}
            />
            <Typography
              sx={{
                fontSize: "15px",
                color: theme.palette.primary.main,
                fontFamily: "UrbanistMedium",
                lineHeight: "1",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
                [theme.breakpoints.down("sm")]: {
                  fontSize: "13px",
                },
              }}
            >
              {t("codeSentTo")}{" "}
              <span style={{ fontWeight: 600, fontFamily: "UrbanistBold" }}>
                {contactInfo}
              </span>
            </Typography>
          </Box>
        )}

        {/* OTP Input Fields */}
        <FormManager
          initialValues={otpInitial}
          yupSchema={otpSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            submitDisable,
            touched,
            values,
          }) => (
            <>
              <Box sx={{ marginBottom: "16px" }}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    fontFamily: "UrbanistMedium",
                    marginBottom: "8px",
                  }}
                >
                  {t("verificationCode")} *
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "6px",
                    justifyContent: "flex-start",
                  }}
                >
                  {Array.from({ length: otpLength }).map((_, index) => {
                    const fieldName = `otp${index + 1}`;
                    const hasValue =
                      values[fieldName] && values[fieldName].length > 0;
                    return (
                      <Box
                        key={fieldName}
                        sx={{
                          width: inputSize,
                          minWidth: inputSize,
                          maxWidth: inputSize,
                        }}
                      >
                        <InputField
                          value={values[fieldName] || ""}
                          name={fieldName}
                          type="text"
                          onChange={(e) =>
                            handleOtpChange(
                              index,
                              e.target.value,
                              handleChange,
                              values
                            )
                          }
                          onBlur={() => handleOtpBlur(fieldName, handleBlur)}
                          onKeyDown={(e) =>
                            handleKeyDown(index, e, values, handleChange)
                          }
                          success={hasValue}
                          fullWidth
                          maxLength={1}
                          inputMode="numeric"
                          inputHeight={inputSize}
                          sx={{
                            gap: 0,
                            width: "100%",
                            "& > div": {
                              width: "100%",
                            },
                            "& .MuiOutlinedInput-root": {
                              height: inputSize,
                              width: "100%",
                              "& input": {
                                textAlign: "center",
                                fontSize: isMobile ? "16px" : "18px",
                                fontWeight: hasValue ? 600 : 400,
                                padding: "0 !important",
                                height: "100%",
                                width: "100%",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: hasValue
                                  ? "#4CAF50"
                                  : theme.palette.primary.main,
                                borderWidth: "2px",
                              },
                              "& fieldset": {
                                borderColor: hasValue ? "#4CAF50" : "#E9ECF2",
                                borderWidth: hasValue ? "2px" : "1px",
                              },
                              "&:hover fieldset": {
                                borderColor: hasValue
                                  ? "#4CAF50"
                                  : theme.palette.primary.main,
                              },
                            },
                            "& .MuiInputBase-input": {
                              color: hasValue ? "#4CAF50" : "#242428",
                            },
                          }}
                          inputRef={(el: HTMLInputElement | null) => {
                            inputRefs.current[index] = el;
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
                {error && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#d32f2f",
                      marginTop: "8px",
                      fontFamily: "UrbanistMedium",
                    }}
                  >
                    {error}
                  </Typography>
                )}
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "space-between",
                }}
              >
                {/* Resend Code Button */}
                <CustomButton
                  variant="secondary"
                  size="medium"
                  label={
                    countdown > 0
                      ? dialogResendCodeCountdownLabel(countdown)
                      : dialogResendCodeLabel
                  }
                  onClick={() => {
                    if (onResendCode) {
                      onResendCode();
                    }
                  }}
                  disabled={countdown > 0 || loading}
                  endIcon={countdown > 0 || loading ? undefined : ArrowUpwardIcon}
                  type="button"
                  sx={{
                    fontWeight: 500,
                    padding: "11px 20px",
                    flex: 1,
                    fontSize: isMobile ? "13px" : "15px",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "13px",
                      padding: "10px 16px",
                    },
                  }}
                />

                {/* Primary Action Button */}
                <CustomButton
                  variant="primary"
                  size="medium"
                  label={dialogPrimaryButtonLabel}
                  type="submit"
                  disabled={
                    submitDisable ||
                    loading ||
                    !Object.values(values).every((val) => val)
                  }
                  sx={{
                    fontWeight: 700,
                    padding: "15px 24px",
                    flex: 1,
                    fontSize: isMobile ? "13px" : "15px",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "13px",
                      padding: "12px 20px",
                    },
                  }}
                />
              </Box>
            </>
          )}
        </FormManager>
      </PanelCard>
    </PopupModal>
  );
};

export default OtpDialog;
