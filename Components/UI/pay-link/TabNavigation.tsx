import React from "react";
import { Box } from "@mui/material";
import {
    TabContainer,
    TabItem,
} from "../../Page/CreatePaymentLink/styled";
import { TabNavigationProps } from "@/utils/types/paymentLink";

const TabNavigation: React.FC<TabNavigationProps> = React.memo(
    ({ activeTab, onChange, tPaymentLink, hasPaymentLinkData }) => {
        if (hasPaymentLinkData) return null;
        return (
            <Box>
                <TabContainer>
                    <TabItem onClick={() => onChange(0)} active={activeTab === 0}>
                        <p>{tPaymentLink("paymentSettings")}</p>
                    </TabItem>
                    <TabItem onClick={() => onChange(1)} active={activeTab === 1}>
                        <p>{tPaymentLink("postPaymentSettings")}</p>
                    </TabItem>
                </TabContainer>
            </Box>
        );
    },
);
TabNavigation.displayName = 'TabNavigation';

export default TabNavigation;
