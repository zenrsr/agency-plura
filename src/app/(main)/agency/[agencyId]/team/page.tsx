import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import DataTable from "./data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import SendInvitation from "@/components/forms/send-invitation";

type Props = {
  params: { agencyId: string };
};

const TeamPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  const teamMember = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId
      }
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } }
    }
  });
  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: { id: params.agencyId },
    include: {
      SubAccount: true
    }
  });
  if (!agencyDetails) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      columns={columns}
      filterValue="hehe"
      data={teamMember}
    ></DataTable>
  );
};

export default TeamPage;
