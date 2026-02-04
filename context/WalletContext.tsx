import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WalletAction } from "@/Redux/Actions";
import { WALLET_FETCH } from "@/Redux/Actions/WalletAction";
import { rootReducer } from "@/utils/types";
import { useCompany } from "@/context/CompanyContext";

import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";

/* ---------------- Types ---------------- */

export type WalletType =
    | "BTC" | "ETH" | "LTC" | "DOGE" | "BCH" | "TRX" | "USDT-ERC20" | "USDT-TRC20";

export type CryptoCode = WalletType;

export interface WalletDataType {
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

/* ---------------- Static Maps ---------------- */

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

/* ---------------- Context ---------------- */

interface WalletContextType {
    walletLoading: boolean;
    walletData: WalletDataType[];
    cryptocurrencies: Cryptocurrency[];
    walletWarning: boolean;
    activeWalletsData: Cryptocurrency[];
}

const WalletContext = createContext<WalletContextType | null>(null);

/* ---------------- Provider ---------------- */

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const walletState = useSelector((state: rootReducer) => state.walletReducer);
    const walletLoading = Boolean(walletState?.loading);
    const { activeCompanyId } = useCompany();

    const [walletWarning, setWalletWarning] = useState(false);

    /* fetch wallets */
    useEffect(() => {
        if (activeCompanyId) {
            dispatch(WalletAction(WALLET_FETCH, { id: activeCompanyId }));
        }
    }, [activeCompanyId]);

    /* build walletData */
    const walletData = useMemo<WalletDataType[]>(() => {
        const list = Array.isArray(walletState?.walletList)
            ? walletState.walletList
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

    /* missing cryptos */
    const cryptocurrencies = useMemo(() => {
        if (!walletData.length) return ALLCRYPTOCURRENCIES;
        return ALLCRYPTOCURRENCIES.filter(
            c => !walletData.some(w => w.walletTitle === c.code),
        );
    }, [walletData]);

    /* active wallets */
    const activeWalletsData = useMemo(() => {
        return ALLCRYPTOCURRENCIES.filter(
            c => !cryptocurrencies.some(x => x.code === c.code),
        );
    }, [cryptocurrencies]);

    /* warning */
    useEffect(() => {
        if (walletLoading) {
            setWalletWarning(false);
        } else {
            setWalletWarning(cryptocurrencies.length > 0);
        }
    }, [walletLoading, cryptocurrencies]);

    return (
        <WalletContext.Provider
            value={{
                walletLoading,
                walletData,
                cryptocurrencies,
                walletWarning,
                activeWalletsData,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

/* ---------------- Hook ---------------- */

export const useWallet = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
    return ctx;
};