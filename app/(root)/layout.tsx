import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prisma';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const company = await prismadb.company.findFirst({
    where: {
      userId,
    }
  });

  if (company) {
    redirect(`/${company.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
