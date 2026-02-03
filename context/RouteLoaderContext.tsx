import { createContext, useContext, useState, ReactNode } from "react";

interface RouteLoaderContextType {
    startLoading: () => void;
    stopLoading: () => void;
    isLoading: boolean;
}

const RouteLoaderContext = createContext<RouteLoaderContextType | null>(null);

export const RouteLoaderProvider = ({ children }: { children: ReactNode }) => {
   const [loading, setLoading] = useState<boolean>(false);

    return (
        <RouteLoaderContext.Provider
            value={{ startLoading: () => setLoading(true), stopLoading: () => setLoading(false), isLoading: loading }}
        >
            {children}
        </RouteLoaderContext.Provider>
    );
};

export const useRouteLoader = () => {
    const ctx = useContext(RouteLoaderContext);
    if (!ctx) throw new Error("useRouteLoader must be inside RouteLoaderProvider");
    return ctx;
};
