import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import PopupModal from "@/Components/UI/PopupModal";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CryptocurrencySelector, { Cryptocurrency } from "@/Components/UI/CryptocurrencySelector";
import CustomButton from "@/Components/UI/Buttons";
import Image from "next/image";
import WalletIcon from "@/assets/Icons/wallet-icon.svg";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import OtpDialog from "@/Components/UI/OtpDialog";
import { theme } from "@/styles/theme";
import useIsMobile from "@/hooks/useIsMobile";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "@/utils/types";
import { useTranslation } from "react-i18next";
import {
  WarningContainer,
  WarningIconContainer,
  WarningContent,
} from "./styled";
import PanelCard from "../PanelCard";
import { useCompany } from "@/context/CompanyContext";
import { fetchWalletRequest, validateWalletOtpRequest, validateWalletRequest } from "@/Redux/Actions/WalletAction";
import Toast from "../Toast";
import * as yup from "yup";

/**
 * Props for the AddWalletModal component.
 */
export interface AddWalletModalProps {
  /** Controls the visibility of the modal */
  open: boolean;
  /** Callback function when the modal is closed */
  onClose: () => void;
  /** List of available cryptocurrencies */
  cryptocurrencies?: Cryptocurrency[];
  /** Fiat data (optional) */
  fiatData?: any[];
  /** Crypto data (optional) */
  cryptoData?: any[];
  /** Callback function when a wallet is successfully added */
  onWalletAdded?: () => void;
}

/**
 * Type definition for wallet address data used during validation.
 */
type Address = {
  wallet_address: string;
  currency: string;
  company_id: number;
  wallet_name: string;
};

