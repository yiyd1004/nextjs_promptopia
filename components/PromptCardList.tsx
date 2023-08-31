import PromptCard from "./PromptCard";
import { PromptCardType } from "./PromptCard.type";

const fetchPosts = async (id: string): Promise<PromptCardType[]> => {
    const url = `/api/users/${id}/posts`;
    const res = await fetch(url, { cache: "no-store" });
    const post = await res.json();
    if (res.ok) {
        return post.data;
    } else {
        return [];
    }
};

const PromptCardList = async ({
    id,
    handleEdit,
    handleDelete,
}: {
    id: string;
    handleEdit?: (post: PromptCardType) => void;
    handleDelete?: (post: PromptCardType) => Promise<void>;
}) => {
    if (!id) {
        return;
    }

    const posts = await fetchPosts(id);

    return (
        <div className="mt-16 prompt_layout">
            {posts.map((post: PromptCardType) => {
                return (
                    <PromptCard
                        key={post.id}
                        post={post}
                        handleTagClick={undefined}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                );
            })}
        </div>
    );
};

export default PromptCardList;
