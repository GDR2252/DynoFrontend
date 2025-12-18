import ApiKeysPage from "@/Components/Page/API/ApiKeysPage";
import { pageProps } from "@/utils/types";
import CustomButton from "@/Components/UI/Buttons";
import { AddRounded } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useIsMobile from "@/hooks/useIsMobile";

const APIs = ({ setPageName, setPageDescription, setPageAction }: pageProps) => {
  const namespaces = ["apiScreen", "common"];
  const isMobile = useIsMobile("md");
  const { t } = useTranslation(namespaces);
  const tApi = useCallback(
    (key: string, defaultValue?: string) =>
      t(key, { ns: "apiScreen", defaultValue }),
    [t]
  );

  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    if (setPageName && setPageDescription) {
      setPageName(tApi("apiKeysTitle", "API Keys"));
      setPageDescription(
        tApi(
          "apiKeysDescription",
          "Manage API keys for integrating DynoPay into your applications"
        )
      );
    }
  }, [setPageName, setPageDescription, tApi]);

  useEffect(() => {
    if (!setPageAction) return;
    setPageAction(
      <CustomButton
        label={isMobile ? tApi("createKeyMobile") : tApi("createNewKey")}
        variant="primary"
        size="medium"
        endIcon={<AddRounded />}
        onClick={() => setOpenCreate(true)}
        sx={{ height: 40, px: 2.5 }}
      />
    );
    return () => setPageAction(null);
  }, [setPageAction, tApi ,isMobile]);

  return (
    <>
      <ApiKeysPage openCreate={openCreate} setOpenCreate={setOpenCreate} />
    </>
  );
};

export default APIs;
