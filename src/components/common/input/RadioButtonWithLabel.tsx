import React , {useRef} from 'react';

interface Config {
    classes: string;
    label: string;
    options: { title: string; value: string | number }[];
}

interface RadioButtonWithLabelProps {
    value: string | number;
    change: (val: string | number) => void;
    config: Config;
}

const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({ value, change, config }) => {

    let animationEl = useRef<HTMLSpanElement | null>(null);

    const changeCheck = (val: string | number): void => {
        change(val);
        animationEl?.current?.classList.remove('hidden');
        setTimeout(() => {
            if (animationEl) {
                animationEl?.current?.classList.add('hidden');
            }
        }, 800);
    }

    return (
        <div className={`${config.classes} flex flex-col justify-start items-center gap-x-2`}>


            <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-3">{config.label}</label>

            <div className='w-full flex flex-col gap-y-3'>

                {
                    config.options.map((item , index)=>(
                        
                        <div key={index} className='flex items-center gap-x-2'>

                            <span className='w-[100px] text-[0.8rem] min-[500px]:text-[1rem] text-center'>
                                {item.title}
                            </span>

                            <div className={`w-[20px] h-[20px] border border-gray-200 cursor-pointer flex items-center justify-center rounded-md ${value == item.value ? 'bg-primary-100' : ''}`}  onClick={()=>changeCheck(item.value)} >
                                
                                <span ref={animationEl} className={`animate-ping absolute inline-flex h-[25px] w-[25px] rounded-full opacity-75 hidden`}></span>

                                {
                                    value == item.value  ?
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

                    ))
                }



            </div>

        </div>
    
    )
}

export default RadioButtonWithLabel;