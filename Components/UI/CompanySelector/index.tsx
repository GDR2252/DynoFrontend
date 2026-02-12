import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme, Box, Divider, Typography } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EditIcon from "@/assets/Icons/edit-icon.svg";
import {
  SelectorTrigger,
  TriggerText,
  CompanyItem,
  ItemLeft,
  ItemRight,
} from "./styled";

import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { VerticalLine } from "../LanguageSwitcher/styled";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import CustomButton from "../Buttons";
import { useSelector } from "react-redux";
import { ICompany, rootReducer } from "@/utils/types";
import { useCompanyDialog } from "@/Components/UI/CompanyDialog/context";
import useIsMobile from "@/hooks/useIsMobile";

export default function CompanySelector() {
  const { t } = useTranslation("dashboardLayout");
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { openAddCompany, openEditCompany } = useCompanyDialog();
  const companyState = useSelector(
    (state: rootReducer) => state.companyReducer
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  // const companies = useMemo(
  //   () => companyState.companyList ?? [],
  //   [companyState.companyList]
  // );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const companies: ICompany[] = [
    {
      address_line_1: "",
      address_line_2: "",
      city: "",
      company_id: 9,
      company_name: "Cortez and Tate LLC",
      country: "",
      email: "dharmikgodhani1705@gmail.com",
      mobile: "+911100221100",
      photo: "https://api.dynopay.com/images/media_ks1tp17puh.png",
      state: "",
      user_id: 16,
      VAT_number: "",
      website: "https://www.tigepa.tv",
      zip_code: "",
    },
    {
      address_line_1: "",
      address_line_2: "",
      city: "",
      company_id: 12,
      company_name: "Weiss Steele Associates",
      country: "",
      email: "bobo@mailinator.com",
      mobile: "+1122112255",
      photo: "",
      state: "",
      user_id: 16,
      VAT_number: "",
      website: "https://www.gazogycag.info",
      zip_code: "",
    },
    {
      address_line_1: "",
      address_line_2: "",
      city: "",
      company_id: 10,
      company_name: "Petty Duncan LLC00",
      country: "",
      email: "xiveb@mailinator.com",
      mobile: "+9145454545454",
      photo: "https://api.dynopay.com/images/media_bzjlaf1nup.png",
      state: "",
      user_id: 16,
      VAT_number: "",
      website: "https://www.qara.me.uk",
      zip_code: "",
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active == null && companies.length > 0)
      setActive(companies[0].company_id);
  }, [active, companies]);

  const selected = companies.find((c) => c.company_id === active);

  const handleOpen = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (anchorEl) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        position: "relative",
        width: isMobile ? "154px" : "clamp(265px, 18vw, 324px)",
        mt: Boolean(anchorEl) && isMobile ? "-16px !important" : "0px",
        ml: Boolean(anchorEl) && isMobile ? "-6px !important" : "0px"
      }}
    >
      {/* Trigger */}
      <SelectorTrigger onClick={handleOpen}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <BusinessCenterIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: isMobile ? "16.5px" : "20px",
            }}
          />
          <TriggerText sx={{ color: theme.palette.primary.main }}>{selected?.company_name ?? "-"}</TriggerText>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <VerticalLine />
          {!anchorEl ? (
            <ExpandMoreIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          ) : (
            <ExpandLess fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          )}
        </Box>
      </SelectorTrigger>

      {/* Dropdown */}
      {Boolean(anchorEl) && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            width: isMobile ? "224px" : "300px",
            border: "1px solid rgba(233, 236, 242, 1)",
            borderRadius: "6px",
            backgroundColor: "#fff",
            padding: anchorEl ? "9px 8px" : "11px 8px",
            zIndex: 100,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <Box
            onClick={handleClose}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 6px",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <BusinessCenterIcon
                sx={{ color: theme.palette.primary.main, fontSize: isMobile ? "16.5px" : "20px" }}
              />
              <TriggerText sx={{ color: theme.palette.primary.main }}>{selected?.company_name ?? "-"}</TriggerText>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <VerticalLine />
              <ExpandLess fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ mt: "13px", display: "flex", flexDirection: "column", gap: isMobile ? "0px" : "6px" }}>
            <Typography
              sx={{
                display: isMobile ? "none" : "block",
                padding: "0px 6px",
                fontSize: "15px",
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontFamily: "UrbanistMedium",
              }}
            >
              {t("companySelectorTitle")}:
            </Typography>

            {companies.map((c) => (
              <CompanyItem
                key={c.company_id}
                active={active === c.company_id}
                onClick={() => {
                  setActive(c.company_id);
                  handleClose();
                }}
              >
                <ItemLeft>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <BusinessCenterIcon
                      sx={{ fontSize: isMobile ? "16.5px" : "20px" }}
                    />
                    <TriggerText>{c.company_name ?? "-"}</TriggerText>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: isMobile ? "10px" : "13px",
                      fontFamily: "UrbanistMedium",
                      fontWeight: 500,
                    }}
                  >
                    {c.email}
                  </Typography>
                </ItemLeft>

                <ItemRight
                  active={active === c.company_id}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleClose();
                    openEditCompany(c);
                  }}
                >
                  <Image
                    src={EditIcon}
                    width={isMobile ? 12 : 16}
                    height={isMobile ? 13 : 17}
                    alt="edit"
                    draggable={false}
                  />
                </ItemRight>
              </CompanyItem>
            ))}

            <Divider sx={{ my: "6px", borderColor: "#D9D9D9" }} />

            <CustomButton
              label={t("addCompany")}
              variant="secondary"
              size="medium"
              endIcon={<Add sx={{ fontSize: isMobile ? "16px" : "18px" }} />}
              fullWidth
              sx={{ mt: 1, py: "8px !important" }}
              onClick={() => {
                handleClose();
                openAddCompany();
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
