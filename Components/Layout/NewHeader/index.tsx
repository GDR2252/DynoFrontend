import React, { useCallback } from "react";
import { Box, Grid } from "@mui/material";
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
import { VerticalLine } from "@/Components/UI/LanguageSwitcher/styled";
import InfoIcon from "@mui/icons-material/Info";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { theme } from "@/styles/theme";
import { useTranslation } from "react-i18next";
import useIsMobile from "@/hooks/useIsMobile";
import { useWalletData } from "@/hooks/useWalletData";
import Link from "next/link";

const NewHeader = () => {
  const router = useRouter();
  const namespaces = ["dashboardLayout", "walletScreen"];
  const { t } = useTranslation(namespaces);
  const tDashboard = useCallback(
    (key: string) => t(key, { ns: "dashboardLayout" }),
    [t]
  );
  const tWallet = useCallback(
    (key: string) => t(key, { ns: "walletScreen" }),
    [t]
  );
  const isMobile = useIsMobile("md");
  const { walletWarning } = useWalletData();
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
          <Box sx={{display: { xs: "none", lg: "flex" }, gap: "20px"}}>
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
