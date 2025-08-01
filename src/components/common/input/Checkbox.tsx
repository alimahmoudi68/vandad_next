import React , {useRef} from 'react';

interface CheckboxProps {
    value: boolean;
    change: () => void;
    config: {
        classes: string;
        label: string;
    };
}

const Checkbox: React.FC<CheckboxProps> = ({ value, change, config }) => {

    let animationEl = useRef<HTMLSpanElement>(null);

    const changeCheck = ()=>{
        change();
        animationEl?.current?.classList.remove('hidden');
        setTimeout(()=>{
            if(animationEl){
                animationEl?.current?.classList.add('hidden');
            }
        } , 800)
    }

    
    return (
        <div className={`${config.classes} flex justify-start items-center my-5 gap-x-2`}>

            <span className='text-[0.8rem] min-[500px]:text-[1rem]'>
                {config.label}
            </span>

            <div className={`w-[20px] h-[20px] border border-gray-200 dark:border-bgDark-100 cursor-pointer flex items-center justify-center rounded-md ${value ? 'bg-primary-100' : 'bg-white-100 dark:bg-bgDark-100'}`}  onClick={changeCheck} >
                
                <span ref={animationEl} className={`animate-ping absolute inline-flex h-[25px] w-[25px] rounded-full opacity-75 hidden`}></span>

                {
                    value  ?
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-4 h-4 stroke-white-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    )
                    :
                    (
                        null
                    )
                }

            </div>
        </div>
    
    )
}

export default Checkbox;