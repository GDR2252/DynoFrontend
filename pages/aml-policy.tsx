import useIsMobile from "@/hooks/useIsMobile";
import { Box, Typography } from "@mui/material";
import React from "react";
import { amlPolicy } from "@/utils/constants/aml-policy";

const AMLPolicy = () => {

  const isMobile = useIsMobile("md");

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 768,
        px: isMobile ? "15px" : 0,
        mx: "auto",
        fontFamily: "UrbanistMedium",
        mb: isMobile ? "52px" : "93px",
        mt: isMobile ? "35px" : "63px",
      }}
    >

      {/* SECTION TITLE */}
      <Typography
        component="h1"
        sx={{
          fontSize: isMobile ? "45px" : "60px",
          color: "#131520",
          fontWeight: 600,
          textAlign: "center",
          fontFamily: "UrbanistMedium",
          mb: "15px",
          lineHeight: 1.1,
        }}
      >
        AML Policy
      </Typography>

      {/* SECTION CONTENT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          lineHeight: 1.5,
        }}
      >

        <Typography
          sx={{
            fontSize: "18px",
            color: "#676B7E",
            fontWeight: 400,
            fontFamily: "UrbanistMedium",
          }}
        >
          This AML Policy describes how DynoPay (“we”, “us”, “our”) works to prevent money laundering, terrorist financing, and other illicit activity when users interact with our crypto payment services (“the Service”).
        </Typography>

        {amlPolicy.map((section, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* ITEM TITLE */}
            <Typography
              sx={{
                fontSize: "18px",
                color: "#676B7E",
                fontWeight: 600,
                fontFamily: "UrbanistMedium",
              }}
            >
              {section.title}
            </Typography>

            {/* ITEM SECTION */}
            {/* ITEM DESCRIPTION */}
            {section.description && (
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#676B7E",
                  fontWeight: 400,
                  fontFamily: "UrbanistMedium",
                  whiteSpace: "pre-line",
                }}
              >
                {section.description.replace(
                  /\. /,
                  ".\n"
                )}
              </Typography>
            )}

            {/* ITEM BULLET POINTS */}
            {section.bulletPoints?.length > 0 && (
              <Box component="ul" sx={{ pl: "26px", my: "5px" }}>
                {section.bulletPoints.map((point, pointIndex) => (
                  <Box
                    component="li"
                    key={pointIndex}
                    sx={{
                      listStyle: "disc",
                      fontSize: "18px",
                      color: "#676B7E",
                      fontWeight: 400,
                      fontFamily: "UrbanistMedium",
                    }}
                  >
                    {point}
                  </Box>
                ))}
              </Box>
            )}

            {/* ITEM FOOTER */}
            {section.footer && (
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#676B7E",
                  fontWeight: 400,
                  fontFamily: "UrbanistMedium",
                }}
              >
                {section.footer}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AMLPolicy;
