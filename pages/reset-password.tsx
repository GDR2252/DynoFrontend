import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import TitleDescription from "@/Components/UI/AuthLayout/TitleDescription";
import { useTranslation } from "react-i18next";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "@/utils/types";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useIsMobile from "@/hooks/useIsMobile";
import { theme } from "@/styles/theme";
import PasswordValidation from "@/Components/UI/AuthLayout/PasswordValidation";
import CustomButton from "@/Components/UI/Buttons";
import { AuthContainer, CardWrapper } from "@/Containers/Login/styled";
import { UserAction } from "@/Redux/Actions";
import { USER_RESET_PASSWORD } from "@/Redux/Actions/UserAction";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import Image from "next/image";
import Logo from "@/assets/Images/auth/dynopay-logo.png";
import LanguageSwitcher from "@/Components/UI/LanguageSwitcher";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token, email } = router.query;
  const [allowed, setAllowed] = useState(false);
  const dispatch = useDispatch();

  const isMobile = useIsMobile();
  const userState = useSelector((state: rootReducer) => state.userReducer);
  const { t } = useTranslation("auth");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
  const [newPasswordShowPassword, setNewPasswordShowPassword] = useState(false);
  const [newPasswordConfirmShowPassword, setNewPasswordConfirmShowPassword] =
    useState(false);
  const [
    newPasswordShowPasswordValidation,
    setNewPasswordShowPasswordValidation,
  ] = useState(false);
  const newPasswordFieldRef = useRef<HTMLDivElement | null>(null);

  // Password validation regex
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-=__+{}\[\]:;<>,.?/~]).{8,20}$/;

  // Handle new password change
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    // Show validation if password doesn't match regex, hide if it does
    if (!value) {
      setNewPasswordShowPasswordValidation(false);
    } else if (passwordRegex.test(value)) {
      // Hide validation when all conditions are met
      setNewPasswordShowPasswordValidation(false);
    } else {
      // Show validation when password is invalid
      setNewPasswordShowPasswordValidation(true);
    }

    // Check if confirm password matches (if confirm password has a value)
    if (newPasswordConfirm) {
      if (value && newPasswordConfirm && value !== newPasswordConfirm) {
        setNewPasswordConfirmError("passwordAndConfirmPasswordShouldBeSame");
      } else {
        setNewPasswordConfirmError("");
      }
    }
  };

  // Handle new password blur
  const handleNewPasswordBlur = () => {
    // Hide validation popover on blur with a small delay
    setTimeout(() => {
      setNewPasswordShowPasswordValidation(false);
    }, 200);
  };

  // Handle new password focus
  const handleNewPasswordFocus = () => {
    // Show validation if password exists and doesn't match regex
    if (newPassword && !passwordRegex.test(newPassword)) {
      setNewPasswordShowPasswordValidation(true);
    }
  };

  // Handle confirm password change
  const handleNewPasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNewPasswordConfirm(value);
    setNewPasswordConfirmError(""); // Clear error when typing

    // Check if passwords match
    if (newPassword && value && newPassword !== value) {
      setNewPasswordConfirmError("passwordAndConfirmPasswordShouldBeSame");
    } else {
      setNewPasswordConfirmError("");
    }
  };

  const handleSetNewPassword = () => {
    try {
      if (newPassword && newPasswordConfirm && token && email) {
        dispatch(
          UserAction(USER_RESET_PASSWORD, {
            token: token,
            email: email,
            newPassword: newPassword,
            onSuccess: () => {
              router.replace("/auth/login");
            },
          })
        );
      }
    } catch (e: any) {
      const message =
        e.response?.data?.message ?? e.message ?? "An error occurred";
      dispatch({
        type: TOAST_SHOW,
        payload: {
          message: message,
          severity: "error",
        },
      });
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (!token || !email) {
      router.replace("/auth/login");
    } else {
      setAllowed(true);
    }
  }, [router, router.isReady, token, email]);

  if (!allowed) return null;

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

      <CardWrapper sx={{ padding: "30px" }}>
        <TitleDescription
          title={t("setNewPassword") || "Set the New Password"}
          align="left"
          titleVariant="h2"
          descriptionVariant="p"
        />
        <Box
          ref={newPasswordFieldRef}
          sx={{ position: "relative", width: "100%", marginTop: "24px" }}
        >
          <InputField
            label={t("newPassword")}
            type={newPasswordShowPassword ? "text" : "password"}
            value={newPassword}
            autoComplete="off"
            onChange={handleNewPasswordChange}
            onFocus={handleNewPasswordFocus}
            onBlur={handleNewPasswordBlur}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !userState.loading &&
                newPassword &&
                newPasswordConfirm
              ) {
                e.preventDefault();
                handleSetNewPassword();
              }
            }}
            placeholder={t("newPasswordPlaceholder")}
            sideButton={true}
            sideButtonType="primary"
            sideButtonIcon={
              newPasswordShowPassword ? (
                <VisibilityOffIcon
                  sx={{
                    color: "#676768",
                    height: "18px",
                    width: "16px",
                  }}
                />
              ) : (
                <VisibilityIcon
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
              setNewPasswordShowPassword(!newPasswordShowPassword);
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
              password={newPassword}
              anchorEl={newPasswordFieldRef.current}
              open={newPasswordShowPasswordValidation}
              onClose={() => setNewPasswordShowPasswordValidation(false)}
              showOnMobile={newPasswordShowPasswordValidation}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "16px" }}>
          <InputField
            label={t("newPasswordConfirm")}
            type={newPasswordConfirmShowPassword ? "text" : "password"}
            value={newPasswordConfirm}
            autoComplete="off"
            onChange={handleNewPasswordConfirmChange}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !userState.loading &&
                newPassword &&
                newPasswordConfirm
              ) {
                e.preventDefault();
                handleSetNewPassword();
              }
            }}
            placeholder={t("newPasswordConfirmPlaceholder")}
            error={!!newPasswordConfirmError}
            helperText={
              newPasswordConfirmError
                ? newPasswordConfirmError.includes(" ")
                  ? newPasswordConfirmError
                  : t(newPasswordConfirmError)
                : ""
            }
            sideButton={true}
            sideButtonType="primary"
            sideButtonIcon={
              newPasswordConfirmShowPassword ? (
                <VisibilityOffIcon
                  sx={{
                    color: "#676768",
                    height: "18px",
                    width: "16px",
                  }}
                />
              ) : (
                <VisibilityIcon
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
              setNewPasswordConfirmShowPassword(
                !newPasswordConfirmShowPassword
              );
            }}
            showPasswordToggle={true}
          />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <CustomButton
            label={t("continue")}
            variant="primary"
            size={isMobile ? "small" : "medium"}
            fullWidth
            onClick={handleSetNewPassword}
          />
        </Box>
      </CardWrapper>
    </AuthContainer>
  );
};

export default ResetPasswordPage;
