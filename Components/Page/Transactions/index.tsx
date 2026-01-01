import React from "react";
import { Box } from "@mui/material";
import TransactionsTable, { Transaction } from "./TransactionsTable";
import TransactionsTopBar from "./TransactionsTopBar";

const TransactionPage = () => {
  // Sample transaction data matching the image
  const sampleTransactions: Transaction[] = [
    {
      id: "TX001",
      crypto: "BTC",
      amount: "0.0245 BTC",
      usdValue: "$1,250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
      fees: "0.0001 BTC",
      confirmations: "6/6",
      incomingTransactionId:
        "3a7b9cd2e3f4a5b6c7d8e9f0ab2c3d4e5f6a7b8c9d0e1f2a0b4c5d6e718a9b",
      outgoingTransactionId:
        "98a7b6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0c9f8e7d6c5b4a3f2e1d0c9b8a",
      callbackUrl: "https://api.example.com/callback",
      webhookResponse: {
        status: "done",
        txid: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a0b3b4c5d6e7780a9b",
        amount: 0.0245,
        confirmations: 6,
      },
    },
    {
      id: "TX002",
      crypto: "LTC",
      amount: "0.0245 LTC",
      usdValue: "$1,250",
      dateTime: "07.11.2025 14:32:00",
      status: "pending",
      fees: "0.0001 LTC",
      confirmations: "3/6",
      incomingTransactionId:
        "4b8c0de3f4a5b6c7d8e9f0ab2c3d4e5f6a7b8c9d0e1f2a0b4c5d6e718a9c",
    },
    {
      id: "TX003",
      crypto: "ETH",
      amount: "0.0245 ETH",
      usdValue: "$1,250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
      fees: "0.0001 ETH",
      confirmations: "12/12",
      incomingTransactionId:
        "5c9d1ef4a5b6c7d8e9f0ab2c3d4e5f6a7b8c9d0e1f2a0b4c5d6e718a9d",
      callbackUrl: "https://api.example.com/callback",
    },
    {
      id: "TX004",
      crypto: "LTC",
      amount: "0.0245 LTC",
      usdValue: "$1,250",
      dateTime: "07.11.2025 14:32:00",
      status: "failed",
    },
    {
      id: "TX005",
      crypto: "BTC",
      amount: "0.0245 BTC",
      usdValue: "$1,250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
      fees: "0.0001 BTC",
      confirmations: "6/6",
      incomingTransactionId:
        "6d0e2fa5b6c7d8e9f0ab2c3d4e5f6a7b8c9d0e1f2a0b4c5d6e718a9e",
    },
    {
      id: "TX006",
      crypto: "ETH",
      amount: "0.0245 ETH",
      usdValue: "$1,250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
      fees: "0.0001 ETH",
      confirmations: "12/12",
    },
  ];

  const handleSearch = (searchTerm: string) => {
    console.log("Search:", searchTerm);
    // Implement search logic
  };

  const handleDateRangeChange = (dateRange: any) => {
    console.log("Date range:", dateRange);
    // Implement date filter logic
  };

  const handleWalletChange = (wallet: string) => {
    console.log("Wallet:", wallet);
    // Implement wallet filter logic
  };

  const handleExport = () => {
    console.log("Export");
    // Implement export logic
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { md: "20px", xs: "16px" },
      }}
    >
      <TransactionsTopBar
        onSearch={handleSearch}
        onDateRangeChange={handleDateRangeChange}
        onWalletChange={handleWalletChange}
        onExport={handleExport}
      />
      <TransactionsTable transactions={sampleTransactions} rowsPerPage={10} />
    </Box>
  );
};

export default TransactionPage;
