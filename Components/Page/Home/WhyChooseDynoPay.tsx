import React from "react";
import Image from "next/image";
import HomeCard from "@/Components/UI/HomeCard";
import { Box, Grid, Typography } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import {
  WhyChooseUsCard,
  WhyChooseDynoPayIcon,
  WhyChooseDynoPayTitle,
  WhyChooseDynoPayDescription,
} from "@/Components/UI/HomeCard/styled";
import HomeSectionTitle from "@/Components/UI/SectionTitle";
import LowerFeesIcon from "@/assets/Icons/home/lower-arrow-icon.svg";
import FullControlOfFundsIcon from "@/assets/Icons/home/shield-icon.svg";
import FastIntegrationIcon from "@/assets/Icons/home/light-bolt-icon.svg";
import GlobalReachIcon from "@/assets/Icons/home/global-icon.svg";

const WhyChooseDynopaySection = () => {
  const isMobile = useIsMobile("md");
  return (
    <section
      style={{
        padding: "96px 0px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Why Choose DynoPay Section Title */}
      <HomeSectionTitle
        type="small"
        badgeText="Why DynoPay"
        title="Why businesses choose us"
        highlightText="choose us"
        subtitle="Built for modern businesses that want to accept crypto without the complexity."
        sx={{ maxWidth: "100%" }}
      />
      {/* Why Choose DynoPay Section Cards */}
      <Box
        sx={{
          paddingTop: isMobile ? 5 : 8,
          paddingX: 2,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WhyChooseUsCard>
                <WhyChooseDynoPayIcon>
                  <Image
                    src={LowerFeesIcon}
                    alt="lower fees icon"
                    width={28}
                    height={28}
                  />
                </WhyChooseDynoPayIcon>

                <WhyChooseDynoPayTitle sx={{ marginTop: 2 }}>
                  Lower Fees
                </WhyChooseDynoPayTitle>
                <WhyChooseDynoPayDescription sx={{ marginTop: 1 }}>
                  Minimal blockchain costs, nothing hidden. Save more on every
                  transaction.
                </WhyChooseDynoPayDescription>
              </WhyChooseUsCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WhyChooseUsCard>
                <WhyChooseDynoPayIcon>
                  <Image
                    src={FullControlOfFundsIcon}
                    alt="full control of funds icon"
                    width={28}
                    height={28}
                  />
                </WhyChooseDynoPayIcon>

                <WhyChooseDynoPayTitle sx={{ marginTop: 2 }}>
                  Full Control of Funds
                </WhyChooseDynoPayTitle>
                <WhyChooseDynoPayDescription sx={{ marginTop: 1 }}>
                  Crypto goes directly into your own wallets. Non-custodial by
                  design.
                </WhyChooseDynoPayDescription>
              </WhyChooseUsCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WhyChooseUsCard>
                <WhyChooseDynoPayIcon>
                  <Image
                    src={FastIntegrationIcon}
                    alt="fast integration icon"
                    width={28}
                    height={28}
                  />
                </WhyChooseDynoPayIcon>

                <WhyChooseDynoPayTitle sx={{ marginTop: 2 }}>
                  Fast Integration
                </WhyChooseDynoPayTitle>
                <WhyChooseDynoPayDescription sx={{ marginTop: 1 }}>
                  Payment links for non-dev teams, powerful API for developers.
                </WhyChooseDynoPayDescription>
              </WhyChooseUsCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WhyChooseUsCard>
                <WhyChooseDynoPayIcon>
                  <Image
                    src={GlobalReachIcon}
                    alt="global reach icon"
                    width={28}
                    height={28}
                  />
                </WhyChooseDynoPayIcon>

                <WhyChooseDynoPayTitle sx={{ marginTop: 2 }}>
                  Global Reach
                </WhyChooseDynoPayTitle>
                <WhyChooseDynoPayDescription sx={{ marginTop: 1 }}>
                  Let customers pay from anywhere in the world, instantly.
                </WhyChooseDynoPayDescription>
              </WhyChooseUsCard>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default WhyChooseDynopaySection;
