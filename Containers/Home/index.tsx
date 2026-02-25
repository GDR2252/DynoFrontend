import { Box } from "@mui/material";
import { ReactNode } from "react";

import HomeFooter from "@/Components/Layout/HomeFooter";
import HomeHeader from "@/Components/Layout/HomeHeader";
import ScrollToTopButton from "@/Components/Layout/ScrollToTopButton";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <HomeHeader />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>

      <HomeFooter />
      <ScrollToTopButton />
    </Box>
  );
}
