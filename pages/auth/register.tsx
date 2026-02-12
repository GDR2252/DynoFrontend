import { useState, useRef, useEffect } from "react";
import Logo from "@/assets/Images/auth/dynopay-logo.png";
import Image from "next/image";
import LanguageSwitcher from "@/Components/UI/LanguageSwitcher";
import { AuthContainer, CardWrapper } from "@/Containers/Login/styled";
import useIsMobile from "@/hooks/useIsMobile";
import { Box, Typography } from "@mui/material";
import TitleDescription from "@/Components/UI/AuthLayout/TitleDescription";
import { useTranslation } from "react-i18next";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomButton from "@/Components/UI/Buttons";
import { theme } from "@/styles/theme";
import router from "next/router";
import PasswordValidation from "@/Components/UI/AuthLayout/PasswordValidation";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "@/utils/types";
import {
  USER_API_ERROR,
  USER_REGISTER,
  UserAction,
} from "@/Redux/Actions/UserAction";
import * as yup from "yup";
import LoadingIcon from "@/assets/Icons/LoadingIcon";

type RegisterErrorKey =
  | ""
  | "firstNameRequired"
  | "lastNameRequired"
  | "emailRequired"
  | "emailInvalid"
  | "passwordRequired"
  | "passwordInvalid"
  | "passwordAndConfirmPasswordShouldBeSame";

