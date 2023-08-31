import { prisma } from "@/utils/prisma";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const prompts = await prisma.prompts.findMany({
            include: {
                creator: true,
            },
        });

        return NextResponse.json(prompts, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Failed to fetch all prompts" },
            { status: 500 }
        );
    }
};
