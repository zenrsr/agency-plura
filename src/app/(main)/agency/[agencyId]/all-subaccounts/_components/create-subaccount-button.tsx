"use client";
import SubAccountDetails from "@/components/forms/subaccount-details";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import { Agency, AgencySidebarOption, SubAccount, User } from "@prisma/client";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
              SideBarOption: AgencySidebarOption[];
            })
        )
      | null;
  };
  id: string;
  className: string;
};

// const CreateSubAccountButton = ({ user, className, id }: Props) => {
//   const agencyDetails = user.Agency;
//   const { setOpen } = useModal();
//   if (!agencyDetails) return null;

//   return (
//     <Button
//       className={twMerge("w-full flex gap-4", className)}
//       onClick={() => {
//         setOpen(
//           <CustomModal
//             title="Create a Sub Account"
//             subheading="you can switch between the sub accounts you created"
//           >
//             <SubAccountDetails
//               userId={user.id}
//               agencyDetails={agencyDetails}
//               userName={user.name}
//             />
//           </CustomModal>
//         );
//       }}
//     >
//       <PlusCircleIcon size={15} />
//       Create a Sub Account
//     </Button>
//   );
// };

// export default CreateSubAccountButton;

export const CreateSubaccountButton = ({ className, id, user }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;
  if (!agencyDetails) return null;
  return (
    <Button
      className={twMerge("w-full flex gap-4 ", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Create a Sub Account"
            subheading="You can switch between your sub accounts"
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        );
      }}
    >
      <PlusCircleIcon size={16} />
      Create a Sub Account
    </Button>
  );
};
