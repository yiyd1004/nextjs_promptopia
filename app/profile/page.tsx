"use client";

import ProfileHeader from "@/components/ProfileHeader";
import { PromptCardType } from "@/components/PromptCard.type";
import PromptCardList from "@/components/PromptCardList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleEdit = (post: PromptCardType) => {
        router.push(`/update-prompt?id=${post.id}`);
    };
    const handleDelete = async (post: PromptCardType) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post.id}`, {
                    method: "DELETE",
                    cache: "no-store",
                    next: { revalidate: 0 },
                });
                router.refresh();
            } catch (error) {
                console.log("3", error);
            }
        }
    };

    return (
        <section className="w-full">
            <ProfileHeader
                name="My"
                desc="Welcome to your personalized profile page"
            />
            <Suspense fallback={<Loading />}>
                <PromptCardList
                    id={session?.user.id!}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </Suspense>
        </section>
    );
};

export default MyProfile;
