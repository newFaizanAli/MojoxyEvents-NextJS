import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

type AppImageProps = Omit<ImageProps, "style"> & {
    className?: string;
    imageStyle?: CSSProperties;
};

const AppImage = ({
    className = "",
    src,
    alt,
    sizes = "",
    fill = true,
    unoptimized = true,
    priority = false,
    imageStyle,
    ...props
}: AppImageProps) => {

    return src ? (

        <Image
            className={className}
            sizes={sizes}
            src={src}
            alt={alt}
            fill={fill}
            unoptimized={unoptimized}
            priority={priority}
            style={{
                objectFit: "cover",
                opacity: 0.85,
                ...imageStyle,
            }}
            {...props}
        />
    ) :
        (
            <div className="flex items-center justify-center w-full h-full bg-gray-800">
                <span className="text-white">No Image</span>
            </div>
        );
};

export default AppImage;