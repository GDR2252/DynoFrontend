'use client'

import { CompanyAction } from '@/Redux/Actions'
import { COMPANY_FETCH } from '@/Redux/Actions/CompanyAction'
import { ICompany, rootReducer } from '@/utils/types'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface CompanyContextType {
    companies: ICompany[]
    setCompanies: (companies: ICompany[]) => void
    companyLoading: boolean
    activeCompanyId: number | null
    setActiveCompanyId: (activeCompanyId: number | null) => void
}


const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

/* ------------------------------ Provider ------------------------------ */

export function CompanyProvider({ children }: { children: ReactNode }) {
    const dispatch = useDispatch();
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [companyLoading, setCompanyLoading] = useState<boolean>(false);
    const [activeCompanyId, setActiveCompanyId] = useState<number | null>(null);

    const companyState = useSelector((state: rootReducer) => state.companyReducer);

    useEffect(() => {
        dispatch(CompanyAction(COMPANY_FETCH));
    }, [dispatch]);

    useEffect(() => {
        if (companyState?.initialized) {
            setCompanyLoading(false);
            setCompanies((companyState?.companyList) || []);
        } else {
            setCompanyLoading(true);
        }
    }, [companyState?.initialized, companyState?.companyList, companyState?.loading])

    useEffect(() => {
        if (activeCompanyId == null && companies.length > 0)
            setActiveCompanyId(companies[0].company_id);
    }, [activeCompanyId, companies]);

    return (
        <CompanyContext.Provider
            value={{
                companies,
                setCompanies,
                companyLoading,
                activeCompanyId,
                setActiveCompanyId,
            }}
        >
            {children}
        </CompanyContext.Provider>
    )
}

/* ------------------------------ Hook ------------------------------ */

export function useCompany() {
    const context = useContext(CompanyContext)
    if (!context) {
        throw new Error('useCompany must be used inside CompanyProvider')
    }
    return context
}