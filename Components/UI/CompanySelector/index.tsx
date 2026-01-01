import { useEffect, useMemo, useState } from "react";
import { Popover, useTheme, Box } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EditIcon from "@/assets/Icons/edit-icon.svg";
import {
  SelectorTrigger,
  TriggerText,
  CompanyListWrapper,
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
import { rootReducer } from "@/utils/types";
import { useCompanyDialog } from "@/Components/UI/CompanyDialog/context";

export default function CompanySelector() {
  const { t } = useTranslation("dashboardLayout");
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { openAddCompany, openEditCompany } = useCompanyDialog();
  const companyState = useSelector(
    (state: rootReducer) => state.companyReducer
  );

  const companies = useMemo(
    () => companyState.companyList ?? [],
    [companyState.companyList]
  );
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active == null && companies.length > 0)
      setActive(companies[0].company_id);
  }, [active, companies]);

  const selected = companies.find((c) => c.company_id === active);

  const handleOpen = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {/* TRIGGER */}
      <SelectorTrigger onClick={handleOpen}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <BusinessCenterIcon
            sx={{ color: theme.palette.primary.main, fontSize: 20 }}
          />

          <TriggerText>{selected?.company_name ?? "-"}</TriggerText>
        </Box>

        <VerticalLine />

        {!anchorEl ? (
          <ExpandMoreIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        ) : (
          <ExpandLess
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        )}
      </SelectorTrigger>

      {/* POPOVER */}
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: "6px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
            overflow: "hidden",
            width: 330,
            p: 2,
          },
        }}
      >
        <Box
          sx={{
            fontSize: 13,
            mb: 1,
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {t("companySelectorTitle")}:
        </Box>

        <CompanyListWrapper>
          {companies.map((c) => (
            <CompanyItem
              key={c.company_id}
              active={active === c.company_id}
              onClick={() => setActive(c.company_id)}
            >
              <ItemLeft>
                <Box className="info">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BusinessCenterIcon
                      sx={{
                        color:
                          active === c.company_id
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                      }}
                    />

                    <Box className="name">{c.company_name}</Box>
                  </Box>
                  <Box className="email">{c.email}</Box>
                </Box>
              </ItemLeft>

              <ItemRight
                active={active === c.company_id}
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleClose();
                  openEditCompany(c);
                }}
                role="button"
                tabIndex={0}
              >
                <Image
                  src={EditIcon}
                  width={18}
                  height={18}
                  alt="edit"
                  draggable={false}
                />
              </ItemRight>
            </CompanyItem>
          ))}
        </CompanyListWrapper>

        <CustomButton
          label={t("addCompany")}
          variant="secondary"
          size="medium"
          endIcon={<Add />}
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => {
            handleClose();
            openAddCompany();
          }}
        />
      </Popover>
    </>
  );
}
