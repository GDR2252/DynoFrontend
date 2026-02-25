// HomeHeader.tsx
import DynopayLogo from "@/assets/Images/auth/dynopay-logo.svg";
import LanguageSwitcher from "@/Components/UI/LanguageSwitcher";
import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Actions,
  ClickableLogo,
  DesktopLanguageWrapper,
  FixedHeader,
  HeaderContainer,
  HeaderDivider,
  LeftGroup,
  MenuCloseIcon,
  MenuOpenIcon,
  MobileDrawer,
  MobileLanguageWrapper,
  MobileMenuButton,
  MobileMenuDrawer,
  MobileNavContent,
  MobileNavItem,
  NavLinks,
  RightGroup,
  StyledGetStartedButton,
} from "./styled";

type HeaderItem = Readonly<{
  translationKey: "howItWorks" | "features" | "useCases" | "documentation";
  path: string;
  sectionId?: "how-it-works" | "features" | "use-cases";
}>;

const HEADER_OFFSET_PX = 100;
const SCROLL_THRESHOLD_PX = 10;

const HEADER_ITEMS: ReadonlyArray<HeaderItem> = [
  { translationKey: "howItWorks", sectionId: "how-it-works", path: "/" },
  { translationKey: "features", sectionId: "features", path: "/" },
  { translationKey: "useCases", sectionId: "use-cases", path: "/" },
  { translationKey: "documentation", path: "/" },
] as const;

const parseItemIndex = (value: string | undefined): number | null => {
  if (!value) return null;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 && n < HEADER_ITEMS.length ? n : null;
};