const Register = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const userState = useSelector((state: rootReducer) => state.userReducer);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState<RegisterErrorKey>("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState<RegisterErrorKey>("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<RegisterErrorKey>("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<RegisterErrorKey>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const passwordFieldRef = useRef<HTMLDivElement | null>(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<RegisterErrorKey>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-=__+{}\[\]:;<>,.?/~]).{8,20}$/;

  const registerSchema = yup.object().shape({
    // Store translation keys as messages so UI can translate live on language change
    firstName: yup.string().required("firstNameRequired"),
    lastName: yup.string().required("lastNameRequired"),
    email: yup.string().email("emailInvalid").required("emailRequired"),
    password: yup
      .string()
      .required("passwordRequired")
      .matches(passwordRegex, "passwordInvalid"),
    confirmPassword: yup.string().oneOf([yup.ref("password")]),
  });

  useEffect(() => {
    if (userState.name) {
      router.push("/dashboard");
    }
  }, [userState]);

  useEffect(() => {
    if (userState.loading) {
      const timeout = setTimeout(() => {
        if (!userState.name) {
          dispatch({ type: USER_API_ERROR });
        }
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [userState.loading, userState.name, dispatch]);

  // Errors for firstName, lastName, email only show on Sign Up click (via schema)

  const validateField = async (
    field: "firstName" | "lastName" | "email" | "password",
    nextValues?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    }
  ) => {
    try {
      await registerSchema.validateAt(field, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        ...(nextValues || {}),
      });
      if (field === "firstName") setFirstNameError("");
      if (field === "lastName") setLastNameError("");
      if (field === "email") setEmailError("");
      if (field === "password") {
        setPasswordError("");
        setShowPasswordValidation(false);
      }
    } catch (e: any) {
      const key = (e?.message || "") as RegisterErrorKey;
      if (field === "firstName") setFirstNameError(key);
      if (field === "lastName") setLastNameError(key);
      if (field === "email") setEmailError(key);
      if (field === "password") {
        // For invalid password pattern, show the PasswordValidation UI instead of helper text
        if (key === "passwordInvalid") {
          setPasswordError("");
          setShowPasswordValidation(true);
        } else {
          setPasswordError(key);
        }
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    // Remove spaces from password
    const valueWithoutSpaces = value.replace(/\s/g, "");
    const finalValue = valueWithoutSpaces;

    setPassword(finalValue);

    if (!finalValue) {
      setShowPasswordValidation(false);
      // If the user already tried submitting, keep schema-driven error in sync
      if (passwordError) validateField("password", { password: finalValue });
    } else if (passwordRegex.test(finalValue)) {
      // Hide validation when all conditions are met
      setPasswordError("");
      setShowPasswordValidation(false);
    } else {
      setPasswordError("");
      setShowPasswordValidation(true);
    }

    // If confirm password already has a value, keep mismatch error in sync
    if (confirmPassword) {
      if (finalValue && confirmPassword && confirmPassword !== finalValue) {
        setConfirmPasswordError("passwordAndConfirmPasswordShouldBeSame");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handlePasswordBlur = () => {
    // Only handle closing the validation popover; no new errors on blur
    setTimeout(() => {
      setShowPasswordValidation(false);
    }, 200);
  };

  const handleSignUp = async () => {
    try {
      await registerSchema.validate(
        { firstName, lastName, email, password, confirmPassword },
        { abortEarly: false }
      );

      setFirstNameError("");
      setLastNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");

      const payload = {
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
      };

      dispatch(UserAction(USER_REGISTER, payload));
    } catch (err: any) {
      if (err.inner && Array.isArray(err.inner)) {
        const fieldErrors: Record<string, RegisterErrorKey> = {};
        err.inner.forEach((e: any) => {
          if (e.path && !fieldErrors[e.path]) {
            fieldErrors[e.path] = e.message as RegisterErrorKey;
          }
        });

        setFirstNameError(fieldErrors.firstName || "");
        setLastNameError(fieldErrors.lastName || "");
        setEmailError(fieldErrors.email || "");
        if (fieldErrors.password === "passwordInvalid") {
          setPasswordError("");
          setShowPasswordValidation(true);
        } else {
          setPasswordError(fieldErrors.password || "");
        }

        // confirmPassword: schema doesn't have its own message, so map to our key
        if (confirmPassword && password && confirmPassword !== password) {
          setConfirmPasswordError("passwordAndConfirmPasswordShouldBeSame");
        } else {
          setConfirmPasswordError("");
        }
      }
    }
  };

  return (
    <AuthContainer>
      <CardWrapper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "10px 18px" : "8px 27px",
          height: isMobile ? "49px" : "56px",
          overflow: "visible",
        }}
      >
        {/* Logo */}
        <Image
          src={Logo}
          alt="logo"
          width={isMobile ? 86 : 114}
          height={isMobile ? 29 : 39}
          draggable={false}
          onClick={() => {
            router.push("/");
          }}
          style={{ cursor: "pointer" }}
        />

        <Box>
          <LanguageSwitcher
            sx={{
              maxWidth: isMobile ? "78px" : "111px",
              padding: isMobile ? "7px 10px" : "10px 14px",
            }}
          />
        </Box>
      </CardWrapper>

      {/* Register Card */}
      <CardWrapper sx={{ padding: "30px" }}>
        {/* Register Title & Description */}
        <TitleDescription
          title={t("register")}
          description={t("registerDescription")}
          align="left"
          titleVariant="h2"
          descriptionVariant="p"
        />

        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "10px",
            }}
          >
            {/* First Name */}
            <InputField
              label={t("firstName")}
              type="text"
              placeholder={t("firstNamePlaceholder")}
              value={firstName}
              onChange={(e) => {
                // Remove spaces and capitalize first character
                const rawValue = e.target.value.replace(/\s/g, "");
                const capitalized =
                  rawValue.length > 0
                    ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
                    : rawValue;
                setFirstName(capitalized);
                if (firstNameError)
                  validateField("firstName", { firstName: capitalized });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !userState.loading) {
                  e.preventDefault();
                  handleSignUp();
                }
              }}
              error={!!firstNameError}
              helperText={firstNameError ? t(firstNameError) : ""}
            />

            {/* Last Name */}
            <InputField
              label={t("lastName")}
              type="text"
              placeholder={t("lastNamePlaceholder")}
              value={lastName}
              onChange={(e) => {
                // Remove spaces and capitalize first character
                const rawValue = e.target.value.replace(/\s/g, "");
                const capitalized =
                  rawValue.length > 0
                    ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
                    : rawValue;
                setLastName(capitalized);
                if (lastNameError)
                  validateField("lastName", { lastName: capitalized });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !userState.loading) {
                  e.preventDefault();
                  handleSignUp();
                }
              }}
              error={!!lastNameError}
              helperText={lastNameError ? t(lastNameError) : ""}
            />
          </Box>

          {/* Email */}
          <InputField
            label={t("email")}
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => {
              // Remove all spaces from email
              const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
              setEmail(valueWithoutSpaces);
              if (emailError)
                validateField("email", { email: valueWithoutSpaces });
            }}
            onKeyDown={(e) => {
              // Prevent space key from being entered
              if (e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
              }
              // Submit on Enter
              if (e.key === "Enter" && !userState.loading) {
                e.preventDefault();
                handleSignUp();
              }
            }}
            error={!!emailError}
            helperText={emailError ? t(emailError) : ""}
          />

          {/* Password */}
          <Box
            ref={passwordFieldRef}
            sx={{ position: "relative", width: "100%" }}
          >
            <InputField
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="off"
              label={t("password")}
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
              onFocus={() => {
                if (password && !passwordRegex.test(password)) {
                  setShowPasswordValidation(true);
                }
              }}
              onBlur={() => {
                handlePasswordBlur();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !userState.loading) {
                  e.preventDefault();
                  handleSignUp();
                }
              }}
              placeholder={t("passwordPlaceHolder")}
              // Show red border when there is a password error or
              // when the PasswordValidation component is visible (invalid password)
              error={!!passwordError || showPasswordValidation}
              helperText={passwordError ? t(passwordError) : ""}
              sideButton={true}
              sideButtonType="primary"
              sideButtonIcon={
                showPassword ? (
                  <VisibilityOffIcon
                    tabIndex={-1}
                    aria-hidden={true}
                    sx={{
                      color: "#676768",
                      height: "18px",
                      width: "16px",
                    }}
                  />
                ) : (
                  <VisibilityIcon
                    tabIndex={-1}
                    aria-hidden={true}
                    sx={{
                      color: "#676768",
                      height: "18px",
                      width: "16px",
                    }}
                  />
                )
              }
              sideButtonIconWidth={isMobile ? "14px" : "18px"}
              sideButtonIconHeight={isMobile ? "14px" : "18px"}
              onSideButtonClick={() => {
                setShowPassword(!showPassword);
              }}
              showPasswordToggle={true}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                ...(isMobile &&
                  theme.breakpoints.down("lg") && {
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%",
                }),
                zIndex: 5,
              }}
            >
              <PasswordValidation
                password={password}
                anchorEl={passwordFieldRef.current}
                open={showPasswordValidation}
                onClose={() => setShowPasswordValidation(false)}
                showOnMobile={showPasswordValidation}
              />
            </Box>
          </Box>

          {/* Confirm Password */}
          <InputField
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            autoComplete="off"
            label={t("confirmPassword")}
            onChange={(e) => {
              // Remove spaces from confirm password
              const value = e.target.value.replace(/\s/g, "");
              setConfirmPassword(value);
              if (!password || !value) {
                // Only show error when both passwords have a value
                setConfirmPasswordError("");
              } else if (value !== password) {
                setConfirmPasswordError(
                  "passwordAndConfirmPasswordShouldBeSame"
                );
              } else {
                setConfirmPasswordError("");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !userState.loading) {
                e.preventDefault();
                handleSignUp();
              }
            }}
            placeholder={t("confirmPasswordPlaceHolder")}
            error={
              confirmPasswordError === "passwordAndConfirmPasswordShouldBeSame"
            }
            helperText={confirmPasswordError ? t(confirmPasswordError) : ""}
            sideButton={true}
            sideButtonType="primary"
            sideButtonIcon={
              showConfirmPassword ? (
                <VisibilityOffIcon
                  tabIndex={-1}
                  aria-hidden={true}
                  sx={{
                    color: "#676768",
                    height: "18px",
                    width: "16px",
                  }}
                />
              ) : (
                <VisibilityIcon
                  tabIndex={-1}
                  aria-hidden={true}
                  sx={{
                    color: "#676768",
                    height: "18px",
                    width: "16px",
                  }}
                />
              )
            }
            sideButtonIconWidth={isMobile ? "14px" : "18px"}
            sideButtonIconHeight={isMobile ? "14px" : "18px"}
            onSideButtonClick={() => {
              setShowConfirmPassword(!showConfirmPassword);
            }}
            showPasswordToggle={true}
          />
        </Box>

        {/* Sign Up Button */}
        <Box sx={{ marginTop: "24px" }}>
          <CustomButton
            label={t("signUpButton")}
            variant="primary"
            size={isMobile ? "small" : "medium"}
            fullWidth
            disabled={userState.loading}
            onClick={handleSignUp}
            hideLabelWhenLoading={true}
            endIcon={userState.loading ? <LoadingIcon size={20} /> : undefined}
          />
        </Box>

        {/* Don't have acc */}
        <Box
          sx={{
            display: "flex",
            gap: "7px",
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          <Typography
            width="100%"
            sx={{
              fontSize: "13px",
              color: theme.palette.text.secondary,
              fontFamily: "UrbanistMedium",
            }}
            fontWeight={500}
          >
            {t("alreadyHaveAccount")}
            <Typography
              component="span"
              sx={{
                fontSize: "13px",
                color: theme.palette.primary.main,
                fontWeight: 500,
                textAlign: "start",
                cursor: "pointer",
                paddingLeft: "7px",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                fontFamily: "UrbanistMedium",
              }}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              {t("login")}
            </Typography>
          </Typography>
        </Box>
      </CardWrapper>
    </AuthContainer>
  );
};

export default Register;
