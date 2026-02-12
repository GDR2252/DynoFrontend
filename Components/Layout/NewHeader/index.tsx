import React, { useCallback } from "react";
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
import { useWalletData } from "@/hooks/useWalletData";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { VerticalLine } from "@/Components/UI/LanguageSwitcher/styled";

const NewHeader = () => {
  const router = useRouter();
  const namespaces = ["dashboardLayout", "walletScreen"];
  const { t } = useTranslation(namespaces);
  const tWallet = useCallback(
    (key: string) => t(key, { ns: "walletScreen" }),
    [t]
  );
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
          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: "20px" }}>
            <Box sx={{ order: { lg: 2, xl: 1 } }}>
              <LanguageSwitcher />
            </Box>

            {router.pathname === "/transactions" ? (
              <Box sx={{ order: { lg: 1, xl: 2 } }}>
                <RequiredKYC>
                  <InfoIcon
                    sx={{ fontSize: 20, color: theme.palette.error.main }}
                  />
                  <RequiredKYCText sx={{ display: { lg: "none", xl: "block" } }}>{t("requiredKYC2")}</RequiredKYCText>
                  <RequiredKYCText sx={{ display: { lg: "block", xl: "none" } }}>{t("requiredKYC1")}</RequiredKYCText>
                  <VerticalLine style={{ margin: "0 14px" }} />
                  <ArrowOutwardIcon
                    sx={{ color: theme.palette.text.secondary, fontSize: 16 }}
                  />
                </RequiredKYC>
              </Box>
            ) : (
              <>
                {walletWarning && (
                  <Box sx={{ order: { lg: 1, xl: 2 } }}>
                    <Link href='/wallet'>
                      <RequiredKYC>
                        <InfoIcon
                          sx={{ fontSize: 20, color: theme.palette.error.main }}
                        />
                        <RequiredKYCText sx={{ display: { lg: "none", xl: "block" } }}>
                          {tWallet("walletSetUpWarnnigTitle")}
                        </RequiredKYCText>
                        <RequiredKYCText sx={{ display: { lg: "block", xl: "none" } }}>
                          {tWallet("walletWarnnigTitle")}
                        </RequiredKYCText>
                      </RequiredKYC>
                    </Link>
                  </Box>
                )}
              </>
            )}
          </Box>
          <UserMenu />
        </RightSection>
      </MainContainer>
    </HeaderContainer>
  );
};

export default NewHeader;
