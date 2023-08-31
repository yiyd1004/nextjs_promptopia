"use client";

import Form from "@/components/Form";
import { post } from "@/types/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<post>({
        prompt: "",
        tag: "",
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`, {
                cache: "no-store",
            });
            const data = await res.json();

            setPost({
                prompt: data.data.prompt,
                tag: data.data.tag,
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert(`Prompt ID not found`);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
                cache: "no-store",
            });

            if (response.ok) {
                router.push("/profile");
            }
        } catch (error) {
            console.log("4", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;
