import { Box, Typography } from "@mui/material";
import Head from "next/head";
import React, { useMemo } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import CustomButton from "@/Components/UI/Buttons";
import {
  AddRounded,
  ArrowOutward as ArrowOutwardIcon,
} from "@mui/icons-material";
import { pageProps, rootReducer } from "@/utils/types";
import { theme } from "@/styles/theme";
import Wallet from "@/Components/Page/Wallet";
import AddWalletModal from "@/Components/UI/AddWalletModal";
import { useRouter } from "next/router";
import { SetupWarnnigContainer } from "@/Components/Page/Wallet/styled";
import { WarningIconContainer } from "@/Components/UI/AddWalletModal/styled";
import Image from "next/image";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useCompany } from "@/context/CompanyContext";
import { WalletAction } from "@/Redux/Actions";
import { WALLET_FETCH } from "@/Redux/Actions/WalletAction";

import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";
import EmptyDataModel from "@/Components/UI/EmptyDataModel";

type WalletType =
  | "BTC" | "ETH" | "LTC" | "DOGE" | "BCH" | "TRX" | "USDT-ERC20" | "USDT-TRC20";

type CryptoCode = WalletType;

interface WalletDataType {
  icon: any;
  walletTitle: WalletType;
  walletAddress: string;
  name: string;
  totalProcessed: number;
}

export interface Cryptocurrency {
  code: CryptoCode;
  name: string;
  icon: any;
}

const WALLET_ORDER: WalletType[] = [
  "BTC", "ETH", "LTC", "DOGE", "BCH", "TRX", "USDT-ERC20", "USDT-TRC20",
];

const WALLET_ICONS: Record<WalletType, any> = {
  BTC: BitcoinIcon,
  ETH: EthereumIcon,
  LTC: LitecoinIcon,
  DOGE: DogecoinIcon,
  BCH: BitcoinCashIcon,
  TRX: TronIcon,
  "USDT-ERC20": USDTIcon,
  "USDT-TRC20": USDTIcon,
};

const WALLET_NAMES: Record<WalletType, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  LTC: "Litecoin",
  DOGE: "Dogecoin",
  BCH: "Bitcoin Cash",
  TRX: "Tron",
  "USDT-ERC20": "USDT-ERC20",
  "USDT-TRC20": "USDT-TRC20",
};

export const ALLCRYPTOCURRENCIES: Cryptocurrency[] = [
  { code: "BTC", name: "Bitcoin", icon: BitcoinIcon },
  { code: "ETH", name: "Ethereum", icon: EthereumIcon },
  { code: "LTC", name: "Litecoin", icon: LitecoinIcon },
  { code: "DOGE", name: "Dogecoin", icon: DogecoinIcon },
  { code: "BCH", name: "Bitcoin Cash", icon: BitcoinCashIcon },
  { code: "TRX", name: "Tron", icon: TronIcon },
  { code: "USDT-ERC20", name: "USDT-ERC20", icon: USDTIcon },
  { code: "USDT-TRC20", name: "USDT-TRC20", icon: USDTIcon },
];

