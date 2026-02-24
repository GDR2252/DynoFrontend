import ProfilePage from "@/Components/Page/Profile/ProfilePage";
import useTokenData from "@/hooks/useTokenData";
import { pageProps } from "@/utils/types";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Profile = ({ setPageName, setPageDescription }: pageProps) => {
  const tokenData = useTokenData();
  const namespaces = ["profile", "common"];
  const { t } = useTranslation(namespaces);
  const tProfile = useCallback((key: string) => t(key, { ns: "profile" }), [t]);
  useEffect(() => {
    if (setPageName && setPageDescription) {
      setPageName(tProfile("profile"));
      setPageDescription("");
    }
  }, [setPageName, setPageDescription, tProfile]);

  return <>{tokenData && <ProfilePage tokenData={tokenData} />}</>;
};

export default Profile;
