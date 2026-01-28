import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Box, Typography, useTheme, Menu, ListItemButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import CustomDatePicker, {
  DateRange,
  DatePickerRef,
} from "@/Components/UI/DatePicker";
import CustomButton from "@/Components/UI/Buttons";
import useIsMobile from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import {
  TransactionsTopBarContainer,
  DatePickerTriggerButton,
  WalletSelectorButton,
  SearchIconButton,
  SearchContainer,
  FiltersContainer,
  DatePickerWrapper,
  WalletSelectorWrapper,
  ExportButtonWrapper,
  CryptoIconChip,
} from "./styled";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import { format } from "date-fns";
import SearchIcon from "@/assets/Icons/search-icon.svg";
import CalendarIcon from "@/assets/Icons/calendar-icon.svg";
import WalletIcon from "@/assets/Icons/wallet-icon.svg";
import ExportIcon from "@/assets/Icons/export-icon.svg";
import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import { ALLCRYPTOCURRENCIES } from "@/hooks/useWalletData";
import { VerticalLine } from "@/Components/UI/LanguageSwitcher/styled";
interface TransactionsTopBarProps {
  onSearch?: (searchTerm: string) => void;
  onDateRangeChange?: (dateRange: DateRange) => void;
  onWalletChange?: (wallet: string) => void;
  onExport?: () => void;
}

