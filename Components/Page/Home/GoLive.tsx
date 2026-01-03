import React from "react";
import Image from "next/image";
import HomeCard from "@/Components/UI/HomeCard";
import { Box, Grid, Typography } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import {
  GoLiveCount,
  GoLiveDescription,
  GoLiveTitle,
} from "@/Components/UI/HomeCard/styled";
import { homeTheme } from "@/styles/homeTheme";
import { ImageCenter } from "@/Containers/Login/styled";
import CompanySelectorImage from "@/assets/Images/home/Company Dropdown.png";
import AllWalletsImage from "@/assets/Images/home/all-wallets.png";
import PaymentLinkAddImage from "@/assets/Images/home/payment-link-create.png";
import HomeSectionTitle from "@/Components/UI/SectionTitle";

const GoLiveSection = () => {
  const isMobile = useIsMobile("md");
  return (
    <section
      style={{
        padding: "96px 0px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Go Live Section Title */}
      <HomeSectionTitle
        type="small"
        badgeText="How It Works"
        title="Go live in three simple steps"
        highlightText="three simple steps"
        subtitle="Getting started with DynoPay takes minutes, not days. Here's how simple it is."
        sx={{ maxWidth: "100%" }}
      />
      {/* Go Live Section Cards */}
      <Box
        sx={{
          paddingTop: isMobile ? 5 : 8,
          paddingX: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <HomeCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  padding: isMobile ? 2 : "33px 32px 18px",
                  overflow: "hidden",
                }}
              >
                <GoLiveCount sx={{ textAlign: "center" }}>01</GoLiveCount>

                <GoLiveTitle sx={{ marginTop: 2 }}>
                  Create a Company Workspace
                </GoLiveTitle>
                <GoLiveDescription sx={{ marginTop: 1.5 }}>
                  Set up your business profile and configure your payment
                  preferences in minutes.
                </GoLiveDescription>

                <ImageCenter
                  sx={{
                    cursor: "default",
                    marginTop: isMobile ? "29px" : "25px",
                    position: "relative",
                    height: "373px",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={CompanySelectorImage}
                    alt="company selector"
                    fill={true}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    draggable={false}
                  />
                </ImageCenter>
              </Box>
            </HomeCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <HomeCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  padding: isMobile ? 2 : "33px 32px 30px",
                }}
              >
                <GoLiveCount sx={{ textAlign: "center" }}>02</GoLiveCount>

                <GoLiveTitle sx={{ marginTop: 2 }}>
                  Add Your Crypto Wallets
                </GoLiveTitle>
                <GoLiveDescription sx={{ marginTop: 1.5 }}>
                  Connect BTC, ETH, LTC, and more. All your assets managed in
                  one secure place.
                </GoLiveDescription>

                <ImageCenter
                  sx={{
                    cursor: "default",
                    marginTop: isMobile ? "29px" : "25px",
                    position: "relative",
                    height: "373px",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={AllWalletsImage}
                    alt="all wallets"
                    fill={true}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    draggable={false}
                  />
                </ImageCenter>
              </Box>
            </HomeCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <HomeCard>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    padding: isMobile ? 2 : "33px 32px 0px",
                  }}
                >
                  <GoLiveCount sx={{ textAlign: "center" }}>03</GoLiveCount>

                  <GoLiveTitle sx={{ marginTop: 2 }}>
                    Generate Payment Links or Integrate API
                  </GoLiveTitle>
                  <GoLiveDescription sx={{ marginTop: 1.5 }}>
                    Create instant payment links for non-dev teams or use our
                    developer-friendly API.
                  </GoLiveDescription>

                  <ImageCenter
                    sx={{
                      cursor: "default",
                      marginTop: isMobile ? "29px" : "25px",
                      position: "relative",
                      height: "373px",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={PaymentLinkAddImage}
                      alt="payment link add"
                      fill={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      draggable={false}
                    />
                  </ImageCenter>
                </Box>
              </HomeCard>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default GoLiveSection;
