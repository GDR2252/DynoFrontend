import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  HeaderContainer,
  LogoContainer,
  MainContainer,
  RequiredKYC,
  RequiredKYCText,
  RightSection,
} from "./styled";
import Logo from "@/assets/Images/auth/dynopay-logo.png";
import MobileLogo from "@/assets/Images/auth/dynopay-mobile-logo.png";
import Image from "next/image";
import LanguageSwitcher from "@/Components/UI/LanguageSwitcher";
import CompanySelector from "@/Components/UI/CompanySelector";
import UserMenu from "@/Components/UI/UserMenu";
import { useRouter } from "next/router";
import InfoIcon from "@mui/icons-material/Info";
import { theme } from "@/styles/theme";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "@/utils/types";
import { DASHBOARD_FETCH, DashboardAction } from "@/Redux/Actions/DashboardAction";
import { useCompany } from "@/context/CompanyContext";

const NewHeader = () => {
  const router = useRouter();
  const namespaces = ["dashboardLayout", "walletScreen"];
  const { t } = useTranslation(namespaces);
  const tWallet = useCallback(
    (key: string) => t(key, { ns: "walletScreen" }),
    [t]
  );
  const dashboardState = useSelector((state: rootReducer) => state.dashboardReducer);
  const [walletWarning, setWalletWarning] = useState(false);
  const dispatch = useDispatch();

  const { activeCompanyId } = useCompany();

  useEffect(() => {
    if (activeCompanyId !== null) {
      dispatch(DashboardAction(DASHBOARD_FETCH, { id: activeCompanyId }));
    }
  }, [activeCompanyId]);

  useEffect(() => {
    if (dashboardState?.initialized) {
      setWalletWarning(dashboardState?.dashboardData?.active_wallets?.count === 0);
    }
  }, [dashboardState?.dashboardData?.active_wallets?.count, dashboardState?.initialized]);

  return (
    <HeaderContainer>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LogoContainer>
          <Image
            onClick={() => router.push("/")}
            src={Logo}
            alt="logo"
            width={114}
            height={39}
            draggable={false}
            className="logo"
          />
        </LogoContainer>

        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            justifyContent: "center",
          }}
        >
          <Image
            onClick={() => router.push("/")}
            src={MobileLogo}
            alt="logo"
            width={22}
            height={24}
            draggable={false}
          />
        </Box>
      </Box>

      <MainContainer>
        <CompanySelector />

        <RightSection>
          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: "20px" }}>
            <LanguageSwitcher />

            {/* <RequiredKYC>
            <InfoIcon
              sx={{ fontSize: 20, color: theme.palette.error.main }}
            />
            <RequiredKYCText>{tDashboard("requiredKYC")}</RequiredKYCText>
            <VerticalLine style={{ margin: "0 14px" }} />
            <ArrowOutwardIcon
              sx={{ color: theme.palette.text.secondary, fontSize: 16 }}
            />
          </RequiredKYC> */}

            {walletWarning && (
              <Link href='/wallet'>
                <RequiredKYC>
                  <InfoIcon
                    sx={{ fontSize: 20, color: theme.palette.error.main }}
                  />
                  <RequiredKYCText>{tWallet("walletSetUpWarnnigTitle")}</RequiredKYCText>
                </RequiredKYC>
              </Link>
            )}
          </Box>
          <UserMenu />
        </RightSection>
      </MainContainer>
    </HeaderContainer>
  );
};

export default NewHeader;
