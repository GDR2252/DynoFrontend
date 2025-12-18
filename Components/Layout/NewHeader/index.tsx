import React from "react";
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

const NewHeader = () => {
  const router = useRouter();
  const { t } = useTranslation("dashboardLayout");
  const isMobile = useIsMobile("md");
  return (
    <HeaderContainer>
      <Grid container spacing={{ xs: 0.5, md: 3 }} alignItems="center">
        {/* Logo Section */}
        <Grid item xs={1} md={3} lg={2.5}>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <LogoContainer>
              <Image
                onClick={() => router.push("/")}
                src={Logo}
                alt="logo"
                width={108}
                height={37}
                draggable={false}
                className="logo"
              />
            </LogoContainer>
          </Box>

          {/* Mobile Logo */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
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
        </Grid>

        {/* Main Header Area */}
        <Grid item xs={11} md={9} lg={9.5}>
          <MainContainer sx={{ borderRadius: isMobile ? "10px" : "14px" }}>
            <CompanySelector />

            <RightSection>
              {/* Hide language & KYC on mobile */}
              <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
                <LanguageSwitcher />

                <RequiredKYC>
                  <InfoIcon
                    sx={{ fontSize: 20, color: theme.palette.error.main }}
                  />
                  <RequiredKYCText>{t("requiredKYC")}</RequiredKYCText>
                  <VerticalLine />
                  <ArrowOutwardIcon
                    sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                  />
                </RequiredKYC>
              </Box>

              <UserMenu />
            </RightSection>
          </MainContainer>
        </Grid>
      </Grid>
    </HeaderContainer>
  );
};

export default NewHeader;
