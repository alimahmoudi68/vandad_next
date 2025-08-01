import React , {useState} from 'react';
import ScaleLoader  from "react-spinners/ScaleLoader";
import { useRouter } from 'next/navigation';


interface ButtonProps {
    disabled?: boolean;
    classes?: string;
    click?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    children: React.ReactNode;
    type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = (props) => {
    const [isHover, setIsHover] = useState(false);
    const router = useRouter();

    return (
        <button 
        type={props.type || 'button'}
        className={`${props.disabled ? 'bg-zinc-300' : 'cursor-pointer'} ${props.classes} rounded-md flex items-center transition duration-300 font-semibold justify-center items-center relative hover:opacity-80 outline-hidden px-3 py-2 bg-primary-100 text-white-100`} 
        onClick={(e) => {
            if (!props.disabled && props.click) {
                props.click(e);
            }
        }} disabled={props.disabled}>
            {props.loading ?
                (
                    <ScaleLoader height={20} width={3} color={"#fff"} className="mr-2" />
                )
                :
                (
                    props.children
                )
            }
        </button>
    )
}

export default Button;