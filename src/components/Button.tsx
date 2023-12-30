import { IconType } from "react-icons";

// Defining the props that the Button component can accept
interface ButtonProps {
    label: string;
    disabled?: boolean;
    small?: boolean;
    custom?: string;
    icon?: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Defining the Button component using React.FC (functional component)
const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    small,
    custom,
    icon: Icon,
    onClick
}) => {
    return (
        <button
            disabled={disabled}
            className={`disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-tr from-[#e90b78] to-[#f06e52] rounded-md hover:opacity-90 w-full flex items-center justify-center gap-2 ${small ? 'text-sm font-light' : 'text-md font-semibold'} ${small ? 'py-1 px-2' : 'py-3 px-4'} ${custom ? custom : ""}`}
        >
            {Icon && <Icon size={24} />}
            {label}
        </button>
    )
}

export default Button