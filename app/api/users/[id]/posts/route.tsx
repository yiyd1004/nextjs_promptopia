import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const revalidate = 0;
export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        const prompts = await prisma.prompts.findMany({
            where: {
                creatorId: params.id,
            },
            include: {
                creator: true,
            },
        });

        // await new Promise((resolve) => setTimeout(resolve, 2000));
        return NextResponse.json({ data: prompts }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch all prompts" },
            { status: 500 }
        );
    }
};
