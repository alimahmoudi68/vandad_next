import React , {useRef} from 'react';

interface Config {
    list: { id: string; title: string }[];
    classes: string;
}

interface GroupCheckboxProps {
    value: string[];
    change: (id: string) => void;
    config: Config;
}

const GroupCheckbox: React.FC<GroupCheckboxProps> = ({ value, change, config }) => {

    let animationEl = useRef<HTMLSpanElement>(null);

    const changeCheck = (id: string): void => {
        change(id);
        animationEl?.current?.classList.remove('hidden');
        setTimeout(() => {
            if (animationEl) {
                animationEl?.current?.classList.add('hidden');
            }
        }, 800);
    }

    const isItemChacked = (id: string): boolean => {
        return value.includes(id);
    }

    
    return (
        <>
        {
            config.list.map((item)=>(
                <div key={item.id} className={`${config.classes} flex justify-start items-center gap-x-2`}>
                    <span className='w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center'>
                        {item.title}
                    </span>
                    <div className={`w-[20px] h-[20px] border border-gray-200 cursor-pointer flex items-center justify-center rounded-md ${isItemChacked(item.id) ? 'bg-primary-100' : ''}`}  onClick={()=>changeCheck(item.id)} >
                        
                        <span ref={animationEl} className={`animate-ping absolute inline-flex h-[25px] w-[25px] rounded-full opacity-75 hidden`}></span>
        
                        {
                            isItemChacked(item.id)  ?
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
        </>
    )
}

export default GroupCheckbox;