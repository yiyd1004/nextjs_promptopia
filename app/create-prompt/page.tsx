"use client";

import Form from "@/components/Form";
import { post } from "@/types/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<post>({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id,
                    tag: post.tag,
                }),
                cache: "no-store",
                next: { revalidate: 0 },
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log("2", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;
