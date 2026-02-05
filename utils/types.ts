import { AlertColor, SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";
import { Interface } from "readline";

export interface ReducerAction {
  payload: any;
  type: string;
  crudType: string;
}

export interface rootReducer {
  userReducer: userReducer;
  toastReducer: toastReducer;
  companyReducer: companyReducer;
  walletReducer: walletReducer;
  apiReducer: apiReducer;
  transactionReducer: transactionReducer;
  dashboardReducer: dashboardReducer;
}

export interface userReducer {
  email: string;
  name: string;
  loading: boolean;
  mobile: string;
  user_id: number;
  photo: string;
  telegram_id: string;
  error: { message: string; actionType: string } | null;
}

export interface companyReducer {
  companyList: ICompany[];
  loading: boolean;
  initialized: boolean;
}

export interface apiReducer {
  apiList: IApi[];
  loading: boolean;
}

export interface transactionReducer {
  customers_transactions: ICustomerTransactions[];
  self_transactions: ICustomerTransactions[];
  loading: boolean;
}

export interface dashboardReducer {
  dashboardData: IDashboardData | null;
  chartData: IDashboardChartData | null;
  initialized: boolean;
  loading: boolean;
}

export interface walletReducer {
  walletList: IWalletList[];
  loading: boolean;
  amount: number;
  currency: string;
  otpVerified?: boolean;
  paymentData: {
    mode: "avs_noauth" | "pin" | "otp" | "";
    fields: string[];
    uniqueRef: string;
  };
}

export interface IWalletList {
  company_id: number;
  company_name: string;
  wallets: IWallet[];
}

export interface IDashboardData {
  total_transactions: ITotalTransactions;
  total_volume: ITotalVolume;
  pending_transactions: IPendingTransactions;
  active_wallets: IActiveWallets;
  fee_tier: IFeeTier;
}
export interface ICompany {
  company_id: number;
  user_id: number;
  company_name: string;
  mobile: string;
  photo: string;
  email: string;
  website: string;
  country: string;
  state: string;
  city: string;
  address_line_1: string;
  address_line_2: string;
  zip_code: string;
  VAT_number: string;
}

export interface IApi {
  api_id: number;
  company_id: number;
  company_name: string;
  user_id: number;
  base_currency: string;
  apiKey: string;
  adminToken: string;
}

export interface ICustomerTransactions {
  user_id: number;
  payment_mode: string;
  base_amount: number;
  base_currency: string;
  transaction_reference: string;
  transaction_type: string;
  status: string;
  customer_id: number;
  createdAt: string;
  updatedAt: string;
  transaction_details: string;
  id: string;
  customer_name: string;
  email: string;
  company_name: string;
  company_id: number;
}

export interface ISelfTransactions {
  user_id: number;
  payment_mode: string;
  base_amount: number;
  base_currency: string;
  transaction_reference: string;
  transaction_type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  transaction_details: string;
  id: string;
}

export interface IWallet {
  id: string;
  user_id: number;
  amount: number;
  fee: number;
  wallet_type: string;
  wallet_address: string;
  wallet_account_id: string;
  createdAt: string;
  updatedAt: string;
  currency_type: string;
  amount_in_usd: string;
  fee_in_usd: string;
  transfer_rate: string;
}

export interface menuItem {
  value: any;
  label: any;
  disable?: boolean;
}

export interface toastReducer {
  open: boolean;
  severity: AlertColor;
  message: string;
  hide?: boolean;
  loading?: boolean;
}

export interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  pageName: string;
  pageDescription?: string;
  pageWarning?: ReactNode;
  pageAction?: ReactNode;
  pageHeaderSx?: SxProps<Theme>;
}

export interface TokenData {
  user_id: number;
  name: string;
  email: string;
  photo: string;
  mobile: string;
  telegram_id: string;
  role: string;
}

export interface IconProps {
  fill?: string;
  size?: number;
}

export interface pageProps {
  setPageName: (name: string) => void;
  setPageDescription?: (description: string) => void;
  setPageAction?: (action: ReactNode | null) => void;
  setPageHeaderSx?: (sx: SxProps<Theme> | null) => void;
  setPageWarning?: (warning: ReactNode | null) => void;
  discription?: Function;
}

export interface IToastProps {
  open?: boolean;
  severity?: AlertColor;
  message?: string;
  hide?: boolean;
  loading?: boolean;
}

export interface ISavedAddressTypes {
  user_address_id: number;
  user_id: number;
  label: string;
  currency: string;
  wallet_address: string;
}

export type TransactionStatus = "success" | "failed";

export interface ITransaction {
  txId: string | null;
  status: TransactionStatus;
  fromAddress?: string;
  toAddress?: string;
  errorMessage?: string;
}
export type ITransactions = ITransaction[];

// success types

interface ITotalTransactions {
  count: number;
  current_month: number;
  change_percent: number;
  comparison_period: string;
}

interface ITotalVolume {
  amount: number;
  current_month: number;
  currency: string;
  change_percent: number;
  comparison_period: string;
}

interface IPendingTransactions {
  count: number;
}

interface IActiveWallets {
  count: number;
  wallets: [];
  details: [];
}

export interface IFeeTier {
  current_tier: string;
  tier_description: string;
  monthly_volume: number;
  tier_threshold: number;
  percent_complete: number;
  amount_to_next_tier: number;
  next_tier: string;
}

export interface IDashboardChartData {
  period: string;
  group_by: string;
  start_date: string;
  end_date: string;
  chart_data: IChartData[];
  currency_breakdown: [];
  status_breakdown: [];
}

export interface IChartData {
  date: string;
  volume: number;
  transaction_count: number;
}
