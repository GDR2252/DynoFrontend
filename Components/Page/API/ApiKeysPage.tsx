import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@mui/material";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import PanelCard from "@/Components/UI/PanelCard";
import CustomButton from "@/Components/UI/Buttons";

import { ApiAction, CompanyAction } from "@/Redux/Actions";
import { API_DELETE, API_FETCH, API_INSERT } from "@/Redux/Actions/ApiAction";
import { COMPANY_FETCH } from "@/Redux/Actions/CompanyAction";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { menuItem, rootReducer } from "@/utils/types";
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
  InfoText,
  ApiKeyCardSubTitle,
  ApiDocumentationCardDescription,
} from "./styled";
import { theme } from "@/styles/theme";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CreateApiModel from "@/Components/UI/ApiKeysModel/CreateApiModel";
import DeleteModel from "@/Components/UI/DeleteModel";
import UnitedStatesFlag from "@/assets/Images/Icons/flags/united-states-flag.png";

const companyInitial = {
  company_id: 0,
  base_currency: "USD",
  withdrawal_whitelist: false,
};

function isProdKey(key: string) {
  const k = key.toLowerCase();
  return k.includes("live") || k.startsWith("dpk_live") || k.startsWith("live");
}

function isDevKey(key: string) {
  const k = key.toLowerCase();
  return k.includes("test") || k.startsWith("dpk_test") || k.startsWith("test");
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
          draggable={false}
        />
      }
      showHeaderBorder={false}
      headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
      bodyPadding={theme.spacing(1.75, 2.5, 2.5, 2.5)}
      sx={{
        position: "relative",
        overflow: "hidden",
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
          width: "70%",
          height: "100%",
          marginLeft: "auto",
          marginRight: "0.5rem",
          [theme.breakpoints.down("md")]: {
            backgroundPosition: "left",
            marginRight: "0",
          },
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
        <ApiDocumentationCardDescription>
          {t("documentation.description")}
        </ApiDocumentationCardDescription>
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
      <ApiKeyCardSubTitle>
        Base currency
        <span className="flag">
          <Image
            src={UnitedStatesFlag.src}
            alt="United States Flag"
            width={16}
            height={16}
            draggable={false}
          />
        </span>
        USD
      </ApiKeyCardSubTitle>

      <ApiKeyCardBody sx={{ pt: "18px" }}>
        <ApiKeyCardTopRow sx={{ gap: 1.25 }}>
          <InputField
            label={t("generate.yourKey")}
            sx={{
              width: "100%",
              "& .label": {
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "UrbanistMedium",
                fontWeight: 500,
                color: theme.palette.text.secondary,
              },
            }}
          />

          <ApiKeyCopyButton>
            <Image
              src={CopyIcon.src}
              alt={t("icons.copyAlt")}
              width={14}
              height={14}
              draggable={false}
            />
          </ApiKeyCopyButton>
          <ApiKeyViewButton size="small" onClick={() => setShow(!show)}>
            <Image
              src={EyeIcon.src}
              alt={t("icons.eyeAlt")}
              width={20}
              height={14}
              draggable={false}
            />
          </ApiKeyViewButton>
        </ApiKeyCardTopRow>
        <ApiKeyCardTopRow sx={{ gap: 1.25 }}>
          <InputField
            label={t("generate.adminToken")}
            sx={{
              width: "100%",
              "& .label": {
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "UrbanistMedium",
                fontWeight: 500,
                color: theme.palette.text.secondary,
              },
            }}
          />

          <ApiKeyCopyButton>
            <Image
              src={CopyIcon.src}
              alt={t("icons.copyAlt")}
              width={14}
              height={14}
              draggable={false}
            />
          </ApiKeyCopyButton>
          <ApiKeyViewButton size="small" onClick={() => setShow(!show)}>
            <Image
              src={EyeIcon.src}
              alt={t("icons.eyeAlt")}
              width={20}
              height={14}
              draggable={false}
            />
          </ApiKeyViewButton>
        </ApiKeyCardTopRow>
        <ApiKeyCardTopRow sx={{ alignItems: "center" }}>
          <ApiKeyDeleteButton size="small" onClick={() => onDelete(Number(1))}>
            <Image
              src={TrashIcon.src}
              alt={t("icons.trashAlt")}
              width={16}
              height={16}
              draggable={false}
            />
          </ApiKeyDeleteButton>

          <ApiKeyCreatedText>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeFilledIcon sx={{ fontSize: 13 }} />
            </Box>
            <Typography component="span" className="created-on-text">
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
      setMenuItems([
        { label: t("company.selectCompany"), value: 0 },
        ...tempList,
      ]);
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
      <DeleteModel
        open={confirmDeleteOpen}
        onClose={() => {
          setConfirmDeleteOpen(false);
          setDeleteId(0);
        }}
        onConfirm={confirmDelete}
        title={t("delete.title")}
        message={t("delete.confirmMessage")}
      />
      {/* <CustomAlert
        open={confirmDeleteOpen}
        handleClose={() => {
          setConfirmDeleteOpen(false);
          setDeleteId(0);
        }}
        message={t("delete.confirmMessage")}
        confirmText={t("delete.confirmButton")}
        onConfirm={confirmDelete}
      /> */}

      <Grid container spacing={2.5} sx={{ mb: 2.5 }} alignItems="flex-start">
        <Grid item xs={12} md={6} lg={6} xl={4}>
          <ApiKeyCard
            title={t("keys.production")}
            apiRow={prodKey}
            onCopy={handleCopy}
            onDelete={requestDelete}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={4}>
          <ApiKeyCard
            title={t("keys.development")}
            apiRow={devKey}
            onCopy={handleCopy}
            onDelete={requestDelete}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={4}>
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
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-start",
          justifyContent: "start",
          gap: 1,
          border: `1px solid ${theme.palette.border.main}`,
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 1,
            flexShrink: 0,
          }}
        >
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
          <InfoText
            sx={{
              color: theme.palette.error.main,
              whiteSpace: "nowrap",
            }}
          >
            {t("security.title")}
          </InfoText>
        </Box>
        <InfoText
          sx={{
            flex: 1,
            minWidth: 0,
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {t("security.description")}
        </InfoText>
      </Box>

      <CreateApiModel open={openCreate} onClose={handleCreateClose} />
    </>
  );
};

export default ApiKeysPage;
