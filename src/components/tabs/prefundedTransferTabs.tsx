import { useState, useEffect, useCallback } from 'react';
import { Tab, Tabs } from "@nextui-org/tabs";
//import { useGetPrefundedAccountBalance, useCreatePrefundedAccountTransfer } from '@/hooks/bridge/useBridge';
import pylon from '@/libs/pylon';
import { useBridgeBalance } from '@backpack-fux/pylon-sdk';

import AccountTab from "@/components/tabs/accountTab";
import DestinationTab from "@/components/tabs/destinationTab";
import ConfirmModal from "@/components/modals/confirmModal";
import { usePrefundedTransfer } from '@/hooks/bridge/usePrefundedTransfer';


export default function PrefundedTransferTabs() {
  const { balance, isLoading: balanceLoading, accountId, accountName } = useBridgeBalance({ pylonInstance: pylon });

  const {
    combinedData,
    handleSetValues,
    handleSubmit,
    handleConfirmTransfer,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    isSubmitting,
    selectedTab,
    setSelectedTab,
  } = usePrefundedTransfer(accountId);



  // const handleSetValues = (data: any) => {
  //   setCombinedData((prev: any) => ({ ...prev, ...data }));
  //   setSelectedTab("destination");
  // };

  // const handleSubmit = (data: any) => {
  //   setCombinedData((prev: any) => ({ ...prev, ...data }));
  //   setIsConfirmModalOpen(true);
  // };

  // const handleConfirmTransfer = useCallback(async () => {
  //   if (combinedData) {
  //     await createTransfer(combinedData);
  //     setIsConfirmModalOpen(false);
  //     // Reset form or navigate to a success page
  //   }
  // }, [combinedData, createTransfer]);

  const tabs = [
    {
      id: "account",
      label: "Account",
      content: <AccountTab accountId={accountId} handleSetValues={handleSetValues} />,
    },
    {
      id: "destination",
      label: "Destination",
      content: <DestinationTab handleSubmit={handleSubmit} />,
    },
  ];

  return (
    <>

        <Tabs
          aria-label="Transfer options"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} title={tab.label}>
              {tab.content}
            </Tab>
          ))}
        </Tabs>
        {combinedData && (
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            combinedData={combinedData}
            accountName={accountName}
            onConfirm={handleConfirmTransfer}
            isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}