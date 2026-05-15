import { useState } from "react";
import { Category } from "@/app/types";
import { AppImage } from "../../shared";
import { H3 } from "../../shared/Typography";

interface CategoryCardProps {
    category: Category;

}

const CategoryCard = ({ category, }: CategoryCardProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`
    flex flex-col items-center gap-3 text-center cursor-pointer
    rounded-lg border-2 px-6 py-7
    transition-all duration-200 ease-in-out
    ${hovered
                    ? "bg-gray-50 border-gray-300 shadow-[0_8px_24px_rgba(0,0,0,0.08)] -translate-y-1"
                    : "bg-white border-gray-200 shadow-sm"
                }
  `}
        >
            <div
                className="
    relative flex items-center justify-center
    w-26 h-24
    overflow-hidden rounded-xl
    bg-gray-100
  ">
                <AppImage
                    src={category.img_link as string}
                    alt={category.name}

                />
            </div>
            <H3 useTiltNeon className="text-lg">{category.name}</H3>
        </div>
    );
};

export default CategoryCard;