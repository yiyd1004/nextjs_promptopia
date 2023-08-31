import Image from "next/image";

const Loading = () => {
    return (
        <div className="mt-16 w-full flex-center">
            <Image
                src="/assets/icons/loader.svg"
                width={50}
                height={50}
                alt="loader"
                className="object-contain"
            />
        </div>
    );
};

export default Loading;
