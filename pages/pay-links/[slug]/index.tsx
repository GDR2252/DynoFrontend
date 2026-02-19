import CreatePaymentLinkPage from "@/Components/Page/CreatePaymentLink";
import { Text } from "@/Components/Page/CreatePaymentLink/styled";
import useIsMobile from "@/hooks/useIsMobile";
import { theme } from "@/styles/theme";
import { PaymentLink } from "@/utils/types/paymentLink";
import { ExpandLess } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function EditPaymentLink() {
  const router = useRouter();
  const { slug } = router.query;
  const isMobile = useIsMobile();
    const { t } = useTranslation("createPaymentLinkScreen");

  useEffect(() => {
    if (!router.isReady) return;

    if (typeof slug !== "string" || slug === undefined) {
      router.push("/pay-links");
    }
  }, [router, router.isReady, slug]);

  const paymentLinkData: PaymentLink | {} = (slug as string)
    ? {
      link_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      amount: 199.99,
      currency: "USD",
      description: "Order #12345 - Premium Subscription",
      status: "active",
      clientName: "Artur S.",
      expire: "yes",
      blockchainFees: "customer",
      acceptedCryptoCurrency: ["BTC", "ETH", "LTC", "DOGE", "USDT"],
      payment_url:
        "https://checkout.dynopay.com/pay/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      redirect_url: "https://mystore.com/order/12345/success",
      webhook_url: "https://mystore.com/webhooks/dynopay",
      metadata: {
        order_id: "12345",
        customer_email: "customer@example.com",
      },
      created_at: "2024-01-15T10:30:00Z",
      paid_at: "2024-01-15T10:45:00Z",
      transaction: {
        transaction_id: "txn_abc123",
        crypto_currency: "BTC",
        crypto_amount: 0.00456,
        confirmations: 3,
        tx_hash: "0x1234567890abcdef...",
      },
    }
    : {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Box
        onClick={() => router.push("/pay-links")}
        sx={{
          display: "flex",
          gap: "10px",
          border: `1px solid ${theme.palette.border.main}`,
          backgroundColor: theme.palette.common.white,
          borderRadius: "8px",
          padding: "10px 14px",
          height: "36px",
          width: "fit-content",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <ExpandLess
          sx={{ fontSize: "large", rotate: "270deg", color: "#032C33" }}
        />
        <Text sx={{ fontSize: "13px", color: theme.palette.text.secondary }}>
          {t("backToPaymentLinks")}
        </Text>
      </Box>
      <Text
        sx={{
          fontSize: isMobile ? "22px" : "30px",
          color: theme.palette.text.primary,
        }}
      >
        {t("editPaymentLink")}
      </Text>
      <CreatePaymentLinkPage
        paymentLinkData={paymentLinkData}
        disabled={'status' in paymentLinkData && paymentLinkData.status === "paid"}
      />
    </Box>
  );
}
