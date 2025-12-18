import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  ContentCopyRounded,
  DeleteOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
  CloseRounded,
  ErrorOutlineRounded,
} from "@mui/icons-material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import PanelCard from "@/Components/UI/PanelCard";
import TextBox from "@/Components/UI/TextBox";
import CustomButton from "@/Components/UI/Buttons";
import PopupModal from "@/Components/UI/PopupModal";
import Dropdown from "@/Components/UI/Dropdown";
import FormManager from "@/Components/Page/Common/FormManager";
import CustomAlert from "@/Components/UI/CustomAlert";

import { ApiAction, CompanyAction } from "@/Redux/Actions";
import { API_DELETE, API_FETCH, API_INSERT } from "@/Redux/Actions/ApiAction";
import { COMPANY_FETCH } from "@/Redux/Actions/CompanyAction";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { menuItem, rootReducer } from "@/utils/types";
import { stringShorten } from "@/helpers";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TrashIcon from "@/assets/Icons/trash-icon.svg";
import EyeIcon from "@/assets/Icons/eye-icon.svg";
import CopyIcon from "@/assets/Icons/copy-icon.svg";
import InfoIcon from "@/assets/Icons/info-icon.svg";

import BgImage from "@/assets/Images/card-bg.png";

import * as yup from "yup";
import Image from "next/image";
import {
  ApiKeyCardBody,
  ApiKeyCardTopRow,
  ApiKeyCopyButton,
  ApiKeyCreatedText,
  ApiKeyDeleteButton,
  ApiKeyViewButton,
  Tags,
  ApiDocsCardRoot,
  InfoText,
} from "./styled";
import { theme } from "@/styles/theme";
import InputField from "@/Components/UI/AuthLayout/InputFields";

const companyInitial = {
  company_id: 0,
  base_currency: "USD",
  withdrawal_whitelist: false,
};

const base_currency = [
  { label: "USD", value: "USD" },
  { label: "NGN", value: "NGN" },
];

function isProdKey(key: string) {
  const k = key.toLowerCase();
  return k.includes("live") || k.startsWith("dpk_live") || k.startsWith("live");
}

function isDevKey(key: string) {
  const k = key.toLowerCase();
  return k.includes("test") || k.startsWith("dpk_test") || k.startsWith("test");
}

