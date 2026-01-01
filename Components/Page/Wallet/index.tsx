import React, { useState, useCallback, useMemo } from "react";
import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import BNBIcon from "@/assets/cryptocurrency/BNB-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";
import CopyIcon from "@/assets/Icons/copy-icon.svg";
import EditIcon from "@/assets/Icons/edit-icon.svg";
import LinkIcon from "@/assets/Icons/link-icon.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { ArrowOutward } from "@mui/icons-material";
import { theme } from "@/styles/theme";
import { getCurrencySymbol, formatNumberWithComma } from "@/helpers";
import { useDispatch } from "react-redux";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { useTranslation } from "react-i18next";
import PanelCard from "@/Components/UI/PanelCard";
import {
  HeaderIcon,
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

interface WalletData {
  icon: any;
  walletTitle: string;
  walletAddress: string;
  name: string;
  totalProcessed: number;
}

const Wallet = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("walletScreen");
  const tWallet = useCallback(
    (key: string): string => {
      const result = t(key, { ns: "walletScreen" });
      return typeof result === "string" ? result : String(result);
    },
    [t]
  );

  const [openEditModal, setOpenEditModal] = useState(false);

  const walletData = useMemo<WalletData[]>(
    () => [
      {
        icon: BitcoinIcon,
        walletTitle: tWallet("mainBitcoinWallet"),
        walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
        name: "BTC",
        totalProcessed: 125430.5,
      },
      {
        icon: EthereumIcon,
        walletTitle: tWallet("ethereumPayments"),
        walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
        name: "ETH",
        totalProcessed: 89234.2,
      },
      {
        icon: LitecoinIcon,
        walletTitle: tWallet("litecoinWallet"),
        walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
        name: "LTC",
        totalProcessed: 45678.9,
      },
      {
        icon: BNBIcon,
        walletTitle: tWallet("bnbWallet"),
        walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
        name: "BNB",
        totalProcessed: 125430.5,
      },
      {
        icon: DogecoinIcon,
        walletTitle: tWallet("dogecoinWallet"),
        walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
        name: "DOGE",
      totalProcessed: 89234.2,
    },
    // {
    //   icon: BitcoinCashIcon,
    //   walletTitle: tWallet("bitcoinCashWallet"),
    //   walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
    //   name: "BCH",
    //   totalProcessed: 45678.9,
    // },
    // {
    //   icon: TronIcon,
    //   walletTitle: tWallet("tronWallet"),
    //   walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
    //   name: "TRX",
    //   totalProcessed: 125430.5,
    // },
    // {
    //   icon: USDTIcon,
    //   walletTitle: tWallet("usdtWallet"),
    //   walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
    //   name: "USDT",
    //   totalProcessed: 89234.2,
    // },
    ],
    [tWallet]
  );

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

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container spacing={2.5}>
        {walletData.map((wallet, index) => (
          <Grid item xs={12} md={6} xl={4} key={index}>
            <PanelCard
              title={wallet.walletTitle}
              headerIcon={
                <HeaderIcon>
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    draggable={false}
                  />
                </HeaderIcon>
              }
              showHeaderBorder={false}
              headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
              bodyPadding={theme.spacing(3, 2.5, 2.5, 2.5)}
              headerAction={
                <WalletHeaderAction>
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    draggable={false}
                  />
                  <span>{wallet.name}</span>
                </WalletHeaderAction>
              }
            >
              <WalletCardBody>
                <WalletCardBodyRow>
                  <InputField
                    label={
                      <WalletLabel>
                        <Image src={LinkIcon} alt="Address" draggable={false} />
                        <span>{tWallet("address")}</span>
                      </WalletLabel>
                    }
                    sx={{
                      width: "100%",
                      gap: 1.25,
                    }}
                  />
                  <WalletCopyButton>
                    <Image src={CopyIcon} alt="Copy" draggable={false} />
                  </WalletCopyButton>
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

                <WalletCardBodyRow>
                  <CustomButton
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
                      width={16}
                      height={16}
                      style={{
                        objectFit: "contain",
                        filter: `brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(100%)`,
                      }}
                      draggable={false}
                    />
                  </WalletEditButton>
                </WalletCardBodyRow>
              </WalletCardBody>
            </PanelCard>
          </Grid>
        ))}
      </Grid>

      <AddWalletModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </Box>
  );
};

export default Wallet;