const WalletPage = ({
  setPageName,
  setPageDescription,
  setPageAction,
  setPageHeaderSx,
  setPageWarning,
}: pageProps) => {
  const router = useRouter();
  const namespaces = ["walletScreen", "common"];
  const isMobile = useIsMobile("md");
  const { t } = useTranslation(namespaces);
  const tDashboard = useCallback(
    (key: string, defaultValue?: string) =>
      t(key, { ns: "walletScreen", defaultValue }),
    [t]
  );

  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();
  const walletState = useSelector((state: rootReducer) => state.walletReducer);
  const walletLoading = Boolean(walletState?.loading);
  const { activeCompanyId } = useCompany();

  useEffect(() => {
    if (activeCompanyId) {
      dispatch(WalletAction(WALLET_FETCH, { id: activeCompanyId }));
    }
  }, [activeCompanyId]);

  const walletData = useMemo<WalletDataType[]>(() => {
    const list = Array.isArray(walletState?.walletList[0]?.wallets)
      ? walletState.walletList[0]?.wallets
      : [];

    return list
      .filter(
        w =>
          WALLET_ORDER.includes(w.wallet_type as WalletType) &&
          Boolean(w.wallet_address),
      )
      .sort(
        (a, b) =>
          WALLET_ORDER.indexOf(a.wallet_type as WalletType) -
          WALLET_ORDER.indexOf(b.wallet_type as WalletType),
      )
      .map(w => {
        const type = w.wallet_type as WalletType;
        return {
          icon: WALLET_ICONS[type],
          walletTitle: type,
          walletAddress: w.wallet_address,
          name: WALLET_NAMES[type],
          totalProcessed: Number(w.amount_in_usd) || 0,
        };
      });
  }, [walletState?.walletList]);

  const cryptocurrencies = useMemo(() => {
    if (!walletData.length) return ALLCRYPTOCURRENCIES;
    return ALLCRYPTOCURRENCIES.filter(
      c => !walletData.some(w => w.walletTitle === c.code),
    );
  }, [walletData]);

  useEffect(() => {
    if (setPageName && setPageDescription) {
      setPageName(tDashboard("walletsTitle"));
      setPageDescription(
        tDashboard(
          "walletsDescription",
          "Manage your cryptocurrency wallet addresses"
        )
      );
    }
  }, [setPageName, setPageDescription, tDashboard]);

  useEffect(() => {
    if (setPageHeaderSx) {
      // Example: You can set custom styles for PageHeader from here
      setPageHeaderSx({
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          gap: 0.5,
        },

        "& .pageAction": {
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        },
      });
    }
    return () => {
      if (setPageHeaderSx) {
        setPageHeaderSx(null);
      }
    };
  }, [setPageHeaderSx]);

  useEffect(() => {
    if (!setPageWarning) return;
    setPageWarning(
      <>
        {(!walletLoading && (cryptocurrencies.length !== 0)) && (
          <SetupWarnnigContainer >
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
            <Box>
              <Typography sx={{ fontFamily: "UrbanistSemibold", fontWeight: "600", fontSize: isMobile ? "10px" : "15px", lineHeight: "130%", letterSpacing: 0 }}>{t("walletSetUpWarnnigTitle")}</Typography>
              <Typography sx={{ fontFamily: "UrbanistMedium", fontWeight: "500", fontSize: isMobile ? "10px" : "15px", lineHeight: "130%", letterSpacing: 0 }}>
                {(() => {
                  const text = t("walletSetUpWarnnigSubtitle");
                  const boldText = t("walletSetUpWarnnigSubtitleBold");
                  const parts = text.split(boldText);
                  if (parts.length === 2) {
                    return (
                      <>
                        {parts[0]}
                        <Typography component="span" sx={{ fontFamily: "UrbanistSemibold", fontWeight: "600", fontSize: isMobile ? "10px" : "15px", lineHeight: "130%", letterSpacing: 0 }}>
                          {boldText}
                        </Typography>
                        {parts[1]}
                      </>
                    );
                  }
                  return text;
                })()}
              </Typography>
            </Box>
          </SetupWarnnigContainer>
        )}
      </>
    );
    return () => setPageWarning(null);
  }, [setPageWarning, isMobile, t, walletLoading, cryptocurrencies.length]);

  useEffect(() => {
    if (!setPageAction) return;
    setPageAction(
      <>
        <CustomButton
          label={tDashboard("createPaymentLink", "Create payment link")}
          variant="outlined"
          size="medium"
          endIcon={<ArrowOutwardIcon sx={{ fontSize: isMobile ? 14 : 16 }} />}
          onClick={() => {
            router.push("/create-pay-link");
          }}
          sx={{
            border: `1px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            height: isMobile ? 34 : 40,
            px: isMobile ? 1.5 : 2.5,
            fontSize: isMobile ? 13 : 15,
            "&:hover": {
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
            },
            "&:disabled": {
              border: `1px solid ${theme.palette.border.main}`,
              color: theme.palette.text.primary,
            },
            [theme.breakpoints.down("sm")]: {
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
        <CustomButton
          label={tDashboard("addWallet", "Add wallet")}
          variant="primary"
          size="medium"
          endIcon={<AddRounded sx={{ fontSize: isMobile ? 18 : 20 }} />}
          onClick={() => setOpenCreate(true)}
          sx={{
            height: isMobile ? 34 : 40,
            px: isMobile ? 1.5 : 2.5,
            fontSize: isMobile ? 13 : 15,
            [theme.breakpoints.down("sm")]: {
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
      </>
    );
    return () => setPageAction(null);
  }, [setPageAction, tDashboard, isMobile, router]);

  if (walletData.length === 0 && !walletLoading) {
    return (
      <EmptyDataModel cryptocurrencies={cryptocurrencies} pageName="wallet" />
    );
  }

  return (
    <>
      <Head>
        <title>DynoPay - Wallet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <Wallet cryptocurrencies={cryptocurrencies} walletLoading={walletLoading} walletData={walletData} />
        <AddWalletModal
          cryptocurrencies={cryptocurrencies}
          open={openCreate}
          onClose={() => setOpenCreate(false)}
        />
      </Box>
    </>
  );
};

export default WalletPage;
