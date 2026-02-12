import React, { useEffect, useState, useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import TransactionsTable, { Transaction } from "./TransactionsTable";
import TransactionsTopBar from "./TransactionsTopBar";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer, ICustomerTransactions } from "@/utils/types";
import { TransactionAction } from "@/Redux/Actions";
import { TRANSACTION_FETCH } from "@/Redux/Actions/TransactionAction";
import { DateRange } from "@/Components/UI/DatePicker";
import { isWithinInterval, parseISO, startOfDay, endOfDay } from "date-fns";
import EmptyDataModel from "@/Components/UI/EmptyDataModel";

const TransactionPage = () => {
  const dispatch = useDispatch();

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [selectedWallet, setSelectedWallet] = useState("all");

  const transactionState = useSelector(
    (state: rootReducer) => state.transactionReducer
  );

  // useEffect(() => {
  //   dispatch(TransactionAction(TRANSACTION_FETCH));
  // }, [dispatch]);

  // Wallet mapping for filtering: Matches values in TransactionsTopBar
  const walletMapping: { [key: string]: string } = {
    all: "all",
    wallet1: "BTC",
    wallet2: "ETH",
    wallet3: "LTC",
    wallet4: "DOGE",
    wallet5: "BCH",
    wallet6: "TRX",
    wallet7: "USDT-ERC20",
    wallet8: "USDT-TRC20",
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  // const processedTransactions: Transaction[] = useMemo(() => {
  //   if (!transactionState?.customers_transactions) return [];

  //   return transactionState.customers_transactions
  //     .filter((item: ICustomerTransactions) => {
  //       // 1. Search Filter
  //       if (searchTerm) {
  //         const lowerSearch = searchTerm.toLowerCase();
  //         const matchesId = item.id?.toLowerCase().includes(lowerSearch);
  //         const matchesAmount = item.base_amount
  //           ?.toString()
  //           .includes(lowerSearch);
  //         const matchesCrypto = item.base_currency?.toLowerCase().includes(lowerSearch);

  //         if (!matchesId && !matchesAmount && !matchesCrypto) return false;
  //       }

  //       // 2. Wallet Filter
  //       if (selectedWallet !== "all") {
  //         const targetCurrency = walletMapping[selectedWallet];
  //         // If strict matching is required. Note: 'item.base_currency' might be "BTC" etc.
  //         if (targetCurrency && item.base_currency !== targetCurrency) {
  //           return false;
  //         }
  //       }

  //       // 3. Date Range Filter
  //       if (dateRange.startDate && dateRange.endDate && item.createdAt) {
  //         try {
  //           const transactionDate = parseISO(item.createdAt);
  //           if (
  //             !isWithinInterval(transactionDate, {
  //               start: startOfDay(dateRange.startDate),
  //               end: endOfDay(dateRange.endDate),
  //             })
  //           ) {
  //             return false;
  //           }
  //         } catch (e) {
  //           console.error("Date parsing error", item.createdAt);
  //           return false;
  //         }
  //       }

  //       return true;
  //     })
  //     .map((item: ICustomerTransactions) => ({
  //       id: item.id || `TX-${Math.random().toString(36).substr(2, 9)}`,
  //       crypto: item.base_currency,
  //       amount: `${item.base_amount} ${item.base_currency}`,
  //       usdValue: `$${item.base_amount}`, // Adjust if you have a conversion rate
  //       dateTime: formatDateTime(item.createdAt),
  //       status: (item.status === "success" || item.status === "successful") ? "done" : (item.status === "failed" ? "failed" : "pending"),
  //       fees: "0",
  //       confirmations: "0/0",
  //       incomingTransactionId: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
  //       outgoingTransactionId: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a",
  //       callbackUrl: "https://api.example.com/callback",
  //       webhookResponse: {
  //         "status": "done",
  //         "txid": "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
  //         "amount": 0.0245,
  //         "confirmations": 6
  //       }
  //     }));
  // }, [transactionState.customers_transactions, searchTerm, selectedWallet, dateRange]);

  const processedTransactions: Transaction[]= [
    {
      id: "69e2fc89-58c1-49db-8be4-f5b7004fada0",
      crypto: "BTC",
      amount: "0.0245 BTC",
      usdValue: "1250",
      dateTime: formatDateTime("2026-01-12T12:59:04.795Z"),
      status: "done",
      fees: "0",
      confirmations: "0/0",
      incomingTransactionId: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      outgoingTransactionId: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a",
      callbackUrl: "https://api.example.com/callback",
      webhookResponse: {
        "status": "done",
        "txid": "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        "amount": 0.0245,
        "confirmations": 6
      }
    },{
      id: "69e2fc89-58c1-49db-8be4-f5b7004fada0",
      crypto: "LTC",
      amount: "0.0245 LTC",
      usdValue: "1250",
      dateTime: formatDateTime("2026-01-12T12:59:04.795Z"),
      status: "pending",
      fees: "0",
      confirmations: "0/0",
      incomingTransactionId: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      outgoingTransactionId: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a",
      callbackUrl: "https://api.example.com/callback",
      webhookResponse: {
        "status": "done",
        "txid": "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        "amount": 0.0245,
        "confirmations": 6
      }
    },{
      id: "69e2fc89-58c1-49db-8be4-f5b7004fada0",
      crypto: "ETH",
      amount: "0.0245 ETH",
      usdValue: "1250",
      dateTime: formatDateTime("2026-01-12T12:59:04.795Z"),
      status: "done",
      fees: "0",
      confirmations: "0/0",
      incomingTransactionId: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      outgoingTransactionId: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a",
      callbackUrl: "https://api.example.com/callback",
      webhookResponse: {
        "status": "done",
        "txid": "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        "amount": 0.0245,
        "confirmations": 6
      }
    },{
      id: "69e2fc89-58c1-49db-8be4-f5b7004fada0",
      crypto: "BTC",
      amount: "0.0245 BTC",
      usdValue: "1250",
      dateTime: formatDateTime("2026-01-12T12:59:04.795Z"),
      status: "failed",
      fees: "0",
      confirmations: "0/0",
      incomingTransactionId: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      outgoingTransactionId: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a",
      callbackUrl: "https://api.example.com/callback",
      webhookResponse: {
        "status": "done",
        "txid": "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        "amount": 0.0245,
        "confirmations": 6
      }
    },{
      id: "69e2fc89-58c1-49db-8be4-f5b7004fada0",
      crypto: "LTC",
      amount: "0.0245 LTC",
      usdValue: "1250",
      dateTime: formatDateTime("2026-01-12T12:59:04.795Z"),
      status: "done",
      fees: "0",
      confirmations: "0/0",
      incomingTransactionId: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      outgoingTransactionId: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a",
      callbackUrl: "https://api.example.com/callback",
      webhookResponse: {
        "status": "done",
        "txid": "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        "amount": 0.0245,
        "confirmations": 6
      }
    },
    {
      id: "69e2fc89-58c1-49db-8be4-f5b7004fada0",
      crypto: "ETH",
      amount: "0.0245 ETH",
      usdValue: "1250",
      dateTime: formatDateTime("2026-01-12T12:59:04.795Z"),
      status: "done",
      fees: "0",
      confirmations: "0/0",
      incomingTransactionId: "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      outgoingTransactionId: "9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a",
      callbackUrl: "https://api.example.com/callback",
      webhookResponse: {
        "status": "done",
        "txid": "3a7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        "amount": 0.0245,
        "confirmations": 6
      }
    },
  ]

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  const handleWalletChange = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  const handleExport = () => {
    console.log("Export triggered");
    // TODO: Implement export functionality
  };

  // if (transactionState.loading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (transactionState?.customers_transactions?.length === 0 && !transactionState.loading) {
  //   return (
  //     <EmptyDataModel pageName="transactions" />
  //   );
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        "> :not(:last-child)": {
          marginBottom: { md: "20px", xs: "16px" },
        },
      }}
    >
      <TransactionsTopBar
        onSearch={handleSearch}
        onDateRangeChange={handleDateRangeChange}
        onWalletChange={handleWalletChange}
        onExport={handleExport}
      />
      <TransactionsTable transactions={processedTransactions} rowsPerPage={5} />
    </Box>
  );
};

export default TransactionPage;
