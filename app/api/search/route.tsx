import { prisma } from "@/utils/prisma";

export const runtime = "edge";
export const revalidate = 0;
export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const prompts = await prisma.prompts.findMany({
        where: {
            OR: [
                {
                    prompt: {
                        contains: searchParams.get("q")!,
                        mode: "insensitive",
                    },
                },
                {
                    creator: {
                        OR: [
                            {
                                email: {
                                    contains: searchParams.get("q")!,
                                    mode: "insensitive",
                                },
                            },
                            {
                                username: {
                                    contains: searchParams.get("q")!,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    },
                },
            ],
        },
        include: {
            creator: true,
        },
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
};
