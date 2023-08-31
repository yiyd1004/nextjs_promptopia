"use client";

import Loading from "@/app/profile/loading";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PromptCard from "./PromptCard";
import { PromptCardType } from "./PromptCard.type";

const PromptCardList = ({
    posts,
    handleTagClick,
}: {
    posts: PromptCardType[];
    handleTagClick?: (tag: string) => void;
}) => {
    return (
        <div className="mt-16 prompt_layout">
            {posts.map((post: PromptCardType) => {
                return (
                    <PromptCard
                        key={post.id}
                        post={post}
                        handleTagClick={handleTagClick}
                        handleEdit={undefined}
                        handleDelete={undefined}
                    />
                );
            })}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    const performSearch = async () => {
        setLoading(true);
        const res = await fetch(`/api/search?q=${searchText}`, {
            cache: "no-store",
        });
        const data = await res.json();

        if (res.ok) {
            setPosts(data);
        } else {
            toast.error("Error occurred!!!");
        }
        setLoading(false);
    };
    const handleTagClick = (tag: string) => {
        setSearchText(tag);
        performSearch();
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        performSearch();
    };

    useEffect(() => {
        (async () => {
            setLoading(true);

            const res = await fetch("/api/prompt", { cache: "no-store" });
            const data = await res.json();

            if (res.ok) {
                setPosts(data);
            } else {
                setPosts([]);
            }
            setLoading(false);
        })();
    }, []);

    return (
        <section className="feed">
            <form
                className="relative w-full flex-center"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            {loading ? (
                <Loading />
            ) : (
                <PromptCardList posts={posts} handleTagClick={handleTagClick} />
            )}
        </section>
    );
};

export default Feed;
