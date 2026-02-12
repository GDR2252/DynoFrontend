import React, { useState, useCallback } from "react";
import CopyIcon from "@/assets/Icons/copy-icon.svg";
import EditIcon from "@/assets/Icons/edit-icon.svg";
import WalletIcon from "@/assets/Icons/home/wallet.svg";
import LinkIcon from "@/assets/Icons/link-icon.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import { Box, Typography, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import { ArrowOutward } from "@mui/icons-material";
import { theme } from "@/styles/theme";
import { getCurrencySymbol, formatNumberWithComma } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { useTranslation } from "react-i18next";
import PanelCard from "@/Components/UI/PanelCard";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import {
  HeaderIcon,
  SetupWarnnigContainer,
  WalletCardBody,
  WalletCardBodyRow,
  WalletCopyButton,
  WalletEditButton,
  WalletHeaderAction,
  WalletLabel,
} from "./styled";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CustomButton from "@/Components/UI/Buttons";
import AddWalletModal from "@/Components/UI/AddWalletModal";
import { WarningIconContainer } from "@/Components/UI/AddWalletModal/styled";
import useIsMobile from "@/hooks/useIsMobile";
import { useWalletData } from "@/hooks/useWalletData";
import EmptyDataModel from "@/Components/UI/EmptyDataModel";
import { CopyButton } from "../Transactions/TransactionDetailsModal.styled";
import { useRouter } from "next/router";

import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";
import Toast from "@/Components/UI/Toast";
import { rootReducer } from "@/utils/types";

interface WalletData {
  icon: any;
  walletTitle: string;
  walletAddress: string;
  name: string;
  totalProcessed: number;
}

