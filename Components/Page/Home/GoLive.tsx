import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import HomeCard from "@/Components/UI/HomeCard";
import { Box, Grid, Typography } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import { GoLiveCount } from "@/Components/UI/HomeCard/styled";
import CompanySelectorImage_svg from "@/assets/Images/home/company-dropdown.svg";
import AllWalletsImage_svg from "@/assets/Images/home/all-wallets.svg";
import PaymentLinkAddImage_svg from "@/assets/Images/home/payment-link-create.svg";
import CompanySelectorImage_png from "@/assets/Images/home/company-dropdown.png";
import AllWalletsImage_png from "@/assets/Images/home/all-wallets.png";
import PaymentLinkAddImage_png from "@/assets/Images/home/payment-link-create.png";
import HomeSectionTitle from "@/Components/UI/SectionTitle";
import { theme } from "@/styles/theme";
import { useDevice } from "@/hooks/useDevice";

const GoLiveSection = () => {
  const isMobile = useIsMobile("md");
  const { os, browser } = useDevice();
  const { t } = useTranslation("landing");

  const cardData = [
    {
      titleKey: "goLiveCard1Title",
      descriptionKey: "goLiveCard1Description",
      image: os === "ios" || browser === "safari" ? CompanySelectorImage_png : CompanySelectorImage_svg,
    },
    {
      titleKey: "goLiveCard2Title",
      descriptionKey: "goLiveCard2Description",
      image: os === "ios" || browser === "safari" ? AllWalletsImage_png : AllWalletsImage_svg,
    },
    {
      titleKey: "goLiveCard3Title",
      descriptionKey: "goLiveCard3Description",
      image: os === "ios" || browser === "safari" ? PaymentLinkAddImage_png : PaymentLinkAddImage_svg,
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: "96px 0",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Section Title */}
      <HomeSectionTitle
        type="small"
        badgeText={t("howItWorks")}
        title={t("goLiveTitle")}
        highlightText={t("goLiveHighlight")}
        subtitle={t("goLiveSubtitle")}
        sx={{ maxWidth: "100%" }}
      />

      {/* Cards */}
      <Box sx={{ pt: isMobile ? 5 : 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid
              key={card.titleKey}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              display="flex"
              justifyContent="center"
            >
              <HomeCard
                height={isMobile ? 645 : 612}
                width={isMobile ? 338 : 395}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    width: "100%",
                    height: "100%",
                    paddingX: isMobile ? "30px" : "33px",
                    paddingTop: "33px",
                    paddingBottom: isMobile ? "24px" : "",
                  }}
                >
                  <GoLiveCount sx={{ textAlign: "center", mb: 2 }}>0{index + 1}</GoLiveCount>

                  <Typography sx={{ mb: "12px" }} style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    lineHeight: "28px",
                    letterSpacing: 0,
                    fontFamily: "OutfitMedium",
                    color: theme.palette.text.primary,
                  }}>
                    {t(card.titleKey)}
                  </Typography>
                  <Typography sx={{ mb: 1 }} style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: 0,
                    fontFamily: "OutfitRegular",
                    color: theme.palette.text.secondary,
                  }}>
                    {t(card.descriptionKey)}
                  </Typography>

                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={t(card.titleKey)}
                      quality={100}
                      priority={index < 3}
                      style={{
                        width: isMobile ? index === 2 ? "110%" : "120%" : "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      draggable={false}
                    />
                  </Box>
                </Box>
              </HomeCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default GoLiveSection;