function formatCreatedAt(raw: any) {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return String(raw);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy} at ${hh}:${min}:${ss}`;
}

type ApiRow = any;

const ApiDocumentationCard = ({ docsUrl }: { docsUrl: string }) => {
  const { t } = useTranslation("apiScreen");

  return (
    <PanelCard
      title={t("documentation.title")}
      headerIcon={
        <Image
          src={InfoIcon.src}
          alt={t("documentation.infoIconAlt")}
          width={18}
          height={18}
        />
      }
      showHeaderBorder={false}
      headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
      bodyPadding={theme.spacing(1.75, 2.5, 2.5, 2.5)}
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        borderRadius: "14px",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
      headerSx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "transparent",
      }}
      bodySx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {t("documentation.description")}
        </Typography>
        <CustomButton
          label={t("documentation.viewDocumentation")}
          variant="secondary"
          size="medium"
          endIcon={<ArrowOutwardIcon sx={{ fontSize: 14 }} />}
          // onClick={() => {
          //   if (!docsUrl) return;
          //   window.open(docsUrl, "_blank", "noopener,noreferrer");
          // }}
          sx={{
            height: 40,
            width: "fit-content",
          }}
        />
      </Box>
    </PanelCard>
  );
};

const ApiKeyCard = ({
  title,
  apiRow,
  onCopy,
  onDelete,
}: {
  title: string;
  apiRow?: ApiRow;
  onCopy: (value: string) => void;
  onDelete: (apiId: number) => void;
}) => {
  const { t } = useTranslation("apiScreen");
  const [show, setShow] = useState(false);

  const apiKey: string = apiRow?.apiKey || "";
  const createdAt =
    apiRow?.created_at || apiRow?.createdAt || apiRow?.createdOn || "";

  return (
    <PanelCard
      title={title}
      showHeaderBorder={false}
      bodyPadding={theme.spacing(0, 2.5, 2.5, 2.5)}
      headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
      headerActionLayout="inline"
      headerAction={
        <Tags>
          <CheckCircleRoundedIcon sx={{ fontSize: 16 }} /> {t("status.active")}
        </Tags>
      }
      sx={{ height: "100%", borderRadius: "14px" }}
    >
      <ApiKeyCardBody sx={{ pt: "18px" }}>
        <ApiKeyCardTopRow sx={{ gap: 1.25 }}>
          <InputField />

          <ApiKeyCopyButton>
            <Image
              src={CopyIcon.src}
              alt={t("icons.copyAlt")}
              width={14}
              height={14}
            />
          </ApiKeyCopyButton>
          <ApiKeyViewButton size="small" onClick={() => setShow(!show)}>
            <Image
              src={EyeIcon.src}
              alt={t("icons.eyeAlt")}
              width={20}
              height={14}
            />
          </ApiKeyViewButton>
        </ApiKeyCardTopRow>
        <ApiKeyCardTopRow>
          <ApiKeyDeleteButton
            size="small"
            onClick={() => onDelete(Number(apiRow?.api_id))}
          >
            <Image
              src={TrashIcon.src}
              alt={t("icons.trashAlt")}
              width={16}
              height={16}
            />
          </ApiKeyDeleteButton>

          <ApiKeyCreatedText>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeFilledIcon sx={{ fontSize: 13 }} />
            </Box>
            <Typography component="span">
              {t("createdOn", { date: "17/12/2025 at 10:00:00" })}
            </Typography>
          </ApiKeyCreatedText>
        </ApiKeyCardTopRow>
      </ApiKeyCardBody>
    </PanelCard>
  );
};

const ApiKeysPage = ({
  openCreate: openCreateProp,
  setOpenCreate: setOpenCreateProp,
}: {
  openCreate?: boolean;
  setOpenCreate?: (open: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("apiScreen");

  const companyList = useSelector(
    (state: rootReducer) => state.companyReducer.companyList
  );
  const apiState = useSelector((state: rootReducer) => state.apiReducer);

  const [menuItems, setMenuItems] = useState<menuItem[]>([]);
  const [initialValue, setInitialValue] = useState(
    structuredClone(companyInitial)
  );

  const [openCreateLocal, setOpenCreateLocal] = useState(false);
  const openCreate = openCreateProp ?? openCreateLocal;
  const setOpenCreate = setOpenCreateProp ?? setOpenCreateLocal;
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  const apiSchema = yup.object().shape({
    company_id: yup
      .string()
      .test(
        "company_id",
        t("validation.selectCompany"),
        (value: any) => value != 0
      ),
  });

  useEffect(() => {
    dispatch(CompanyAction(COMPANY_FETCH));
    dispatch(ApiAction(API_FETCH));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (companyList?.length > 0) {
      const tempList: menuItem[] = companyList.map((c: any) => ({
        label: c.company_name,
        value: c.company_id,
      }));
      setMenuItems([{ label: t("company.selectCompany"), value: 0 }, ...tempList]);
    }
  }, [companyList, t]);

  const { prodKey, devKey } = useMemo(() => {
    const list: ApiRow[] = apiState?.apiList || [];
    const prod = list.find((x) => isProdKey(String(x?.apiKey || "")));
    const dev = list.find((x) => isDevKey(String(x?.apiKey || "")));
    return {
      prodKey: prod || list[0],
      devKey: dev || list.find((x) => x !== prod) || list[1],
    };
  }, [apiState?.apiList]);

  const handleCopy = (value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    dispatch({
      type: TOAST_SHOW,
      payload: { message: t("toast.copied"), severity: "info" },
    });
  };

  const handleCreateClose = () => {
    setInitialValue(structuredClone(companyInitial));
    setOpenCreate(false);
  };

  const handleCreateSubmit = (values: any) => {
    dispatch(
      ApiAction(API_INSERT, {
        ...values,
        withdrawal_whitelist: values.withdrawal_whitelist,
      })
    );
    setOpenCreate(false);
  };

  const requestDelete = (apiId: number) => {
    if (!apiId) return;
    setDeleteId(apiId);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    dispatch(ApiAction(API_DELETE, { id: deleteId }));
    setConfirmDeleteOpen(false);
    setDeleteId(0);
  };

  const docsUrl =
    (process.env.NEXT_PUBLIC_API_DOCS_URL as string) ||
    "https://docs.dynopay.com";

  return (
    <>
      <CustomAlert
        open={confirmDeleteOpen}
        handleClose={() => {
          setConfirmDeleteOpen(false);
          setDeleteId(0);
        }}
        message={t("delete.confirmMessage")}
        confirmText={t("delete.confirmButton")}
        onConfirm={confirmDelete}
      />

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={4}>
          <ApiKeyCard
            title={t("keys.production")}
            apiRow={prodKey}
            onCopy={handleCopy}
            onDelete={requestDelete}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ApiKeyCard
            title={t("keys.development")}
            apiRow={devKey}
            onCopy={handleCopy}
            onDelete={requestDelete}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ApiDocumentationCard docsUrl={docsUrl} />
        </Grid>
      </Grid>

      <Box
        sx={{
          bgcolor: theme.palette.primary.light,
          px: 2.25,
          py: 1.25,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: 1,
          border: `1px solid ${theme.palette.border.main}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 1,
          }}
        >
          {/* Use mask so SVG renders with exact hex color */}
          <Box
            component="span"
            sx={{
              width: 16,
              height: 16,
              display: "inline-block",
              bgcolor: "#E8484A",
              WebkitMask: `url(${InfoIcon.src}) no-repeat center / contain`,
              mask: `url(${InfoIcon.src}) no-repeat center / contain`,
              flex: "0 0 auto",
            }}
          />
          <InfoText sx={{ color: theme.palette.error.main }}>
            {t("security.title")}
          </InfoText>
        </Box>
        <InfoText>
          {t("security.description")}
        </InfoText>
      </Box>

      <PopupModal
        open={openCreate}
        showClose
        headerText={t("generate.modalTitle")}
        handleClose={handleCreateClose}
      >
        <Box sx={{ minWidth: "400px" }}>
          <FormManager
            initialValues={initialValue}
            yupSchema={apiSchema}
            onSubmit={handleCreateSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              submitDisable,
              touched,
              values,
            }) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Dropdown
                    fullWidth={true}
                    label={t("company.label")}
                    menuItems={menuItems}
                    value={values.company_id}
                    error={touched.company_id && errors.company_id}
                    helperText={
                      touched.company_id &&
                      errors.company_id &&
                      errors.company_id
                    }
                    getValue={(value: any) => {
                      const e: any = { target: { name: "company_id", value } };
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  <Box sx={{ width: "100%", mt: 3 }}>
                    <Dropdown
                      fullWidth={true}
                      label={t("currency.baseCurrency")}
                      menuItems={base_currency}
                      value={values.base_currency}
                      error={touched.base_currency && errors.base_currency}
                      helperText={
                        touched.base_currency &&
                        errors.base_currency &&
                        errors.base_currency
                      }
                      getValue={(value: any) => {
                        const e: any = {
                          target: { name: "base_currency", value },
                        };
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      mt: 3,
                      p: 2.5,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {t("withdrawalWhitelist.title")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("withdrawalWhitelist.description")}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1.5,
                        fontWeight: 600,
                        color: "warning.main",
                        cursor: "pointer",
                        width: "fit-content",
                      }}
                      onClick={() => router.push("/walletAddress")}
                    >
                      {t("withdrawalWhitelist.addressManagement")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 3,
                      }}
                    >
                      <CustomButton
                        label={t("withdrawalWhitelist.off")}
                        variant={
                          values.withdrawal_whitelist ? "outlined" : "primary"
                        }
                        size="medium"
                        endIcon={<CloseRounded />}
                        onClick={() => {
                          const eOff: any = {
                            target: {
                              name: "withdrawal_whitelist",
                              value: false,
                            },
                          };
                          handleChange(eOff);
                        }}
                        sx={{
                          backgroundColor: values.withdrawal_whitelist
                            ? "#fff"
                            : "#E03B2C",
                          border: values.withdrawal_whitelist
                            ? "1px solid #E9ECF2"
                            : "none",
                          color: values.withdrawal_whitelist
                            ? "#242428"
                            : "#fff",
                        }}
                      />
                      <CustomButton
                        label={t("withdrawalWhitelist.enable")}
                        variant={
                          values.withdrawal_whitelist ? "primary" : "secondary"
                        }
                        size="medium"
                        onClick={() => {
                          const eOn: any = {
                            target: {
                              name: "withdrawal_whitelist",
                              value: true,
                            },
                          };
                          handleChange(eOn);
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <CustomButton
                    label={t("generate.submit")}
                    type="submit"
                    disabled={submitDisable}
                    variant="primary"
                    size="medium"
                  />
                </Box>
              </>
            )}
          </FormManager>
        </Box>
      </PopupModal>
    </>
  );
};

export default ApiKeysPage;