/**
 * Error Boundary component to catch errors within the modal.
 */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("AddWalletModal Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error">Something went wrong. Please try again.</Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

/**
 * AddWalletModal Component
 * 
 * A modal component for adding a new cryptocurrency wallet.
 * Handles input validation, OTP verification, and communicates with Redux store.
 * 
 * @param props - AddWalletModalProps
 * @returns React Element
 */
const AddWalletModal: React.FC<AddWalletModalProps> = ({
  open,
  onClose,
  cryptocurrencies = [],
  fiatData = [],
  cryptoData = [],
  onWalletAdded,
}) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: rootReducer) => state.userReducer);
  const walletState = useSelector((state: rootReducer) => state.walletReducer);
  const toastState = useSelector((state: rootReducer) => state.toastReducer);
  const isMobile = useIsMobile("sm");
  const { t } = useTranslation("walletScreen");
  const { activeCompanyId } = useCompany();

  // Memoized translation helper
  const tWallet = useCallback(
    (key: string): string => {
      const result = t(key, { ns: "walletScreen" });
      return typeof result === "string" ? result : String(result);
    },
    [t]
  );

  // State
  const [walletName, setWalletName] = useState("");
  const [cryptocurrency, setCryptocurrency] = useState("BTC");
  const [walletAddress, setWalletAddress] = useState("");
  const [errors, setErrors] = useState<{
    walletName?: string;
    cryptocurrency?: string;
    walletAddress?: string;
  }>({});

  // UI Logic State
  const [popupLoading, setPopupLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpError, setOtpError] = useState<string>("");
  const [closeCryptoDropdown, setCloseCryptoDropdown] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Data State
  const [address, setAddress] = useState<Address | null>(null);

  // Refs for race-condition handling & lifecycle management
  const isMounted = useRef(true);
  const awaitingValidation = useRef(false);
  const awaitingOtp = useRef(false);

  // Redux derived state
  const validationLoading = Boolean(walletState?.validationLoading);
  const validationOtpLoading = Boolean(walletState?.otpValidationLoading);

  // Combined loading state for form interaction
  const isSubmitting = validationLoading || popupLoading;

  // Validation Schema
  const validationSchema = useMemo(() => yup.object().shape({
    cryptocurrency: yup.string().required(tWallet("cryptocurrencyRequired")),
    walletAddress: yup.string().trim().required(tWallet("walletAddressRequired")),
  }), [tWallet]);

  /**
   * Validates form inputs against the schema.
   */
  const validate = async () => {
    try {
      await validationSchema.validate({
        cryptocurrency,
        walletAddress,
      }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Lifecycle: Mount tracking
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Lifecycle: Reset states when OTP modal closes (only error)
  useEffect(() => {
    if (!otpModalOpen) {
      setOtpError("");
    }
  }, [otpModalOpen]);

  // Lifecycle: Timer logic (leak-free)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpCountdown]);

  /**
   * Closes the modal and resets all states.
   */
  const handleClose = useCallback(() => {
    // Prevent closing during critical flows unless force closed by success
    // Note: The caller might still force unmount, but we can't stop that.
    // We can only control our own 'onClose' emission.
    if (validationLoading || validationOtpLoading) return;

    setCloseCryptoDropdown(true);

    // Only clear data when fully closing
    setWalletName("");
    setCryptocurrency("BTC");
    setWalletAddress("");
    setErrors({});

    setPopupLoading(false);
    setOtpModalOpen(false);
    setAddress(null);
    setOtpError("");
    setOtpCountdown(0);

    // Reset flags
    awaitingValidation.current = false;
    awaitingOtp.current = false;

    onClose();

    // Reset dropdown trigger after a short delay
    setTimeout(() => {
      if (isMounted.current) setCloseCryptoDropdown(false);
    }, 100);
  }, [validationLoading, validationOtpLoading, onClose]);

  /**
   * Handle Validation Response (Step 1)
   */
  useEffect(() => {
    if (awaitingValidation.current && !validationLoading) {
      if (walletState?.validationResult?.valid === true) {
        // Success
        awaitingValidation.current = false;
        setPopupLoading(false);
        setErrors({});

        // IMPORTANT: Do NOT close the main modal here. 
        // We keep it open so state isn't lost and OtpDialog can overlay/stack.
        // We also do NOT clear walletName/walletAddress so they persist if OTP is cancelled.

        setOtpModalOpen(true);
        onClose();
        setOtpCountdown(30);
      } else if (walletState?.error) {
        // Error
        awaitingValidation.current = false;
        setPopupLoading(false);
        // Error is handled by Toast via Redux
      }
    }
  }, [
    walletState?.validationResult,
    walletState?.error,
    validationLoading,
  ]);

  /**
   * Handle OTP Verification Response (Step 2)
   */
  useEffect(() => {
    if (awaitingOtp.current && !validationOtpLoading) {
      if (walletState?.otpValidateResult?.verified === true) {
        // Success
        awaitingOtp.current = false;
        setPopupLoading(false);
        setOtpModalOpen(false);
        setOtpCountdown(0);
        setAddress(null); // Clear sensitive address data

        onWalletAdded?.();

        // Now we close everything
        handleClose();

        if (activeCompanyId) dispatch(fetchWalletRequest(activeCompanyId));
      } else if (walletState?.otpValidateResult?.error) {
        // Error
        awaitingOtp.current = false;
        setOtpError(walletState?.otpValidateResult?.message || "Invalid OTP. Please try again.");
      }
    }
  }, [
    validationOtpLoading,
    walletState?.otpValidateResult,
    onWalletAdded,
    handleClose,
    activeCompanyId,
    dispatch
  ]);

  /**
   * Submits the wallet details for validation.
   */
  const handleSubmit = async () => {
    // Prevent double submission
    if (isSubmitting) return;

    const isValid = await validate();
    if (!isValid) {
      return;
    }

    if (!activeCompanyId) {
      console.error("No active company ID found");
      return;
    }

    setPopupLoading(true);

    const values: Address = {
      wallet_address: walletAddress.trim(),
      currency: cryptocurrency,
      company_id: activeCompanyId,
      wallet_name: walletName.trim(),
    };

    setAddress(values); // Store for OTP step
    awaitingValidation.current = true; // Mark intent

    dispatch(
      validateWalletRequest({
        isResend: false,
        ...values
      })
    );
  };

  /**
   * Verifies the OTP code.
   * @param otp - The OTP code entered by the user.
   */
  const handleOtpVerify = async (otp: string) => {
    if (!address || validationOtpLoading) return;
    setOtpError("");

    awaitingOtp.current = true; // Mark intent

    dispatch(
      validateWalletOtpRequest({
        ...address, // Use the stored address object to ensure wallet_name is present
        otp: otp.trim(),
        company_id: activeCompanyId!,
        wallet_name: address.wallet_name,
      })
    );
  };

  /**
   * Resends the OTP code.
   */
  const handleResendCode = async () => {
    if (!address || otpCountdown > 0) return; // Rate limit check

    setOtpError("");

    // We don't strictly need to await validation result here for UI transition,
    // but we dispatch the request.
    dispatch(
      validateWalletRequest({
        isResend: true,
        ...address,
        company_id: activeCompanyId!,
        wallet_name: address.wallet_name,
      })
    );
    setOtpCountdown(30);
  };

  // Ensure default cryptocurrency is selected if available and not set
  useEffect(() => {
    if (cryptocurrencies.length > 0 && !cryptocurrency) {
      setCryptocurrency(cryptocurrencies[0].code);
    }
  }, [cryptocurrencies, cryptocurrency]);

  return (
    <ErrorBoundary>
      <Toast
        open={toastState.open}
        message={toastState.message}
        severity={toastState.severity || "success"}
        loading={toastState.loading}
      />
      <PopupModal
        open={open}
        handleClose={handleClose}
        showHeader={false}
        hasFooter={false}
        transparent={true}
        disableEscapeKeyDown={isSubmitting || validationOtpLoading}
        onClose={(event, reason) => {
          // Critical flow protection: Don't allow closing if loading
          if (isSubmitting || validationOtpLoading) return;

          // Original behavior: Don't allow closing if data entered (unless via Cancel button)
          if (walletName || walletAddress) return;

          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            handleClose();
          }
        }}
        aria-labelledby="add-wallet-modal-title"
        aria-describedby="add-wallet-modal-description"
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
          title={tWallet("addWalletTitle")}
          showHeaderBorder={false}
          headerIcon={
            <Image
              src={WalletIcon}
              alt="wallet icon"
              width={14}
              height={14}
              draggable={false}
            />
          }
          bodyPadding={
            isMobile
              ? theme.spacing(1.5, 2, 2, 2)
              : theme.spacing(1.5, 3.75, 3.75, 3.75)
          }
          headerPadding={
            isMobile
              ? theme.spacing(2, 2, 0, 2)
              : theme.spacing(3.75, 3.75, 0, 3.75)
          }
          headerActionLayout="inline"
        >
          <Typography
            id="add-wallet-modal-description"
            sx={{
              fontSize: isMobile ? "13px" : "15px",
              fontWeight: 500,
              fontFamily: "UrbanistMedium",
              lineHeight: "1.5",
              mb: "10px",
            }}
          >
            {tWallet("addWalletDescription")}
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <InputField
              label={tWallet("walletName")}
              placeholder={tWallet("walletNamePlaceholder")}
              value={walletName}
              onChange={(e) => {
                setWalletName(e.target.value);
                if (errors.walletName) setErrors({ ...errors, walletName: undefined });
              }}
              aria-label={tWallet("walletName")}
              disabled={isSubmitting}
            />
            <CryptocurrencySelector
              cryptocurrencies={cryptocurrencies}
              label={tWallet("cryptocurrency") + " *"}
              value={cryptocurrency}
              onChange={(value) => {
                setCryptocurrency(value);
                if (errors.cryptocurrency) setErrors({ ...errors, cryptocurrency: undefined });
              }}
              error={!!errors.cryptocurrency}
              helperText={errors.cryptocurrency}
              sxIconChip={{
                [theme.breakpoints.down("sm")]: {
                  height: "26px",
                  padding: "4px 6px",
                  "& img": {
                    width: "14px",
                    height: "14px",
                  },
                },
              }}
              closeDropdownTrigger={closeCryptoDropdown}
            />
            <InputField
              label={tWallet("walletAddress") + " *"}
              placeholder={tWallet("walletAddressPlaceholder")}
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value);
                if (errors.walletAddress) {
                  setErrors({ ...errors, walletAddress: undefined });
                }
              }}
              error={!!errors.walletAddress}
              helperText={errors.walletAddress}
              aria-label={tWallet("walletAddress")}
              disabled={isSubmitting}
            />

            <WarningContainer>
              <WarningIconContainer>
                <Image
                  src={InfoIcon}
                  alt="info icon"
                  width={16}
                  height={16}
                  draggable={false}
                  style={{ filter: "brightness(0)" }}
                />
              </WarningIconContainer>
              <WarningContent>
                <p>{tWallet("warningMessage")}</p>
              </WarningContent>
            </WarningContainer>
          </Box>
          <Box sx={{ display: "flex", gap: "20px", mt: "20px" }}>
            <CustomButton
              label={tWallet("cancel")}
              variant="outlined"
              onClick={handleClose}
              disabled={isSubmitting}
              sx={{
                flex: 1,
                [theme.breakpoints.down("sm")]: {
                  height: "32px",
                  fontSize: "13px",
                },
              }}
            />
            <CustomButton
              label={tWallet("continue")}
              variant="primary"
              onClick={handleSubmit}
              disabled={popupLoading || isSubmitting || validationLoading}
              startIcon={popupLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
              sx={{
                flex: 1,
                [theme.breakpoints.down("sm")]: {
                  height: "32px",
                  fontSize: "13px",
                },
              }}
            />
          </Box>
        </PanelCard>

        <OtpDialog
          open={otpModalOpen}
          onClose={() => {
            // Allow closing OTP modal to return to form
            handleClose();
            setOtpModalOpen(false);
            setOtpError("");
          }}
          title={tWallet("emailVerification")}
          subtitle={tWallet("emailVerificationSubtitle")}
          contactInfo={userState.email}
          contactType="email"
          otpLength={6}
          onVerify={handleOtpVerify}
          onResendCode={handleResendCode}
          loading={validationOtpLoading}
          error={otpError}
          onClearError={() => setOtpError("")}
          countdown={otpCountdown}
        />
      </PopupModal>
    </ErrorBoundary>
  );
};

export default React.memo(AddWalletModal);