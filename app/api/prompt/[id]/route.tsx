import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 0;
export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        const prompt = await prisma.prompts.findUnique({
            where: {
                id: params.id,
            },
            include: {
                creator: true,
            },
        });

        if (!prompt)
            return NextResponse.json(
                { message: "Prompt not found" },
                { status: 404 }
            );

        return NextResponse.json({ data: prompt }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch all prompts" },
            { status: 500 }
        );
    }
};

export const PATCH = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    const data = await req.json();

    try {
        const updatedPrompt = await prisma.prompts.update({
            data: {
                prompt: data.prompt,
                tag: data.tag,
            },
            where: {
                id: params.id,
            },
        });

        return NextResponse.json(
            {
                message: "Successfully update the Prompts",
                data: updatedPrompt,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch all prompts", detail: error },
            { status: 500 }
        );
    }
};

export const DELETE = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        await prisma.prompts.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json(
            { message: "Prompt deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch all prompts" },
            { status: 500 }
        );
    }
};
