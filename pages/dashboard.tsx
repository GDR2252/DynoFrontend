import CustomButton from "@/Components/UI/Buttons";
import useIsMobile from "@/hooks/useIsMobile";
import { pageProps, rootReducer } from "@/utils/types";
import { AddRounded } from "@mui/icons-material";
import Head from "next/head";
import router from "next/router";
import { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid } from "@mui/material";
import DashboardLeftSection from "@/Components/Page/Dashboard/DashboardLeftSection";
import DashboardRightSection from "@/Components/Page/Dashboard/DashboardRightSection";
import TransactionIcon from "@/assets/Icons/transaction.svg";
import WalletIcon from "@/assets/Icons/wallet-grey.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "@/styles/theme";
import { formatNumberWithComma, getCurrencySymbol } from "@/helpers";
import { ALLCRYPTOCURRENCIES } from "@/hooks/useWalletData";
import { useCompany } from "@/context/CompanyContext";
import { DashboardAction } from "@/Redux/Actions";
import { DASHBOARD_CHART, DASHBOARD_FETCH } from "@/Redux/Actions/DashboardAction";
import { TimePeriod } from "@/Components/UI/TimePeriodSelector";
import { useRouteLoader } from "@/context/RouteLoaderContext";
import ApiLoader from "@/styles/ApiLoader";

export default function Home({
  setPageName,
  setPageDescription,
  setPageAction,
}: pageProps) {
  const namespaces = ["dashboardLayout", "common"];

  const isMobile = useIsMobile("md");
  const { t } = useTranslation(namespaces);
  const tDashboard = useCallback(
    (key: string) => t(key, { ns: "dashboardLayout" }),
    [t]
  );
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("7days");
  const [rawTransactionData, setRawTransactionData] = useState<Array<{ date: string; value: number }>>([]);
  const tCommon = useCallback((key: string) => t(key, { ns: "common" }), [t]);
  const dispatch = useDispatch();

  const { activeCompanyId } = useCompany();

  const getSelectedPeriod = (period: TimePeriod) => {
    if (period === "7days") return "7d";
    if (period === "30days") return "30d";
    if (period === "90days") return "90d";
    if (period === "custom") return "custom";
  };

  useEffect(() => {
    if (activeCompanyId !== null) {
      dispatch(DashboardAction(DASHBOARD_FETCH, { id: activeCompanyId }));
    }
  }, [activeCompanyId, dispatch]);

  useEffect(() => {
    if (activeCompanyId !== null) {
      dispatch(DashboardAction(DASHBOARD_CHART, { id: activeCompanyId, period: getSelectedPeriod(selectedPeriod) }));
    }
  }, [activeCompanyId, dispatch, selectedPeriod]);

  const dashboardState = useSelector((state: rootReducer) => state.dashboardReducer);

  function formatToMonthDay(dateString: string): string {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  }

  useEffect(() => {
    if (dashboardState?.chartData && dashboardState?.initialized) {
      setRawTransactionData(dashboardState?.chartData?.chart_data?.map((item) => ({
        date: formatToMonthDay(item.date),
        value: item.volume,
      })));
    }
  }, [dashboardState?.chartData, selectedPeriod, dashboardState?.initialized]);

  useEffect(() => {
    if (setPageName && setPageDescription) {
      // Using dashboardLayout namespace
      setPageName(tDashboard("dashboard"));
      setPageDescription(tDashboard("dashboardDescription"));
    }
  }, [setPageName, setPageDescription, tDashboard]);

  useEffect(() => {
    if (!setPageAction) return;
    setPageAction(
      <CustomButton
        label={
          isMobile
            ? tDashboard("create")
            : tDashboard("createPaymentLink")
        }
        variant="primary"
        size="medium"
        endIcon={<AddRounded sx={{ fontSize: isMobile ? 18 : 20 }} />}
        onClick={() => router.push("/create-pay-link")}
        sx={{
          height: isMobile ? 34 : 40,
          px: isMobile ? 1.5 : 2.5,
          fontSize: isMobile ? 13 : 15,
        }}
      />
    );
    return () => setPageAction(null);
  }, [setPageAction, tDashboard, isMobile]);

  const dashboardCards = [
    {
      key: "transactions",
      title: tDashboard("totalTransactions"),
      icon: TransactionIcon,
      value: dashboardState?.dashboardData?.total_transactions?.count || 0,
      percentage: dashboardState?.dashboardData?.total_transactions?.change_percent || "0%",
      percentageColor: theme.palette.border.success,
      showCurrency: false,
    },
    {
      key: "volume",
      title: t("totalVolume"),
      icon: RoundedStackIcon,
      value: getCurrencySymbol("USD", formatNumberWithComma(dashboardState?.dashboardData?.total_volume?.amount || 0)),
      percentage: dashboardState?.dashboardData?.total_volume?.change_percent || "0%",
      percentageColor: theme.palette.border.success,
      showCurrency: true,
    },
    {
      key: "wallets",
      title: tDashboard("activeWallets"),
      icon: WalletIcon,
      value: dashboardState?.dashboardData?.active_wallets?.count || 0,
      isWallets: true,
      wallets: dashboardState?.dashboardData?.active_wallets?.wallets || []
        .map((code) =>
          ALLCRYPTOCURRENCIES.find((coin) => coin.code === code)
        )
        .filter(Boolean),
    },
  ];

  const changePeriod = (period: TimePeriod) => {
    setSelectedPeriod(period);
  }

  const { startLoading, stopLoading, isLoading } = useRouteLoader();

  useEffect(() => {
    if (dashboardState?.initialized) {
      stopLoading();
    } else {
      startLoading();
    }
  }, [dashboardState?.initialized]);

  if (isLoading || !dashboardState?.initialized) return <ApiLoader />;

  return (
    <>
      <Head>
        <title>BozzWallet</title>
        <meta name="description" content="Generated by next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <Grid container spacing={2.5}>
          <Grid item xs={12} xl={8}>
            <DashboardLeftSection
              dashboardCards={dashboardCards}
              changePeriod={changePeriod}
              selectedPeriod={selectedPeriod}
              rawTransactionData={rawTransactionData}
            />
          </Grid>

          <Grid item xs={12} xl={4}>
            <DashboardRightSection
              tierData={dashboardState?.dashboardData?.fee_tier}
            />
          </Grid>
        </Grid>
      </main>
    </>
  );
}
