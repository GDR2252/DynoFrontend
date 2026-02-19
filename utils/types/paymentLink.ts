export interface PaymentLink {
  link_id: string;
  amount: number;
  currency: string;
  description: string;
  status: PaymentLinkStatus;
  clientName: string;
  expire: string;
  blockchainFees: string;
  acceptedCryptoCurrency: string[];
  payment_url: string;
  redirect_url: string;
  webhook_url: string;
  metadata: {
    order_id: string;
    customer_email: string;
  };
  created_at: string;
  paid_at: string;
  transaction: {
    transaction_id: string;
    crypto_currency: string;
    crypto_amount: number;
    confirmations: number;
    tx_hash: string;
  };
}

export interface PaymentLinksProps {
  setPageName?: (v: string) => void;
  setPageDescription?: (v: string) => void;
  setPageAction?: (v: React.ReactNode | null) => void;
}

export type PaymentLinkStatus = "active" | "expired" | "paid" | "pending";

export interface PaymentLinkData {
  id: string;
  description: string;
  usdValue: string;
  cryptoValue?: string;
  createdAt: string;
  expiresAt: string;
  status: PaymentLinkStatus;
  timesUsed: number;
}

export interface PaymentLinksTableProps {
  paymentLinks: PaymentLinkData[];
  rowsPerPage?: number;
}

export interface PaymentLinkSuccessModalProps {
  open: boolean;
  onClose: () => void;
  paymentLink: string;
  paymentSettings: {
    value: string;
    cryptoValue: string;
    expire: string;
    description: string;
    blockchainFees: string;
    linkId: string;
  };
  onCopyLink: () => void;
}

export interface PaymentDetailRowProps {
  icon: string;
  alt: string;
  label: string;
  value: React.ReactNode;
  iconStyle?: React.CSSProperties;
  alignTop?: boolean;
}

export interface ActionButtonsProps {
    isMobile: boolean;
    hasPaymentLinkData: boolean;
    disabled: boolean;
    tPaymentLink: (key: string) => string;
    handleCreatePaymentLink: () => void;
    paymentSettingsErrors: any;
    paymentSettings: any;
}

export interface ICryptoItem {
    name: string;
    label: string;
    icon: any;
    fullOrder: number;
    shortOrder: number;
}

export interface CryptoItemCardProps {
    item: ICryptoItem;
    isMobile: boolean;
    walletNotSetUp: string[];
    paymentSettings: any;
    setPaymentSettings: React.Dispatch<React.SetStateAction<any>>;
    tPaymentLink: (key: string) => string;
    isLarge: boolean;
    isSmall: boolean;
}

export interface ICryptoItem {
    name: string;
    label: string;
    icon: any;
    fullOrder: number;
    shortOrder: number;
}

export interface CryptoSelectionProps {
    isMobile: boolean;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    cryptoItems: ICryptoItem[];
    filteredCryptoItems: ICryptoItem[];
    showFilteredCryptoItems: boolean;
    showAllCoins: boolean;
    setShowAllCoins: React.Dispatch<React.SetStateAction<boolean>>;
    hasPaymentLinkData: boolean;
    isLarge: boolean;
    isSmall: boolean;
    walletNotSetUp: string[];
    paymentSettings: any;
    setPaymentSettings: React.Dispatch<React.SetStateAction<any>>;
}

export interface DescriptionSectionProps {
    isMobile: boolean;
    tPaymentLink: (key: string) => string;
    paymentSettings: any;
    paymentSettingsTouched: any;
    paymentSettingsErrors: any;
    handlePaymentSettingsChange: (field: string, value: string) => void;
    handlePaymentSettingsBlur: (field: string) => void;
}

export interface ExpireSelectorProps {
    tPaymentLink: (key: string) => string;
    label?: string;
    value?: "yes" | "no";
    onChange?: (value: "yes" | "no") => void;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    required?: boolean;
}

export interface PaymentLinkHeaderProps {
    tPaymentLink: (key: string) => string;
    paymentLinkData: PaymentLink;
    disabled: boolean;
    isMobile: boolean;
    count: number;
    truncateByWords: (text: string, maxLength: number) => string;
}

export interface PaymentSettingsBasicProps {
    isMobile: boolean;
    tPaymentLink: (key: string) => string;
    paymentSettings: any;
    paymentSettingsTouched: any;
    paymentSettingsErrors: any;
    currencyOpen: boolean;
    currencies: string[];
    expireOpen: boolean;
    blockchainFees: string;
    disable: any;
    handlePaymentSettingsChange: (field: string, value: string) => void;
    handlePaymentSettingsBlur: (field: string) => void;
    handleCurrencyOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleCurrencyClose: () => void;
    handleCurrencySelect: (currency: string) => void;
    handleExpireOpen: (e: React.MouseEvent<HTMLElement>) => void;
    handleExpireClose: () => void;
    handleExpireSelect: (value: string) => void;
    handleBlockchainFeesChange: (value: string) => void;
    currencyAnchorEl: React.MutableRefObject<HTMLButtonElement | null>;
    currencyTriggerRef: React.MutableRefObject<HTMLButtonElement | null>;
    expireAnchorEl: React.MutableRefObject<HTMLElement | null>;
    expireTriggerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export interface PostPaymentSettingsProps {
    hasPaymentLinkData: boolean;
    isMobile: boolean;
    tPaymentLink: (key: string) => string;
    postPaymentSettings: any;
    handleChange: (field: string, value: string) => void;
    showHelpers?: boolean;
    showCreateButton?: boolean;
    onCreate?: () => void;
}

export interface TabNavigationProps {
    activeTab: number;
    onChange: (tab: number) => void;
    tPaymentLink: (key: string) => string;
    hasPaymentLinkData: boolean;
}

export interface TaxSectionProps {
    isMobile: boolean;
    tPaymentLink: (key: string) => string;
    includeTax: boolean;
    setIncludeTax: React.Dispatch<React.SetStateAction<boolean>>;
    currentLng: string;
}