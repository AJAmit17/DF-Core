import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prisma';
 
export async function POST(
  req: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!params.companyId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.company.findFirst({
      where: {
        id: params.companyId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        companyId: params.companyId,
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    if (!params.companyId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        companyId: params.companyId
      }
    });
  
    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
