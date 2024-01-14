import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/Navbar'
import prismadb from '@/lib/prisma';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { companyId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.company.findFirst({ 
    where: {
      id: params.companyId,
      userId,
    }
   });

  if (!store) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
