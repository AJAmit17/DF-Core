import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params
}: {
  params: {
    companyId: any;
}
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.company.findFirst({
    where: {
      id: params.companyId,
      userId
    }
  });

  if (!store) {
    redirect('/');
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

export default SettingsPage;