const TransactionsTopBar: React.FC<TransactionsTopBarProps> = ({
  onSearch,
  onDateRangeChange,
  onWalletChange,
  onExport,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  const { t } = useTranslation("transactions");
  const tTransactions = useCallback(
    (key: string) => t(key, { ns: "transactions" }),
    [t]
  );
  const datePickerRef = useRef<DatePickerRef>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const walletButtonRef = useRef<HTMLButtonElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [selectedWallet, setSelectedWallet] = useState("all");
  const [walletMenuAnchor, setWalletMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleSearch = () => {
    onSearch?.(searchTerm);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    onDateRangeChange?.(range);
  };

  const handleWalletChange = (value: string) => {
    setSelectedWallet(value);
    setWalletMenuAnchor(null);
    onWalletChange?.(value);
  };

  const handleWalletButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setWalletMenuAnchor(e.currentTarget);
  };

  const handleWalletMenuClose = () => {
    setWalletMenuAnchor(null);
  };

  const handleCalendarButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    if (datePickerRef.current) {
      datePickerRef.current.open(e);
    }
  };

  const formatDateRange = (): string => {
    if (dateRange.startDate && dateRange.endDate) {
      if (isMobile) {
        return `${format(dateRange.startDate, "dd.MM.yy")}-${format(
          dateRange.endDate,
          "dd.MM.yy"
        )}`;
      }
      return `${format(dateRange.startDate, "MMM dd, yyyy")} - ${format(
        dateRange.endDate,
        "MMM dd, yyyy"
      )}`;
    }
    if (dateRange.startDate) {
      if (isMobile) {
        return format(dateRange.startDate, "dd.MM.yy");
      }
      return format(dateRange.startDate, "MMM dd, yyyy");
    }
    return isMobile ? tTransactions("period") : tTransactions("selectDateRange");
  };

  const walletOptions = useMemo(
    () => [
      {
        value: "all",
        label: tTransactions("allWallets"),
        code: "ALL",
        icon: WalletIcon,
      },
      ...ALLCRYPTOCURRENCIES.map((crypto, index) => ({
        value: `wallet${index + 1}`,
        label: crypto.name,
        code: crypto.code,
        icon: crypto.icon,
      })),
    ],
    [tTransactions]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (walletButtonRef.current && !walletButtonRef.current.contains(event.target as Node)) {
        handleWalletMenuClose();
      }
    };

    if (walletMenuAnchor) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [walletMenuAnchor]);

  return (
    <TransactionsTopBarContainer>
      <SearchContainer>
        <InputField
          inputHeight={isMobile ? "32px" : "40px"}
          placeholder={tTransactions("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyPress}
        />
        <SearchIconButton onClick={handleSearch}>
          <Image src={SearchIcon} alt="search" width={20} height={20} />
        </SearchIconButton>
      </SearchContainer>

      <FiltersContainer>
        <DatePickerWrapper>
          <DatePickerTriggerButton
            ref={buttonRef}
            onClick={handleCalendarButtonClick}
          >
            <Image
              src={CalendarIcon}
              alt="calendar"
              width={14}
              height={14}
              style={{
                filter: "brightness(0) saturate(100%) invert(0%)",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.text.primary,
                fontSize: isMobile ? "13px" : "15px",
                fontFamily: "UrbanistMedium",
                fontWeight: 500,
                lineHeight: 1.2,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textAlign: "left",
                flex: 1,
              }}
            >
              {formatDateRange()}
            </Typography>
            <Box className="separator" />
            <KeyboardArrowDownIcon className="arrow-icon" />
          </DatePickerTriggerButton>
          <Box
            sx={{
              position: "absolute",
              width: 0,
              height: 0,
              overflow: "hidden",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <CustomDatePicker
              ref={datePickerRef}
              value={dateRange}
              onChange={handleDateRangeChange}
              hideTrigger={true}
            />
          </Box>
        </DatePickerWrapper>

        <Box
          ref={walletButtonRef}
          sx={{
            position: "relative",
            width: isMobile ? "fit-content" : "220px",
            zIndex: 1,
          }}
        >
          {/* Trigger */}
          <WalletSelectorButton onClick={handleWalletButtonClick}>
            <Image src={WalletIcon} alt="wallet" width={17} height={17} />
            <Typography className="wallet-text">
              {walletOptions.find((opt) => opt.value === selectedWallet)?.label ||
                tTransactions("allWallets")}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box className="separator" />
              {!walletMenuAnchor ? (
                <ExpandMoreIcon sx={{ color: "rgba(103, 103, 104, 1)" }} className="arrow-icon" />
              ) : (
                <ExpandLessIcon sx={{ color: "rgba(103, 103, 104, 1)" }} className="arrow-icon" />
              )}
            </Box>
          </WalletSelectorButton>

          {/* Dropdown */}
          {walletMenuAnchor && (
            <Box
              sx={{
                position: "absolute",
                top: "0",
                left: isMobile ? "auto" : 0,
                right: isMobile ? 0 : "auto",
                width: isMobile ? "250px" : "270px",
                background: "#fff",
                borderRadius: "6px",
                border: `1px solid ${theme.palette.border.main}`,
                boxShadow: "rgba(16, 24, 40, 0.12) 0px 8px 24px 0px",
                padding: "10px 8px",
                zIndex: 3000,
              }}
            >
              {/* Header */}
              <Box
                onClick={handleWalletMenuClose}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px 6px 8px",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Image src={WalletIcon} alt="wallet" width={17} height={17} />
                  <Typography sx={{
                    fontSize: isMobile ? "13px" : "15px",
                    fontFamily: "UrbanistMedium",
                    fontWeight: 500,
                    lineHeight: "100%",
                    letterSpacing: "0",
                    color: theme.palette.text.primary,
                  }}>
                    {walletOptions.find((opt) => opt.value === selectedWallet)?.label ||
                      tTransactions("allWallets")}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box className="separator" />
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <VerticalLine />
                    <ExpandLessIcon style={{ color: "rgba(103, 103, 104, 1)" }} className="arrow-icon" />
                  </Box>
                </Box>
              </Box>

              {/* Options */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {walletOptions.map((option) => (
                  <ListItemButton
                    key={option.value}
                    onClick={() => {
                      handleWalletChange(option.value);
                      handleWalletMenuClose();
                    }}
                    selected={selectedWallet === option.value}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: isMobile ? "13px" : "15px",
                      fontFamily: "UrbanistMedium",
                      fontWeight: 500,
                      padding: isMobile ? "3px 8px 3px 3px" : "3px 12px 3px 3px",
                      borderRadius: "50px",
                      backgroundColor:
                        selectedWallet === option.value
                          ? "theme.palette.primary.light"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    <CryptoIconChip
                      sx={{
                        background: theme.palette.secondary.light,
                        height: isMobile ? "24px" : "32px",
                      }}
                    >
                      <Image src={option.icon} alt={option.label} draggable={false} />
                      <Typography component="span" sx={{ fontWeight: 600 }}>
                        {option.code}
                      </Typography>
                    </CryptoIconChip>

                    <Typography sx={{
                      fontSize: isMobile ? "13px" : "15px",
                      fontFamily: "UrbanistMedium",
                      fontWeight: 500,
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: theme.palette.text.primary,
                    }}>
                      {option.label}
                    </Typography>

                    {selectedWallet === option.value && (
                      <CheckIcon sx={{ fontSize: "18px", ml: "auto" }} />
                    )}
                  </ListItemButton>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <ExportButtonWrapper>
          <CustomButton
            label={tTransactions("export")}
            startIcon={
              <Image
                src={ExportIcon}
                alt="export"
                width={isMobile ? 13 : 17}
                height={isMobile ? 13 : 17}
              />
            }
            variant="secondary"
            onClick={onExport}
            sx={{
              padding: isMobile ? "8px 16px" : "10px 60px",
              minWidth: "auto",
              height: isMobile ? "32px" : "40px",
              fontSize: isMobile ? "13px" : "15px",
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
            }}
          />
        </ExportButtonWrapper>
      </FiltersContainer>
    </TransactionsTopBarContainer>
  );
};

export default TransactionsTopBar;
