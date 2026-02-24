import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Logo from "@/assets/Icons/home/dynopay-whiteLogo.svg";
import X from "@/assets/Icons/home/X.svg";
import Instagram from "@/assets/Icons/home/instagram.svg";
import LinkedIn from "@/assets/Icons/home/LinkeIn.svg";
import Facebook from "@/assets/Icons/home/Facebook.svg";
import { Navigation } from "./styled";
import { homeTheme } from "@/styles/homeTheme";
import useIsMobile from "@/hooks/useIsMobile";
import { theme } from "@/styles/theme";
import { useRouter } from "next/router";
import Link from "next/link";

const socials = [
  { label: "X", icon: X, link: "#" },
  { label: "Instagram", icon: Instagram, link: "#" },
  { label: "LinkedIn", icon: LinkedIn, link: "#" },
  { label: "Facebook", icon: Facebook, link: "#" },
];

const HomeFooter = () => {
  const router = useRouter();
  const isMobile = useIsMobile("md");
  const { t } = useTranslation("landing");

  const routes = [
    { labelKey: "documentation", link: "#" },
    { labelKey: "footerSandbox", link: "#" },
    { labelKey: "footerTerms", link: "/terms-conditions" },
    { labelKey: "footerPrivacy", link: "/privacy-policy" },
    { labelKey: "footerApiStatus", link: "/api-status" },
    { labelKey: "footerSupport", link: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: homeTheme.palette.text.primary,
        mt: "auto",
        pt: "64px",
        pb: isMobile ? "17px" : "64px",
        px: isMobile ? "15px" : 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1280px",
          minHeight: isMobile ? "390px" : "222px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        {/* TOP */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Image src={Logo} alt="DynoPay logo" width={134} height={45} onClick={() => router.push("/")} style={{ cursor: "pointer" }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <Typography
              sx={{
                minWidth: "316px",
                color: theme.palette.common.white,
                opacity: 0.6,
                fontSize: 14,
                maxWidth: 420,
                fontFamily: "OutfitRegular",
                textWrap: "nowrap",
              }}
            >
              {t("footerDescription1")}
              <br />
              {t("footerDescription2")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: "27px", lg: 3 },
                alignItems: "flex-end",
              }}
            >
              {routes.map((item) => (
                <Link key={item.labelKey} href={item.link}>
                  <Navigation>{t(item.labelKey)}</Navigation>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        {/* BOTTOMM */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "28px" : 0,
            borderTop: 1,
            pt: 4,
            borderColor: "rgba(255, 255, 255, 0.1)"
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              opacity: 0.6,
              fontSize: 14,
              fontFamily: "OutfitRegular",
            }}
          >
            {t("footerCopyright")}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    p: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    '&:hover': {
                      background: "rgba(255, 255, 255, 0.2)",
                    }
                  }}
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeFooter;