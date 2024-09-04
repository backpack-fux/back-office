import { Tab, Tabs } from "@nextui-org/tabs";

import { useBridgeAccount } from "@/hooks/useBridgeBalance";
import { usePrefundedTransfer } from "@/hooks/usePrefundedTransfer";

import ConfirmModal from "../modals/confirmModal";

import AccountTab from "./accountTab";
import DestinationTab from "./destinationTab";

export default function PrefundedTransferTabs() {
  const { isLoading, accountName, accountId } = useBridgeAccount();
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

  const tabs = [
    {
      id: "account",
      label: isLoading
        ? "Account"
        : `PFA ${accountName.charAt(0).toUpperCase()}${accountName.slice(1)}`,
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
      <ConfirmModal
        accountName={accountName}
        combinedData={combinedData}
        isOpen={isConfirmModalOpen}
        isSubmitting={isSubmitting}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmTransfer}
      />
    </>
  );
}