const HomeHeader = () => {
  const router = useRouter();
  const { t } = useTranslation("landing");
  const isMobile = useIsMobile("md");

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);

  const lastScrollYRef = useRef<number>(0);
  const isHeaderVisibleRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);

  const lockStateRef = useRef<{
    htmlOverflow: string;
    bodyOverflow: string;
    bodyPaddingRight: string;
  } | null>(null);

  useEffect(() => {
    isHeaderVisibleRef.current = isHeaderVisible;
  }, [isHeaderVisible]);

  const closeMobileMenu = useCallback((): void => {
    setMobileMenuOpen(false);
  }, []);

  const openMobileMenu = useCallback((): void => {
    setMobileMenuOpen(true);
  }, []);

  const scrollToSection = useCallback(
    (sectionId: HeaderItem["sectionId"]): void => {
      if (!sectionId) return;
      if (typeof document === "undefined" || typeof window === "undefined")
        return;

      const element = document.getElementById(sectionId);
      if (!element) return;

      const elementTop = element.getBoundingClientRect().top;
      const targetTop = elementTop + window.pageYOffset - HEADER_OFFSET_PX;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    },
    [],
  );

  const handleNavClick = useCallback(
    (item: HeaderItem): void => {
      const doClose = (): void => closeMobileMenu();

      if (item.sectionId) {
        if (router.pathname !== "/") {
          void router.push("/").then(() => {
            if (typeof window === "undefined") return;
            window.setTimeout(() => {
              scrollToSection(item.sectionId);
              doClose();
            }, 100);
          });
        } else {
          scrollToSection(item.sectionId);
          doClose();
        }
        return;
      }

      void router.push(item.path);
      doClose();
    },
    [closeMobileMenu, router, scrollToSection],
  );

  const onNavItemClick = useCallback(
    (e: React.MouseEvent<HTMLElement>): void => {
      const idx = parseItemIndex((e.currentTarget as HTMLElement).dataset.idx);
      if (idx == null) return;
      handleNavClick(HEADER_ITEMS[idx]);
    },
    [handleNavClick],
  );

  const onNavItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>): void => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      const idx = parseItemIndex((e.currentTarget as HTMLElement).dataset.idx);
      if (idx == null) return;
      handleNavClick(HEADER_ITEMS[idx]);
    },
    [handleNavClick],
  );

  const onLogoClick = useCallback((): void => {
    void router.push("/");
  }, [router]);

  const onLogoKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onLogoClick();
      }
    },
    [onLogoClick],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateVisibility = (): void => {
      rafIdRef.current = null;

      const currentScrollY = window.scrollY;
      let nextVisible = isHeaderVisibleRef.current;

      if (currentScrollY < SCROLL_THRESHOLD_PX) {
        nextVisible = true;
      } else {
        if (currentScrollY > lastScrollYRef.current) nextVisible = false;
        else if (currentScrollY < lastScrollYRef.current) nextVisible = true;
      }

      lastScrollYRef.current = currentScrollY;

      if (nextVisible !== isHeaderVisibleRef.current) {
        isHeaderVisibleRef.current = nextVisible;
        setIsHeaderVisible(nextVisible);
      }
    };

    const onScroll = (): void => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const html = document.documentElement;
    const body = document.body;

    if (mobileMenuOpen) {
      if (!lockStateRef.current) {
        lockStateRef.current = {
          htmlOverflow: html.style.overflow,
          bodyOverflow: body.style.overflow,
          bodyPaddingRight: body.style.paddingRight,
        };
      }

      const scrollBarWidth = window.innerWidth - html.clientWidth;

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
      return;
    }

    if (lockStateRef.current) {
      html.style.overflow = lockStateRef.current.htmlOverflow;
      body.style.overflow = lockStateRef.current.bodyOverflow;
      body.style.paddingRight = lockStateRef.current.bodyPaddingRight;
      lockStateRef.current = null;
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (typeof document === "undefined") return;
      const html = document.documentElement;
      const body = document.body;

      if (lockStateRef.current) {
        html.style.overflow = lockStateRef.current.htmlOverflow;
        body.style.overflow = lockStateRef.current.bodyOverflow;
        body.style.paddingRight = lockStateRef.current.bodyPaddingRight;
        lockStateRef.current = null;
      }
    };
  }, []);

  return (
    <FixedHeader $visible={isHeaderVisible}>
      <HeaderContainer aria-label="Primary">
        <LeftGroup>
          <ClickableLogo
            type="button"
            aria-label="Go to home"
            onClick={onLogoClick}
            onKeyDown={onLogoKeyDown}
          >
            <Image
              src={DynopayLogo}
              alt="Dynopay"
              width={134}
              height={45}
              draggable={false}
              className="logo"
              priority
            />
          </ClickableLogo>

          <NavLinks className="desktop-nav" aria-label="Primary navigation">
            {HEADER_ITEMS.map((item, idx) => (
              <Button
                disableRipple
                key={item.translationKey}
                data-idx={idx}
                onClick={onNavItemClick}
              >
                {t(item.translationKey)}
              </Button>
            ))}
          </NavLinks>
        </LeftGroup>

        <RightGroup>
          <Actions>
            {!isMobile && (
              <DesktopLanguageWrapper>
                <LanguageSwitcher />
              </DesktopLanguageWrapper>
            )}

            <Button
              disableRipple
              className="signin"
              onClick={() => void router.push("/auth/login")}
            >
              {t("signIn")}
            </Button>

            <StyledGetStartedButton
              variant="primary"
              label={t("getStarted")}
              onClick={() => void router.push("/auth/register")}
              showIcon={false}
            />
          </Actions>

          {isMobile && !mobileMenuOpen && (
            <MobileMenuButton
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={false}
              onClick={openMobileMenu}
            >
              <MenuOpenIcon />
            </MobileMenuButton>
          )}

          {isMobile && mobileMenuOpen && (
            <MobileMenuButton
              aria-label="Close menu"
              aria-haspopup="dialog"
              aria-expanded
              onClick={closeMobileMenu}
            >
              <MenuCloseIcon />
            </MobileMenuButton>
          )}
        </RightGroup>
      </HeaderContainer>

      {isMobile && (
        <MobileMenuDrawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
          ModalProps={{
            keepMounted: true,
            disableScrollLock: false,
          }}
        >
          <MobileDrawer>
            <MobileNavContent
              onClick={(e) => {
                if (e.target === e.currentTarget) closeMobileMenu();
              }}
              aria-label="Mobile navigation"
            >
              {HEADER_ITEMS.map((item, idx) => (
                <MobileNavItem
                  key={item.translationKey}
                  type="button"
                  data-idx={idx}
                  onClick={onNavItemClick}
                  onKeyDown={onNavItemKeyDown}
                  aria-label={t(item.translationKey)}
                >
                  {t(item.translationKey)}
                </MobileNavItem>
              ))}

              <MobileLanguageWrapper
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <LanguageSwitcher
                  mobileBreakpoint="xs"
                  onLanguageChange={closeMobileMenu}
                />
              </MobileLanguageWrapper>
            </MobileNavContent>
          </MobileDrawer>
        </MobileMenuDrawer>
      )}

      <HeaderDivider />
    </FixedHeader>
  );
};

export default HomeHeader;
