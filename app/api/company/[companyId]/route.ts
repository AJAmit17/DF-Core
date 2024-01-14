import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";


export async function PATCH(
  req: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.companyId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.company.updateMany({
      where: {
        id: params.companyId,
        userId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.companyId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.company.deleteMany({
      where: {
        id: params.companyId,
        userId
      }
    });
  
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
