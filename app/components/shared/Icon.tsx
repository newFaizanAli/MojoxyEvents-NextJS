import { IconName } from "@/app/types";
import { icons } from "../../utilities/icons";


interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
}

const Icon = ({ name, size = 18, color = "currentColor", style = {} }: IconProps) => {
    const LucideIcon = icons[name as keyof typeof icons];

    return <LucideIcon size={size} color={color} style={style} />;
};

export default Icon;