"use client"

import { IconType } from "react-icons";

// Defining the props that the Button component can accept
interface ButtonProps {
    label: string;
    disabled?: boolean;
    small?: boolean;
    custom?: string;
    gradient?: boolean;
    icon?: IconType;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Defining the Button component using React.FC (functional component)
const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    small,
    custom,
    gradient,
    icon: Icon,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`disabled:opacity-70 disabled:cursor-not-allowed ${gradient ? "bg-gradient-to-tr from-[#e90b78] to-[#f06e52] hover:from-[#f06e52] hover:to-[#e90b78]" : ""} hover:opacity-80 rounded-full gap-2 ${small ? 'text-sm font-light' : 'text-md font-semibold'} ${small ? 'py-1 px-2' : 'py-3 px-4'} ${custom ? custom : ""} ease-linear transition-all duration-150`}
        >
            {Icon && <Icon size={24} />}
            {label}
        </button>
    )
}

export default Button;