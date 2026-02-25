import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { SxProps, Theme } from "@mui/material";
import { useRouter } from "next/router";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyledHomeButton } from "./styled";

export type HomeButtonVariant = "primary" | "outlined";

export interface HomeButtonProps {
  variant?: HomeButtonVariant;
  label?: string;
  showIcon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  fullWidth?: boolean;
  navigateTo?: string;
  sx?: SxProps<Theme>;
}

const HomeButton = memo(function HomeButton({
  variant = "primary",
  label,
  showIcon,
  onClick,
  disabled = false,
  fullWidth = false,
  navigateTo,
  sx,
}: HomeButtonProps) {
  const router = useRouter();
  const mountedRef = useRef(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const resolvedLabel = useMemo(() => {
    if (label && label.trim().length > 0) return label;
    return variant === "primary" ? "Start Accepting Crypto" : "Learn More";
  }, [label, variant]);

  const shouldShowIcon = useMemo(() => {
    if (typeof showIcon === "boolean") return showIcon;
    return variant === "primary";
  }, [showIcon, variant]);

  const safePush = useCallback(
    async (to: string) => {
      if (!to) return;
      if (isNavigating) return;

      setIsNavigating(true);
      try {
        await router.push(to);
      } finally {
        if (mountedRef.current) setIsNavigating(false);
      }
    },
    [router, isNavigating],
  );

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      if (disabled || isNavigating) {
        e.preventDefault();
        return;
      }

      if (onClick) {
        onClick(e);
        return;
      }

      if (navigateTo) {
        await safePush(navigateTo);
        return;
      }

      if (variant !== "primary") return;

      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("token")
          : null;

      await safePush(token ? "/dashboard" : "/auth/login");
    },
    [disabled, isNavigating, onClick, navigateTo, variant, safePush],
  );

  const isDisabled = disabled || isNavigating;

  return (
    <StyledHomeButton
      intent={variant}
      onClick={handleClick}
      disabled={isDisabled}
      fullWidth={fullWidth}
      sx={sx}
      type="button"
      aria-label={resolvedLabel}
      aria-busy={isNavigating || undefined}
      aria-disabled={isDisabled || undefined}
    >
      {resolvedLabel}
      {shouldShowIcon && <ArrowForwardIcon sx={{ fontSize: 18 }} />}
    </StyledHomeButton>
  );
});

export default HomeButton;
