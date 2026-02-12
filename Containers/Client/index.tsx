import withAuth from "@/Components/Page/Common/HOC/withAuth";
import { LayoutProps } from "@/utils/types";
import { Box, useTheme, SxProps, Theme } from "@mui/material";
import React from "react";
import NewHeader from "@/Components/Layout/NewHeader";
import NewSidebar from "@/Components/Layout/NewSidebar";
import MobileNavigationBar from "@/Components/Layout/MobileNavigationBar";
import { MainPageHeader, PageHeader, PageHeaderDescription, PageHeaderTitle } from "./styled";
import { CompanyDialogProvider } from "@/Components/UI/CompanyDialog/context";
import useIsMobile from "@/hooks/useIsMobile";

const ClientLayout = ({
  children,
  pageName,
  pageDescription,
  pageWarning,
  pageAction,
  pageHeaderSx,
}: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  return (
    <CompanyDialogProvider>
      <Box
        sx={{
          height: "100dvh",
          width: "100%",
          p: { xs: "8px 16px 0px 16px", lg: "16px 23px 16px 23px", xl: "16px 40px 16px 40px" },
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          backgroundColor: theme.palette.secondary.main,
          gap: "24px",
        }}
      >
        {/* ================= HEADER ================= */}
        <Box
          sx={{
            height: isMobile ? "40px" : "56px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1840px" }}>
            <NewHeader />
          </Box>
        </Box>

        {/* ================= BODY ================= */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1840px",
              display: "flex",
              gap: "24px",
              overflow: "hidden",
            }}
          >
            {/* ================= SIDEBAR ================= */}
            <Box
              sx={{
                width: "clamp(265px, 18vw, 324px)",
                height: "100%",
                overflow: "hidden",
                display: { xs: "none", lg: "block" },
              }}
            >
              <NewSidebar />
            </Box>

            {/* ================= MAIN CONTENT ================= */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
                pb: { xs: 10, lg: 0 },
              }}
            >
              {(pageName || pageDescription) && (
                <MainPageHeader>
                  <PageHeader
                    sx={
                      pageHeaderSx
                        ? ([
                          { pt: 0, pb: { lg: 2.5, md: 1.5, xs: 1 }, mb: 0 },
                          pageHeaderSx,
                        ] as SxProps<Theme>)
                        : { pt: 0, pb: { lg: 2.5, md: 1.5, xs: 1 }, mb: 0 }
                    }
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {pageName && (
                        <PageHeaderTitle variant="h1">
                          {pageName}
                        </PageHeaderTitle>
                      )}
                      {pageDescription && (
                        <PageHeaderDescription variant="body1">
                          {pageDescription}
                        </PageHeaderDescription>
                      )}
                    </Box>

                    {pageAction && (
                      <Box
                        sx={{
                          flexShrink: 0,
                          pt: { xs: 0.5, md: 0 },
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: { xs: 1, md: 2 },
                        }}
                        className="pageAction"
                      >
                        {pageAction}
                      </Box>
                    )}
                  </PageHeader>

                  {pageWarning && (
                    <Box sx={{ mb: { xs: 1, md: 2 }, mt: { xs: 1, md: 0 } }}>
                      {pageWarning}
                    </Box>
                  )}
                </MainPageHeader>
              )}

              {children}
            </Box>
          </Box>
        </Box>

        {/* ================= MOBILE NAV ================= */}
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <MobileNavigationBar />
        </Box>
      </Box>
    </CompanyDialogProvider>
  );
};

export default withAuth(ClientLayout);
