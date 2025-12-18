import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CancelRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import PopupModal from "@/Components/UI/PopupModal";
import FormManager from "@/Components/Page/Common/FormManager";
import TextBox from "@/Components/UI/TextBox";
import PanelCard from "@/Components/UI/PanelCard";
import { CompanyAction } from "@/Redux/Actions";
import { COMPANY_INSERT, COMPANY_UPDATE } from "@/Redux/Actions/CompanyAction";
import { ICompany, rootReducer } from "@/utils/types";
import FileIcon from "@/assets/Icons/file-icon.svg";

export type CompanyDialogMode = "add" | "edit";

type CompanyFormValues = {
  company_name: string;
  email: string;
  mobile: string;
  website: string;
};

const companyInitial: CompanyFormValues = {
  company_name: "",
  email: "",
  mobile: "",
  website: "",
};

export default function CompanyDialog({
  open,
  mode,
  company,
  onClose,
}: {
  open: boolean;
  mode: CompanyDialogMode;
  company?: ICompany | null;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation("companyDialog");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const companyState = useSelector((state: rootReducer) => state.companyReducer);

  const [mediaFile, setMediaFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const initialValues = useMemo<CompanyFormValues>(() => {
    if (mode === "edit" && company) {
      return {
        company_name: company.company_name ?? "",
        email: company.email ?? "",
        mobile: company.mobile ?? "",
        website: company.website ?? "",
      };
    }
    return structuredClone(companyInitial);
  }, [mode, company]);

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && company?.photo) setImagePreview(company.photo);
    if (mode === "add") setImagePreview(undefined);
  }, [open, mode, company]);

  const schema = useMemo(
    () =>
      yup.object().shape({
        company_name: yup
          .string()
          .required(t("validation.companyNameRequired")),
        email: yup
          .string()
          .email(t("validation.emailInvalid"))
          .required(t("validation.emailRequired")),
        mobile: yup
          .string()
          .required(t("validation.mobileRequired"))
          .min(10, t("validation.mobileMin"))
          .max(14, t("validation.mobileMax")),
        website: yup.string().nullable(),
      }),
    [t]
  );

  const resetLocal = () => {
    setFileName(undefined);
    setMediaFile(undefined);
    setImagePreview(undefined);
  };

  const handleClose = () => {
    resetLocal();
    onClose();
  };

  const handleFileChange = (file?: File) => {
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setFileName(file.name);
    setMediaFile(file);
  };

  const handleSubmit = (values: any) => {
    const v: CompanyFormValues = values as CompanyFormValues;
    const formData = new FormData();
    formData.append("data", JSON.stringify(v));
    if (mediaFile) formData.append("image", mediaFile);

    if (mode === "add") {
      dispatch(CompanyAction(COMPANY_INSERT, formData));
    } else if (company?.company_id) {
      dispatch(
        CompanyAction(COMPANY_UPDATE, { id: company.company_id, formData })
      );
    }

    handleClose();
  };

  const modeKey = mode === "add" ? "add" : "edit";
  const title = t(`mode.${modeKey}.title`);
  const subtitle = t(`mode.${modeKey}.subtitle`);
  const primaryButton = t(`mode.${modeKey}.primaryButton`);

  return (
    <PopupModal
      open={open}
      showHeader={false}
      transparent
      handleClose={handleClose}
    >
      <PanelCard
        title={title}
        subTitle={subtitle}
        showHeaderBorder={false}
        headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
        bodyPadding={theme.spacing(2, 2.5, 2.5, 2.5)}
        sx={{
          width: { xs: "100%", md: 520 },
          borderRadius: "14px",
        }}
        headerAction={
          <IconButton
            onClick={handleClose}
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              border: "1px solid",
              borderColor: "border.main",
              backgroundColor: "#fff",
            }}
          >
            <CancelRounded color="secondary" />
          </IconButton>
        }
        headerActionLayout="inline"
      >
        <FormManager
          initialValues={initialValues}
          yupSchema={schema}
          onSubmit={handleSubmit}
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextBox
                    fullWidth
                    label={t("fields.companyName.label")}
                    placeholder={t("fields.companyName.placeholder")}
                    name="company_name"
                    value={values.company_name}
                    error={touched.company_name && errors.company_name}
                    helperText={
                      touched.company_name && errors.company_name
                        ? errors.company_name
                        : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextBox
                    fullWidth
                    label={t("fields.website.label")}
                    placeholder={t("fields.website.placeholder")}
                    name="website"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextBox
                    fullWidth
                    label={t("fields.email.label")}
                    placeholder={t("fields.email.placeholder")}
                    name="email"
                    value={values.email}
                    error={touched.email && errors.email}
                    helperText={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: "15px",
                      textAlign: "start",
                      color: "#242428",
                      lineHeight: "1.2",
                      mb: 0.75,
                    }}
                  >
                    {t("fields.mobile.label")}
                  </Typography>
                  <MuiTelInput
                    fullWidth
                    placeholder={t("fields.mobile.placeholder")}
                    name="mobile"
                    forceCallingCode
                    disableFormatting
                    defaultCountry="US"
                    value={values.mobile}
                    onChange={(newValue) => {
                      const e: any = {
                        target: { name: "mobile", value: newValue },
                      };
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.mobile && errors.mobile)}
                    helperText={
                      touched.mobile && errors.mobile
                        ? (errors.mobile as any)
                        : undefined
                    }
                    sx={{
                      borderRadius: "6px !important",
                      boxShadow: "none",
                      fontFamily: "UrbanistMedium",
                      "& .MuiInputBase-root": {
                        height: "44px",
                        borderRadius: "10px",
                        boxSizing: "border-box",
                        "& input": {
                          padding: "12px 14px",
                          boxSizing: "border-box",
                          fontSize: "15px",
                          lineHeight: "1.5",
                          color: "#333",
                          "&::placeholder": {
                            color: "#BDBDBD",
                            fontFamily: "UrbanistMedium",
                          },
                          fontFamily: "UrbanistMedium",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#FFFFFF",
                        transition: "all 0.3s ease",
                        boxShadow:
                          "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
                        "& fieldset": {
                          borderColor: "#E9ECF2",
                          borderWidth: "1px",
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.light,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.light,
                          borderWidth: "1px",
                        },
                      },
                      "& button": {
                        padding: "4px 8px",
                        marginRight: "4px",
                        color: "#333",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        "& svg": {
                          fontSize: "16px",
                          color: "#676768",
                        },
                        "& img": {
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        },
                      },
                      "& .MuiInputAdornment-root": {
                        "& p": {
                          fontSize: "15px",
                          color: "#333",
                          fontFamily: "UrbanistMedium",
                          margin: 0,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: "15px",
                      textAlign: "start",
                      color: "#242428",
                      lineHeight: "1.2",
                      mb: 0.75,
                    }}
                  >
                    {t("fields.brandLogo.label")}
                  </Typography>

                  <Box
                    sx={{
                      border: "1px dashed #E9ECF2",
                      borderRadius: "12px",
                      px: 2,
                      py: 2.25,
                      textAlign: "center",
                      cursor: "pointer",
                      userSelect: "none",
                      backgroundColor: "#FAFBFF",
                      "&:hover": { backgroundColor: "#F5F7FF" },
                    }}
                    onClick={() => fileRef.current?.click()}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        mx: "auto",
                        mb: 1,
                        borderRadius: "12px",
                        backgroundColor: "#fff",
                        border: "1px solid #E9ECF2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={FileIcon.src}
                        alt="upload"
                        width={18}
                        height={18}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                      {t("fields.brandLogo.uploadCta")}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                      {t("fields.brandLogo.uploadHint")}
                    </Typography>
                    <input
                      type="file"
                      ref={fileRef}
                      hidden
                      accept="image/*"
                      onChange={(e: any) => handleFileChange(e.target.files?.[0])}
                    />
                    {fileName && (
                      <Typography sx={{ mt: 1, fontSize: 12 }}>
                        {fileName}
                      </Typography>
                    )}
                    {imagePreview && (
                      <Box sx={{ mt: 1.5 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreview}
                          alt="logo preview"
                          crossOrigin="anonymous"
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 12,
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 2.25,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{
                    flex: 1,
                    height: 44,
                    borderRadius: "10px",
                    borderColor: "#E9ECF2",
                    color: "#242428",
                    textTransform: "none",
                    fontFamily: "UrbanistMedium",
                  }}
                >
                  {t("actions.cancel")}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={submitDisable || companyState.loading}
                  sx={{
                    flex: 1,
                    height: 44,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontFamily: "UrbanistMedium",
                  }}
                >
                  {primaryButton}
                </Button>
              </Box>
            </>
          )}
        </FormManager>
      </PanelCard>
    </PopupModal>
  );
}