const Wallet = () => {
  const isMobile = useIsMobile("md");
  const dispatch = useDispatch();
  const { t } = useTranslation("walletScreen");
  const tWallet = useCallback(
    (key: string): string => {
      const result = t(key, { ns: "walletScreen" });
      return typeof result === "string" ? result : String(result);
    },
    [t]
  );

  const ToastState = useSelector((state: rootReducer) => state.toastReducer);

  const router = useRouter();
  const [openEditModal, setOpenEditModal] = useState(false);

  // const { walletLoading, walletData } = useWalletData();
  const walletLoading = false;
  const walletData = [
    {
      icon: BitcoinIcon,
      walletTitle: "BTC",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "Bitcoin",
      totalProcessed: 1254305
    }, {
      icon: EthereumIcon,
      walletTitle: "ETC",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "Ethereum",
      totalProcessed: 892342
    }, {
      icon: LitecoinIcon,
      walletTitle: "Litecoin",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "LTC",
      totalProcessed: 456789
    }, {
      icon: DogecoinIcon,
      walletTitle: "Dogecoin",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "DOGE",
      totalProcessed: 1254305
    }, {
      icon: BitcoinCashIcon,
      walletTitle: "BitcoinCash",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "BCH",
      totalProcessed: 892342
    }, {
      icon: TronIcon,
      walletTitle: "Tron",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "TRX",
      totalProcessed: 456789
    }, {
      icon: USDTIcon,
      walletTitle: "USDT",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "USDT (TRC-20)",
      totalProcessed: 1254305
    }, {
      icon: USDTIcon,
      walletTitle: "USDT",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      name: "USDT (ERC-20)",
      totalProcessed: 892342
    },
  ]

  const copyAddressToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    dispatch({
      type: TOAST_SHOW,
      payload: {
        message: tWallet("addressCopied"),
        severity: "success",
      },
    });
  };

  const handleViewTransactions = (wallet: WalletData) => {
    console.log("View transactions for:", wallet.walletTitle);
  };

  const handleEdit = (wallet: WalletData) => {
    console.log("Edit wallet:", wallet.walletTitle);
    setOpenEditModal(true);
  };

  if (walletLoading) {
    return <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        sx={{
          color: "#0004ff",
        }}
      />
    </Box>;
  }

  if (walletData.length === 0 && !walletLoading) {
    return (
      <EmptyDataModel pageName="wallet" />
    );
  }

  return (
    <>
      <Toast
        open={ToastState.open}
        message={ToastState.message}
        severity={ToastState.severity || "success"}
        loading={ToastState.loading}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          mt: isMobile ? 1 : 0,
          pb: { xs: "70px", lg: "0" }
        }}
      >
        <Grid container spacing={isMobile ? 2 : 2.5}>
          {walletData.map((wallet, index) => (
            <Grid
              item
              xs={12}
              md={6}
              xl={4}
              key={index}
              sx={{
                opacity: 0,
                transform: "translateY(20px)",
                animation: "cardFadeUp 0.5s ease forwards",
                animationDelay: `${index * 0.12}s`,

                "@keyframes cardFadeUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <PanelCard
                title={wallet.name}
                headerIcon={
                  <HeaderIcon>
                    <Image src={wallet.icon} alt={wallet.name} draggable={false} />
                  </HeaderIcon>
                }
                showHeaderBorder={false}
                headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
                bodyPadding={isMobile ? theme.spacing(1.75, 2, 2, 2) : theme.spacing(3, 2.5, 2.5, 2.5)}
                headerAction={
                  <WalletHeaderAction>
                    <Image src={wallet.icon} alt={wallet.name} draggable={false} />
                    <span>
                      {wallet.name === "USDT-TRC20" || wallet.name === "USDT-ERC20" ? "USDT" : wallet.walletTitle}
                    </span>
                  </WalletHeaderAction>
                }
              >
                <WalletCardBody>
                  <WalletCardBodyRow>
                    <InputField
                      value={wallet.walletAddress}
                      readOnly
                      label={
                        <WalletLabel>
                          <Image src={LinkIcon} alt="Address" draggable={false} />
                          <span>{tWallet("address")}</span>
                        </WalletLabel>
                      }
                      sx={{
                        gap: isMobile ? 1 : 1.25,
                        width: "100%",
                      }}
                    />
                    <CopyButton
                      onClick={() => copyAddressToClipboard(wallet.walletAddress)}
                    >
                      <Image
                        src={CopyIcon}
                        alt="Copy Icon"
                        width={isMobile ? 12 : 14}
                        height={isMobile ? 12 : 14}
                        draggable={false}
                      />
                    </CopyButton>
                  </WalletCardBodyRow>
                  <WalletCardBodyRow>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
                    >
                      <WalletLabel>
                        <Image
                          src={RoundedStackIcon}
                          alt="Total processed"
                          draggable={false}
                        />
                        <span>{tWallet("totalProcessed")}</span>
                      </WalletLabel>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                          lineHeight: "24px",
                          fontFamily: "UrbanistMedium",
                        }}
                      >
                        {getCurrencySymbol(
                          "USD",
                          formatNumberWithComma(wallet.totalProcessed)
                        )}
                      </Typography>
                    </Box>
                  </WalletCardBodyRow>

                  <Box sx={{ marginTop: isMobile ? "2px" : "4px" }}>
                    <WalletCardBodyRow>
                      <CustomButton
                        onClick={() => {
                          router.push("/transactions");
                        }}
                        label={tWallet("viewTransactions")}
                        variant="outlined"
                        endIcon={<ArrowOutward sx={{ fontSize: 16 }} />}
                        sx={{
                          backgroundColor: theme.palette.common.white,
                          color: theme.palette.primary.main,
                          border: `1px solid ${theme.palette.primary.main}`,
                          borderRadius: "6px",
                          fontSize: "15px",
                          fontWeight: 500,
                          fontFamily: "UrbanistMedium",
                          lineHeight: "18px",
                          px: isMobile ? "14px" : "24px",
                          py: isMobile ? "8px" : "11px",
                          height: isMobile ? "32px" : "40px",
                          gap: isMobile ? "6px" : "10px",
                          "&:hover": {
                            backgroundColor: theme.palette.common.white,
                            color: theme.palette.primary.main,
                            border: `1px solid ${theme.palette.primary.main}`,
                          },
                        }}
                      />

                      <WalletEditButton onClick={() => handleEdit(wallet)}>
                        <Image
                          src={EditIcon.src}
                          alt="View Transactions"
                          width={isMobile ? 13 : 16}
                          height={isMobile ? 14 : 16}
                          draggable={false}
                          style={{ filter: "brightness(0) saturate(100%) invert(0%)" }}
                        />
                      </WalletEditButton>
                    </WalletCardBodyRow>
                  </Box>
                </WalletCardBody>
              </PanelCard>
            </Grid>
          ))}
        </Grid>

        {/* <Dialog
        open={true}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: "12px" }
        }}
      >
        <DialogContent sx={{ px: "30px", pt: "30px" }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Image src={WalletIcon} alt="wallet" width={14} height={14} />
            <Typography
              sx={{
                fontFamily: "UrbanistMedium",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "100%"
              }}
            >
              You Don’t Have Active Wallets
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "140%",
              mt: "12px",
              color: "#676768"
            }}
          >
            You have to have at least one wallet address added in order to proceed.
          </Typography>
        </DialogContent>

        <DialogActions  
          sx={{
            px: "30px",
            pb: "30px",
            display: "flex",
            gap: "20px"
          }}
        >
          <Button
            fullWidth
            sx={{
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
              fontSize: "15px",
              color: "#676768",
              border: "1px solid #E9ECF2",
              py: "11px",
              borderRadius: "6px"
            }}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            sx={{
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
              fontSize: "15px",
              color: "#FFFFFF",
              backgroundColor: "#0004FF",
              py: "11px",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#0003cc"
              }
            }}
          >
            Go to Wallets
          </Button>
        </DialogActions>
      </Dialog> */}

        <AddWalletModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
        />
      </Box>
    </>
  );
};

export default Wallet;