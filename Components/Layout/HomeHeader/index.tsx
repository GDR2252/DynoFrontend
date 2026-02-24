import { useState, useEffect, useRef } from "react";
import { Box, Button, Divider, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import DynopayLogo from "@/assets/Images/auth/dynopay-logo.svg";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  HeaderContainer,
  NavLinks,
  Actions,
  MobileMenuButton,
  MobileDrawer,
  MobileNavItem,
} from "./styled";
import { homeTheme } from "@/styles/homeTheme";
import useIsMobile from "@/hooks/useIsMobile";
import HomeButton from "../HomeButton";
import { theme } from "@/styles/theme";
import { MenuRounded } from "@mui/icons-material";
import LanguageSwitcher from "@/Components/UI/LanguageSwitcher";

const HomeHeader = () => {
  const router = useRouter();
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile("md");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10;

  const HeaderItems = [
    { translationKey: "howItWorks", sectionId: "how-it-works", path: "/" },
    { translationKey: "features", sectionId: "features", path: "/" },
    { translationKey: "useCases", sectionId: "use-cases", path: "/" },
    { translationKey: "documentation", path: "/" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (item: typeof HeaderItems[0]) => {
    if (item.sectionId) {
      if (router.pathname !== "/") {
        router.push("/").then(() => {
          setTimeout(() => {
            scrollToSection(item.sectionId!);
          }, 100);
        });
      } else {
        scrollToSection(item.sectionId);
      }
    } else {
      router.push(item.path);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header at the top of the page
      if (currentScrollY < scrollThreshold) {
        setIsHeaderVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setIsHeaderVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsHeaderVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1400,
        backgroundColor: "white",
        transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
        width: "100%",
      }}
    >
      <HeaderContainer>
        <Box sx={{ display: "flex", alignItems: "center", gap: "102px" }}>

          {/* Logo */}
          <Image
            src={DynopayLogo}
            alt="Dynopay"
            width={134}
            height={45}
            draggable={false}
            className="logo"
            style={{ width: "134px", height: "45px" }}
            onClick={() => router.push("/")}
          />

          {/* Center Nav - Desktop Only */}
          <NavLinks className="desktop-nav">
            {HeaderItems.map((item) => (
              <Button disableRipple key={item.translationKey} onClick={() => handleNavClick(item)}>
                {t(item.translationKey)}
              </Button>
            ))}
          </NavLinks>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Right Actions */}
          <Actions>
            {!isMobile && (
              <Box sx={{ marginRight: "8px" }}>
                <LanguageSwitcher
                  sx={{
                    maxWidth: isMobile ? "78px" : "111px",
                    padding: isMobile ? "7px 10px" : "10px 14px",
                  }}
                />
              </Box>
            )}
            <Button disableRipple className="signin" onClick={() => router.push("/auth/login")}>
              {t("signIn")}
            </Button>

            <HomeButton
              variant="primary"
              label={t("getStarted")}
              onClick={() => router.push("/auth/register")}
              showIcon={false}
              sx={{
                borderRadius: "8px !important",
                padding: "8px 12px !important",
                minWidth: "98px !important",
              }}
            />
          </Actions>
          {/* Mobile Menu Button */}
          {isMobile && !mobileMenuOpen && (
            <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
              <MenuRounded sx={{ color: theme.palette.text.primary, fontSize: 24 }} />
            </MobileMenuButton>
          )}
          {isMobile && mobileMenuOpen && (
            <MobileMenuButton onClick={() => setMobileMenuOpen(false)}>
              <CloseRoundedIcon sx={{ color: theme.palette.text.primary, fontSize: 24 }} />
            </MobileMenuButton>
          )}
        </Box>
      </HeaderContainer>

      {/* Mobile Drawer - positioned below fixed header */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          ModalProps={{
            keepMounted: true,
            disableScrollLock: false,
          }}
          sx={{
            zIndex: 1200,
            "& .MuiDrawer-paper": {
              top: "64px !important",
              height: "calc(100vh - 64px) !important",
              width: "100%",
              maxWidth: "320px",
              backgroundColor: "transparent !important",
              boxShadow: "none !important",
              border: "none !important",
            },
            "& .MuiBackdrop-root": {
              backgroundColor: "#FFFFFFCC",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            },
          }}
        >
          <MobileDrawer>
            {/* Mobile Nav Items */}
            <Box
              onClick={(e) => {
                // Only close if user clicked the empty area of this container
                if (e.target === e.currentTarget) setMobileMenuOpen(false);
              }}
              sx={{
                marginTop: "51px",
                padding: "0 16px",
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "36.29px",
                alignItems: "flex-end",
              }}
            >
              {HeaderItems.map((item) => (
                <MobileNavItem
                  key={item.translationKey}
                  onClick={() => handleNavClick(item)}
                >
                  {t(item.translationKey)}
                </MobileNavItem>
              ))}

              <Box onClick={(e) => e.stopPropagation()}>
                <LanguageSwitcher
                  sx={{
                    maxWidth: "111px",
                    height: "40px",
                  }}
                  mobileBreakpoint='xs'
                  onLanguageChange={() => setMobileMenuOpen(false)}
                />
              </Box>
            </Box>
          </MobileDrawer>
        </Drawer>
      )}

      <Divider sx={{ borderColor: homeTheme.palette.border.main }} />
    </div>
  );
};

export default HomeHeader;
