"use client";

import { SxProps, Theme } from "@mui/material";
import {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CheckIconStyled,
  DropdownContainer,
  DropdownHeader,
  DropdownListItem,
  DropdownListWrapper,
  HeaderDivider,
  HeaderIcon,
  HeaderRight,
  HeaderSelectedLeft,
  LangFlag,
  LangText,
  ListItemLeft,
  ListItemRight,
  TriggerBox,
  TriggerDivider,
  TriggerExpandIcon,
  TriggerLeft,
  TriggerRight,
  WrapperBox,
} from "./styled";

import ExpandLessIcon from "@/assets/Icons/ExpendLess-Arrow.svg";
import ExpandMoreIcon from "@/assets/Icons/ExpendMore-Arrow.svg";
import CheckIcon from "@/assets/Icons/true-icon.svg";
import portugalFlag from "@/assets/Images/Icons/flags/portugal-flag.png";
import unitedStatesFlag from "@/assets/Images/Icons/flags/united-states-flag.png";

import useIsMobile from "@/hooks/useIsMobile";
import i18n from "i18next";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

type Language = Readonly<{
  code: "pt" | "en";
  label: string;
  flag: { src: string };
}>;

const languages = [
  { code: "pt", label: "Português", flag: portugalFlag },
  { code: "en", label: "English", flag: unitedStatesFlag },
] as const satisfies readonly Language[];

type Props = Readonly<{
  sx?: SxProps<Theme>;
  mobileBreakpoint?: Breakpoint;
  onLanguageChange?: () => void;
}>;

export default function LanguageSwitcher({
  sx,
  mobileBreakpoint,
  onLanguageChange,
}: Props) {
  const isMobile = useIsMobile(mobileBreakpoint || "md");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const current = i18n.language || "en";

  const selected = useMemo<Language>(() => {
    const found = languages.find(
      (l) => l.code === (current as Language["code"]),
    );
    return found ?? languages[1];
  }, [current]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const changeLang = useCallback(
    (lng: Language["code"]) => {
      i18n.changeLanguage(lng);
      try {
        localStorage.setItem("lang", lng);
      } catch {
        // ignore
      }
      onLanguageChange?.();
      close();
    },
    [close, onLanguageChange],
  );

  const onTriggerClick = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault();
      toggle();
    },
    [toggle],
  );

  const onKeyActivate = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      } else if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    },
    [close, toggle],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node | null;
      const root = wrapperRef.current;
      if (!root || !target) return;
      if (!root.contains(target)) close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close, isOpen]);

  return (
    <WrapperBox ref={wrapperRef}>
      <TriggerBox
        onClick={onTriggerClick}
        onKeyDown={onKeyActivate}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        $isMobile={isMobile}
        sx={sx}
      >
        <TriggerLeft>
          <LangFlag
            src={selected.flag.src}
            alt="flag"
            $size={isMobile ? 14 : 20}
          />
          <LangText $fontSize={isMobile ? 10.5 : 15}>
            {selected.code.toUpperCase()}
          </LangText>
        </TriggerLeft>

        <TriggerRight $isMobile={isMobile}>
          <TriggerDivider $height={isMobile ? 14 : 20} />
          {isOpen ? (
            <TriggerExpandIcon
              src={ExpandLessIcon.src}
              alt="expand"
              width={isMobile ? 7 : 11}
              height={isMobile ? 4 : 6}
            />
          ) : (
            <TriggerExpandIcon
              src={ExpandMoreIcon.src}
              alt="expand"
              width={isMobile ? 7 : 11}
              height={isMobile ? 4 : 6}
            />
          )}
        </TriggerRight>
      </TriggerBox>

      {isOpen && (
        <DropdownContainer $isMobile={isMobile}>
          <DropdownHeader
            onClick={close}
            onKeyDown={onKeyActivate}
            role="button"
            tabIndex={0}
            aria-label="Close language menu"
            $isMobile={isMobile}
          >
            <HeaderSelectedLeft>
              <LangFlag src={selected.flag.src} alt="flag" $size={16} />
              <LangText>{selected.code.toUpperCase()}</LangText>
            </HeaderSelectedLeft>

            <HeaderRight>
              <HeaderDivider $height={isMobile ? 14 : 20} />
              <HeaderIcon
                src={ExpandLessIcon.src}
                alt="expand"
                width={isMobile ? 7 : 11}
                height={isMobile ? 4 : 6}
              />
            </HeaderRight>
          </DropdownHeader>

          <DropdownListWrapper role="listbox" aria-label="Language options">
            {languages.map((lng) => (
              <DropdownListItem
                key={lng.code}
                onClick={() => changeLang(lng.code)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    changeLang(lng.code);
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    close();
                  }
                }}
                role="option"
                tabIndex={0}
                aria-selected={lng.code === current}
                $active={lng.code === current}
              >
                <ListItemLeft>
                  <LangFlag src={lng.flag.src} alt="flag" $size={16} />
                  <LangText>
                    {lng.code.toUpperCase()} - {lng.label}
                  </LangText>
                </ListItemLeft>

                <ListItemRight>
                  {lng.code === current && (
                    <CheckIconStyled
                      src={CheckIcon.src}
                      alt="check"
                      $w={11}
                      $h={8}
                    />
                  )}
                </ListItemRight>
              </DropdownListItem>
            ))}
          </DropdownListWrapper>
        </DropdownContainer>
      )}
    </WrapperBox>
  );
}
