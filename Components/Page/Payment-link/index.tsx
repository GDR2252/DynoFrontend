import EmptyDataModel from "@/Components/UI/EmptyDataModel";
import useIsMobile from "@/hooks/useIsMobile";
import { PaymentLinkData, PaymentLinksProps } from "@/utils/types/paymentLink";
import { Box } from "@mui/material";
import { useEffect } from "react";
import PaymentLinksTable from "./PaymentLinksTable";
import PaymentLinksTopBar from "./PaymentLinksTopBar";

const PaymentLinksPage = ({
  setPageName,
  setPageDescription,
  setPageAction,
}: PaymentLinksProps) => {
  useEffect(() => {
    setPageName?.("");
    setPageDescription?.("");
    setPageAction?.(null);
  }, []);

  const isMobile = useIsMobile("md");

  const paymentLinks: PaymentLinkData[] = [
    {
      id: "a7b9c1d2e3f4a5",
      description: "Premium Subscription - Annual Plan",
      usdValue: "1,250",
      cryptoValue: "0.025 BTC",
      createdAt: "2025-07-11T15:32:00Z",
      expiresAt: "2025-07-11T14:32:00Z",
      status: "active",
      timesUsed: 2,
    },
    {
      id: "a7b9c1d2e3f4a5",
      description: "Digital Product Purchase",
      usdValue: "233",
      cryptoValue: "0.004 BTC",
      createdAt: "2025-11-04T11:32:00Z",
      expiresAt: "2025-11-23T14:32:00Z",
      status: "expired",
      timesUsed: 2,
    },
    {
      id: "a7b9c1d2e3f4a5",
      description: "Consulting Services - January 2026",
      usdValue: "9,442",
      cryptoValue: "0.018 BTC",
      createdAt: "2025-11-01T22:32:00Z",
      expiresAt: "2025-11-29T14:32:00Z",
      status: "pending",
      timesUsed: 2,
    },
    {
      id: "a7b9c1d2e3f4a5",
      description: "Premium Subscription - Annual Plan",
      usdValue: "1,250",
      cryptoValue: "0.025 BTC",
      createdAt: "2025-07-11T15:32:00Z",
      expiresAt: "2025-07-11T14:32:00Z",
      status: "paid",
      timesUsed: 2,
    },
  ];

  const handleSearch = (value: string) => {
    console.log("Search:", value);
  };

  if (paymentLinks?.length === 0) {
    return <EmptyDataModel pageName="payment-links" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        "> :not(:last-child)": {
          marginBottom: isMobile ? "10px" : "20px",
        },
      }}
    >
      <PaymentLinksTopBar onSearch={handleSearch} />

      <PaymentLinksTable paymentLinks={paymentLinks} rowsPerPage={5} />
    </Box>
  );
};

export default PaymentLinksPage;
