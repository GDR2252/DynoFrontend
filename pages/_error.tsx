import React, { useEffect } from "react";
import NoAccess from "@/assets/Images/404.png";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const Error = ({ statusCode, setPageName }: any) => {
  const router = useRouter();
  useEffect(() => {
    setPageName();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 120px)",
        flexDirection: "column",
        "& img": {
          width: "400px",
        },
        "& h5": {
          mt: 2,
          fontWeight: 700,
        },
      }}
    >
      <Image src={NoAccess} alt="No Access" height={200} width={200} draggable={false} style={{ objectFit: "contain" }} />
      <Typography color="primary" variant="h5" fontFamily="UrbanistBold" fontSize="24px" lineHeight="32px" letterSpacing="0.01em" textTransform="none">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}{" "}
        ⛔
      </Typography>
      <Box
        sx={{
          mt: 3,
          "& button": {
            mx: 2,
          },
        }}
      >
        <Button
          variant="rounded"
          sx={{
            background: "#12131C",
            "&:hover": {
              color: "#12131C",
            },
            fontFamily: "UrbanistBold",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.01em",
            textTransform: "none",
          }}
          onClick={() => router.back()}
          disableRipple={false}
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
