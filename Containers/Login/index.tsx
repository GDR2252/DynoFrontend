import { LayoutProps, rootReducer } from "@/utils/types";
import React from "react";
import { LoginWrapper, ContentWrapper } from "./styled";
import { useSelector } from "react-redux";
import Toast from "@/Components/UI/Toast";
import Image from "next/image";
import bg from "@/assets/Images/auth/bg-auth.png";
import smallbg from "@/assets/Images/auth/bg-auth-small.png";
import { Box } from "@mui/material";

const LoginLayout = ({ children, pageName, pageDescription }: LayoutProps) => {
  const ToastState = useSelector((state: rootReducer) => state.toastReducer);

  return (
    <LoginWrapper>
      <Toast
        open={ToastState.open}
        message={ToastState.message}
        severity={ToastState.severity ? ToastState.severity : "success"}
        loading={ToastState.loading}
      />

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "70%",
            height: "100%",
          }}
        >
          <Image
            src={bg.src}
            alt="auth-bg"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "45%",
            height: "60%",
          }}
        >
          <Image
            src={smallbg.src}
            alt="auth-bg-small"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>

      <ContentWrapper>{children}</ContentWrapper>
    </LoginWrapper>
  );
};

export default LoginLayout;
