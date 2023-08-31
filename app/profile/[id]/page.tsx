"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import ProfileHeader from "@/components/ProfileHeader";
import { PromptCardType } from "@/components/PromptCard.type";
import PromptCardList from "@/components/PromptCardList";
import Loading from "../loading";

const UserProfile = ({ params }: { params: { id: string } }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get("n");

    const [userPosts, setUserPosts] = useState<PromptCardType[]>([]);

    return (
        <section className="w-full">
            <ProfileHeader
                name={userName}
                desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            />
            <Suspense fallback={<Loading />}>
                <PromptCardList
                    id={params?.id}
                    handleEdit={undefined}
                    handleDelete={undefined}
                />
            </Suspense>
        </section>
    );
};

export default UserProfile;
