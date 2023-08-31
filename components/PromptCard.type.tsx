export type CreatorType = {
    id: string;
    email: string;
    username: string;
    image?: string;
};

export type PromptCardType = {
    id: string;
    creator: CreatorType;
    creatorId: string;
    prompt: string;
    tag: string;
};
