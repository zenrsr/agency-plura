import { getUserDetails } from "@/lib/queries";
import { de } from "date-fns/locale";
import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string; // most likely identifies the id of the subaccount but sure as hell doesn't identify the 'Agency'
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getUserDetails();
  if (!user) return null;
  if (!user.Agency) return null;
  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((subaccount) => {
          subaccount.id === id;
        });
  const isWhiteLabelAgency = user.Agency.whiteLabel;
  if (!details) return null;
  let sidebarLogo = user.Agency.agencyLogo || "/assets/plural-logo.svg";
  if (isWhiteLabelAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOpt =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];
  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        sidebarOpt={sidebarOpt}
        sidebarLogo={sidebarLogo}
        id={id}
        user={user}
        subAccounts={subaccounts}
      />
      {/* the below 'menuOptions' is for the mobile view */}
      <MenuOptions
        // defaultOpen={true}
        details={details}
        sidebarOpt={sidebarOpt}
        sidebarLogo={sidebarLogo}
        id={id}
        user={user}
        subAccounts={subaccounts}
      />
    </>
  );
};

export default Sidebar;
