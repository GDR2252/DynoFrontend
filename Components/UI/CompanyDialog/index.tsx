import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import PopupModal from "@/Components/UI/PopupModal";
import FormManager from "@/Components/Page/Common/FormManager";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import PanelCard from "@/Components/UI/PanelCard";
import { CompanyAction } from "@/Redux/Actions";
import { COMPANY_INSERT, COMPANY_UPDATE } from "@/Redux/Actions/CompanyAction";
import { ICompany, rootReducer } from "@/utils/types";
import EditPencilIcon from "@/assets/Icons/edit-pencil-icon.svg";
import BusinessIcon from "@/assets/Icons/business-icon.svg";
import DownloadIcon from "@/assets/Icons/download-icon.svg";
import CustomButton from "../Buttons";
import useIsMobile from "@/hooks/useIsMobile";

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

const FormValueWatcher = ({ values, valueRef }: { values: any, valueRef: React.MutableRefObject<any> }) => {
  React.useEffect(() => {
    valueRef.current = values;
  }, [values, valueRef]);
  return null;
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
  const companyState = useSelector(
    (state: rootReducer) => state.companyReducer
  );
  const isMobile = useIsMobile("sm");
  const [mediaFile, setMediaFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [formKey, setFormKey] = useState(0);
  const currentValuesRef = useRef<CompanyFormValues>(companyInitial);

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

  const isDataChanged = () => {
    const hasImageChanged = !!mediaFile;
    const hasValuesChanged = JSON.stringify(currentValuesRef.current) !== JSON.stringify(initialValues);

    return hasImageChanged || hasValuesChanged;
  };

  const resetLocal = () => {
    setFileName(undefined);
    setMediaFile(undefined);
    setImagePreview(undefined);
  };

  const handleRequestClose = () => {
    if (!isDataChanged()) {
      handleClose();
    } else {
      console.log("Form has changes, preventing auto-close");
      // Optional: You could show a "Discard changes?" alert here
    }
  };

  const handleClose = () => {
    resetLocal();
    setFormKey((prev) => prev + 1); // Reset form by changing key
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
      handleClose={handleRequestClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "456px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2
        },
      }}
    >
      <PanelCard
        title={title}
        subTitle={subtitle}
        showHeaderBorder={false}
        headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
        bodyPadding={theme.spacing(2, 2.5, 2.5, 2.5)}
        sx={{
          width: "100%",
          borderRadius: "14px",
          maxWidth: "456px",
          mx: "auto",
        }}
        headerAction={
          <IconButton
            onClick={handleRequestClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              height: 40,
              width: 40,
              padding: "7px",
              backgroundColor: theme.palette.secondary.main,
              border: "1px solid",
              borderColor: theme.palette.border.main,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            {mode === "add" ? (
              <Image
                src={BusinessIcon.src}
                alt="business-icon"
                width={16}
                height={18}
                draggable={false}
              />
            ) : (
              <Image
                src={EditPencilIcon.src}
                alt="edit-pencil-icon"
                width={16}
                height={18}
                draggable={false}
              />
            )}
          </IconButton>
        }
        headerActionLayout="inline"
      >
        <FormManager
          key={formKey}
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
              <FormValueWatcher values={values} valueRef={currentValuesRef} />
              <Grid container spacing={"14px"}>
                <Grid item xs={12}>
                  <InputField
                    fullWidth
                    inputHeight={isMobile ? "32px" : "38px"}
                    label={t("fields.companyName.label")}
                    placeholder={t("fields.companyName.placeholder")}
                    name="company_name"
                    value={values.company_name}
                    error={Boolean(touched.company_name && errors.company_name)}
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
                  <InputField
                    fullWidth
                    inputHeight={isMobile ? "32px" : "38px"}
                    label={t("fields.website.label")}
                    placeholder={t("fields.website.placeholder")}
                    name="website"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputField
                    fullWidth
                    inputHeight={isMobile ? "32px" : "38px"}
                    label={t("fields.email.label")}
                    placeholder={t("fields.email.placeholder")}
                    name="email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
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
                        height: isMobile ? "32px" : "38px",
                        borderRadius: "10px",
                        boxSizing: "border-box",
                        "& input": {
                          padding: "12px 14px",
                          boxSizing: "border-box",
                          fontSize: "15px",
                          lineHeight: "1.5",
                          color: "#333",
                          "&::placeholder": {
                            color: theme.palette.secondary.contrastText,
                            fontFamily: "UrbanistMedium",
                          },
                          fontFamily: "UrbanistMedium",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#FFFFFF",
                        transition: "all 0.3s ease",
                        boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
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
                      borderRadius: "8px",
                      px: 2,
                      py: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      userSelect: "none",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: theme.palette.primary.light,
                        backgroundColor: "#FAFBFF",
                      },
                    }}
                    onClick={() => fileRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileRef}
                      hidden
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        handleFileChange(file);
                        e.target.value = "";
                      }}
                    />
                    {!imagePreview ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "fit-content",
                            height: "fit-content",
                            gap: 1,
                            backgroundColor: theme.palette.text.secondary,
                            borderRadius: "6px",
                            padding: "4px",
                            mx: "auto",
                            mb: 1,
                          }}
                        >
                          <Image
                            src={DownloadIcon.src}
                            alt="download-icon"
                            width={12}
                            height={12}
                            draggable={false}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: theme.palette.text.secondary,
                            mb: 0.5,
                            fontWeight: 400,
                          }}
                        >
                          {t("fields.brandLogo.uploadCta")}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: theme.palette.text.secondary,
                            fontWeight: 400,
                          }}
                        >
                          {t("fields.brandLogo.uploadHint")}
                        </Typography>
                      </>
                    ) : (
                      <Box sx={{ mt: 1.5 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image
                          src={imagePreview}
                          alt="logo preview"
                          crossOrigin="anonymous"
                          width={64}
                          height={64}
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 12,
                            objectFit: "cover",
                          }}
                          draggable={false}
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
                <CustomButton
                  label={t("actions.cancel")}
                  variant="outlined"
                  size="medium"
                  onClick={handleClose}
                  disabled={companyState.loading}
                  sx={{
                    flex: 1,
                    fontSize: "15px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "13px",
                    },
                  }}
                />
                <CustomButton
                  label={primaryButton}
                  variant="primary"
                  size="medium"
                  onClick={() => handleSubmit(values)}
                  disabled={submitDisable || companyState.loading}
                  sx={{
                    flex: 1,
                    fontSize: "15px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "13px",
                    },
                  }}
                />
              </Box>
            </>
          )}
        </FormManager>
      </PanelCard>
    </PopupModal>
  );
}
