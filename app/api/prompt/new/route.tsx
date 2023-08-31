import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const data = await req.json();

    try {
        const newPrompt = await prisma.prompts.create({
            data: {
                creatorId: data.userId,
                prompt: data.prompt,
                tag: data.tag,
            },
        });

        return NextResponse.json({ data: newPrompt }, { status: 201 });
    } catch (error) {
        console.log("1", error);
        return NextResponse.json(
            { message: "Failed to create a new prompt" },
            { status: 500 }
        );
    }
};
