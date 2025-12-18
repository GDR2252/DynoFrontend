import withAuth from "@/Components/Page/Common/HOC/withAuth";
import { LayoutProps, rootReducer } from "@/utils/types";
import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import useTokenData from "@/hooks/useTokenData";
import Toast from "@/Components/UI/Toast";
import { useSelector } from "react-redux";
import NewHeader from "@/Components/Layout/NewHeader";
import NewSidebar from "@/Components/Layout/NewSidebar";
import MobileNavigationBar from "@/Components/Layout/MobileNavigationBar";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "./styled";
import { CompanyDialogProvider } from "@/Components/UI/CompanyDialog/context";

const ClientLayout = ({
  children,
  pageName,
  pageDescription,
  component,
  pageAction,
}: LayoutProps) => {
  const theme = useTheme();
  const tokenData = useTokenData();
  const ToastState = useSelector((state: rootReducer) => state.toastReducer);
  return (
    <CompanyDialogProvider>
      <Box
        sx={{
          height: "100dvh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: theme.palette.secondary.main,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toast
          open={ToastState.open}
          message={ToastState.message}
          severity={ToastState.severity || "success"}
          loading={ToastState.loading}
        />

        <Box sx={{ px: { xs: 2, md: 3 }, pt: 3 }}>
          <NewHeader />
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "hidden", // important
            px: { xs: 2, lg: 3 },
            pb: { xs: 10, lg: 3 }, // Add bottom padding on mobile for bottom nav
            mt: 3,
          }}
        >
          <Grid container spacing={3} sx={{ height: "100%" }}>
            {/* Desktop Sidebar */}
            <Grid
              item
              xs={0}
              md={3}
              lg={2.5}
              sx={{
                height: "100%",
                overflow: "hidden",
                display: { xs: "none", lg: "block" },
              }}
            >
              <NewSidebar />
            </Grid>

            {/* Main Content */}
            <Grid
              item
              xs={12}
              md={12}
              lg={9.5}
              sx={{
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {(pageName || pageDescription) && (
                <PageHeader sx={{ pt: 0, pb: 2.5, mb: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      gap: 2,
                    }}
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
                        }}
                      >
                        {pageAction}
                      </Box>
                    )}
                  </Box>
                </PageHeader>
              )}
              {children}
            </Grid>
          </Grid>
        </Box>

        {/* Mobile Bottom Navigation */}
        <Box
          sx={{
            display: { xs: "block", lg: "none" },
          }}
        >
          <MobileNavigationBar />
        </Box>
      </Box>
    </CompanyDialogProvider>
  );
};

export default withAuth(ClientLayout);
