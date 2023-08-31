const ProfileHeader = ({
    name,
    desc,
}: {
    name: string | null;
    desc: string;
}) => {
    return (
        <>
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc text-left">{desc}</p>
        </>
    );
};

export default ProfileHeader;
