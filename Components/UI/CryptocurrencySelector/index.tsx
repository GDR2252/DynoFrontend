import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Popover,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import {
  CryptocurrencyTrigger,
  CryptocurrencyIcon,
  CryptocurrencyText,
  CryptocurrencyDropdown,
  CryptocurrencyDividerLine,
  IconChip,
} from "./styled";

// Import cryptocurrency icons
import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import BNBIcon from "@/assets/cryptocurrency/BNB-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";
import { useWalletData } from "@/hooks/useWalletData";

// Cryptocurrency data
export interface Cryptocurrency {
  code: string;
  name: string;
  icon: any;
}

// export const cryptocurrencies: Cryptocurrency[] = [
//   { code: "BTC", name: "Bitcoin", icon: BitcoinIcon },
//   { code: "ETH", name: "Ethereum", icon: EthereumIcon },
//   { code: "LTC", name: "Litecoin", icon: LitecoinIcon },
//   { code: "BNB", name: "BNB", icon: BNBIcon },
//   { code: "DOGE", name: "Dogecoin", icon: DogecoinIcon },
//   { code: "BCH", name: "Bitcoin Cash", icon: BitcoinCashIcon },
//   { code: "TRX", name: "Tron", icon: TronIcon },
//   { code: "USDT", name: "USDT", icon: USDTIcon },
// ];



export interface CryptocurrencySelectorProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  name?: string;
  sx?: React.CSSProperties;
  sxIconChip?: React.CSSProperties;
  closeDropdownTrigger?: boolean;
}

const CryptocurrencySelector: React.FC<CryptocurrencySelectorProps> = ({
  label,
  value = "",
  onChange,
  error = false,
  helperText,
  fullWidth = true,
  required = false,
  name,
  sx,
  sxIconChip,
  closeDropdownTrigger
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("sm");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { cryptocurrencies } = useWalletData();

  // useEffect(() => {
  //   onChange?.(cryptocurrencies[0].code)
  // }, [cryptocurrencies])

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (cryptoCode: string) => {
    onChange?.(cryptoCode);
    handleClose();
  };

  const selectedCrypto =
    cryptocurrencies.find((c) => c.code === value) || { value: "", name: "", icon: null, code: "" };
  const isOpen = Boolean(anchorEl);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        anchorEl &&
        !(anchorEl as HTMLElement).contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, anchorEl]);

  const borderColor = error
    ? theme.palette.error.main
    : theme.palette.border.main;
  const focusBorderColor = error
    ? theme.palette.error.main
    : theme.palette.border.focus;

  useEffect(() => {
    if (closeDropdownTrigger) {
      setAnchorEl(null);
    }
  }, [closeDropdownTrigger]);

  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        ...sx,
      }}
    >
      {label && (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: isMobile ? "13px" : "15px",
            color: theme.palette.text.primary,
            fontFamily: "UrbanistMedium",
            lineHeight: "1.2",
            letterSpacing: "0",
          }}
        >
          {label}
          {required && <span style={{ marginLeft: 4 }}>*</span>}
        </Typography>
      )}

      {/* Wrapper */}
      <Box
        // ref={wrapperRef}
        sx={{
          position: "relative",
          width: fullWidth ? "100%" : isMobile ? "154px" : "300px",
        }}
      >
        {/* ===== Trigger ===== */}
        <CryptocurrencyTrigger onClick={handleOpen}>
          {value === "" ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CryptocurrencyText style={{ color: theme.palette.text.disabled }}>Bitcoin (BTC)</CryptocurrencyText>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <IconChip sx={{ minWidth: "fit-content", height: "28px" }}>
                <CryptocurrencyIcon
                  src={selectedCrypto.icon}
                  alt={selectedCrypto.name}
                  width={isMobile ? 14 : 20}
                  height={isMobile ? 14 : 20}
                />
                <span>{selectedCrypto.code}</span>
              </IconChip>
              <CryptocurrencyText>{selectedCrypto.name}</CryptocurrencyText>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CryptocurrencyDividerLine />
            {!isOpen ? (
              <ExpandMoreIcon fontSize="small" />
            ) : (
              <ExpandLessIcon fontSize="small" />
            )}
          </Box>
        </CryptocurrencyTrigger>

        {/* ===== Dropdown ===== */}
        {isOpen && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              width: "100%",
              border: `1px solid ${borderColor}`,
              borderRadius: "6px",
              backgroundColor: "#fff",
              padding: "10px 14px",
              zIndex: 100,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            {/* ===== Header (duplicate trigger) ===== */}
            <Box
              onClick={handleClose}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // padding: "5px 14px",
                cursor: "pointer",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {/* <IconChip sx={{ minWidth: "fit-content", height: "28px" }}>
                  <CryptocurrencyIcon
                    src={selectedCrypto.icon}
                    alt={selectedCrypto.name}
                    width={20}
                    height={20}
                  />
                  <span>{selectedCrypto.code}</span>
                </IconChip> */}
                <CryptocurrencyText>{value === "" ? "Bitcoin (BTC)" : `${selectedCrypto.name} (${value})`}</CryptocurrencyText>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CryptocurrencyDividerLine />
                <ExpandLessIcon fontSize="small" />
              </Box>
            </Box>

            {/* ===== Content ===== */}
            <Box sx={{ mt: "13px", display: "flex", flexDirection: "column", gap: "6px", maxHeight: "128px", overflow: "auto" }}>
              {cryptocurrencies.map((crypto) => (
                <ListItemButton
                  key={crypto.code}
                  onClick={() => {
                    handleSelect(crypto.code);
                    handleClose();
                  }}
                  sx={{
                    borderRadius: "50px",
                    p: "3px 14px 3px 3px",
                    gap: 1.5,
                    minHeight: "40px",
                    fontFamily: "UrbanistMedium",
                    lineHeight: "1.2",
                    letterSpacing: "0",
                    background:
                      crypto.code === value
                        ? theme.palette.primary.light
                        : "transparent",
                    "&:hover": {
                      background: theme.palette.primary.light,
                    },
                  }}
                >
                  <IconChip sx={{ minWidth: "fit-content" }}>
                    <CryptocurrencyIcon
                      src={crypto.icon}
                      alt={crypto.name}
                      width={20}
                      height={20}
                    />
                    <span>{crypto.code}</span>
                  </IconChip>

                  <ListItemText
                    primary={crypto.name}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 500,
                        fontSize: isMobile ? "13px" : "15px",
                        fontFamily: "UrbanistMedium",
                        lineHeight: "1.2",
                        letterSpacing: "0",
                      },
                    }}
                  />

                  {crypto.code === value && (
                    <CheckIcon sx={{ fontSize: 18, ml: "auto" }} />
                  )}
                </ListItemButton>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {helperText && (
        <Typography
          sx={{
            mt: "4px",
            fontSize: isMobile ? "10px" : "13px",
            color: error
              ? theme.palette.error.main
              : theme.palette.text.secondary,
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CryptocurrencySelector;
