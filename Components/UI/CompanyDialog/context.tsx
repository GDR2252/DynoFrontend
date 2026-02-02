import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ICompany } from "@/utils/types";
import CompanyDialog, { CompanyDialogMode } from "./index";

type CompanyDialogContextValue = {
  openAddCompany: (firstCompany?: boolean) => void;
  openEditCompany: (company: ICompany) => void;
  closeCompanyDialog: () => void;
};

const CompanyDialogContext = createContext<CompanyDialogContextValue | null>(null);

export function useCompanyDialog() {
  const ctx = useContext(CompanyDialogContext);
  if (!ctx) {
    throw new Error("useCompanyDialog must be used within CompanyDialogProvider");
  }
  return ctx;
}

export function CompanyDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<CompanyDialogMode>("add");
  const [company, setCompany] = useState<ICompany | null>(null);
  const [firstCompany, setFirstCompany] = useState(false);

  const closeCompanyDialog = useCallback(() => {
    setOpen(false);
    setCompany(null);
    setMode("add");
  }, []);

  const openAddCompany = useCallback((firstCompany?: boolean) => {
    setMode("add");
    setCompany(null);
    setFirstCompany(firstCompany ?? false);
    setOpen(true);
  }, []);

  const openEditCompany = useCallback((c: ICompany) => {
    setMode("edit");
    setCompany(c);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openAddCompany, openEditCompany, closeCompanyDialog }),
    [openAddCompany, openEditCompany, closeCompanyDialog]
  );

  return (
    <CompanyDialogContext.Provider value={value}>
      {children}
      <CompanyDialog open={open} mode={mode} company={company} firstCompany={firstCompany} onClose={closeCompanyDialog} />
    </CompanyDialogContext.Provider>
  );
}

