import React , {useState , useEffect , useRef} from 'react';
import { isEmpty } from 'lodash';


interface Config {
    options: { id: string; title: string }[];
    classes: string;
    label: string;
}

interface SelectWithLabelProps {
    config: Config;
    change: (data: { data: { id: string } }) => void;
    value: string;
    errorMsg?: string;
    isSort?: boolean;
}

interface SearchEvent extends React.ChangeEvent<HTMLInputElement> {}


const SelectWithLabel: React.FC<SelectWithLabelProps> = ({ config, change, value, errorMsg, isSort = true }) => {

    const elBtn = useRef<HTMLDivElement>(null);
    const el = useRef<HTMLDivElement>(null);

    let options = config.options;

    const [items , setItems] = useState(options);
    const [selectedItem , setSelectedItem] = useState<{ id: string; title: string }[]>([]);
    const [show , setShow] = useState(false);
    const [filteredItem , setFilteredItems] = useState(options);

    const showHandler = ()=>{   
        setShow(!show);
    }

    interface CloseEvent extends MouseEvent {
        target: Node;
    }

    const close = (e: MouseEvent) => {
        if (!isEmpty(el.current)) {
            if (!el.current.contains(e.target as Node) && elBtn.current && !elBtn.current.contains(e.target as Node)) {
                setShow(false);
            }
        }
    }


    const addChangeHandler = (id: string) => {
        change({ data: { id } });
        setShow(false);
    };

    useEffect(() => {

        let options2: { id: string; title: string }[] = [];
        let sortItem: { id: string; title: string }[] = [] ;

        if(options && options.length > 0){
            options2 = [...options] ;
        }

        if(isSort){

            sortItem =  options2.sort(function (a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });

            setItems(sortItem);

        }else{

            setItems(options2);

        }

    
        if(isSort){

            let selected = sortItem &&  sortItem.filter(item=>{
                if(value == item.id){
                    return true;
                }
            });
            setSelectedItem(selected);

        }else{

            let selected = options2 &&  options2.filter(item=>{
                if(value == item.id){
                    return true;
                }
            });
            setSelectedItem(selected);

        }  


        if(isSort){

            let noSelected = sortItem && sortItem.filter(item=>{
                if(value !== (item.id)){
                    return true;
                }
            });
            setFilteredItems(noSelected);

        }else{

            let noSelected = options2 && options2.filter(item=>{
                if(value !== (item.id)){
                    return true;
                }
            });
            setFilteredItems(noSelected);

        }  

        
        document.addEventListener("mousedown", close);
        return () => {
           document.removeEventListener("mousedown", close);
        }
    }, [value , options]);



    const searchHandler = (e: SearchEvent): void => {
        let noSelected = items.filter(item => {
            if (value !== item.id) {
                return true;
            }
            return false;
        });

        let filtered = noSelected.filter(item => {
            if (
                item.title.trim().startsWith(e.target.value) ||
                item.title.includes(e.target.value) ||
                item.title.includes(e.target.value.toUpperCase()) ||
                item.title.trim().startsWith(e.target.value.toUpperCase())
            ) {
                return true;
            }
            return false;
        });

        setFilteredItems(filtered);
    };



    return (
        <div className={` ${config.classes} h-full flex flex-col items-start gap-x-2 `}>
          
            <div className='w-full flex flex-col items-center gap-x-2'>
                <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-3">{config.label}</label>                              
                <div className={`w-full p-1 rounded-lg relative border bg-white-100 dark:bg-bgDark-100 ${errorMsg ? 'border-red-500' : 'border-gray-300 dark:border-bgDark-100'}`}>
                    <div className='flex items-center justify-between px-3 py-3 cursor-pointer hover:border-red-500 z-10' onClick={()=>showHandler()} ref={elBtn}>
                        <div className='flex justify-center items-center gap-2 overflow-x-auto'>

                            {
                                selectedItem && selectedItem.length > 0 ?  
                                (
                                    <>
                                    {
                                        selectedItem.map((item,index)=>(
                                            <span key={index} className=''>{item.title}</span>
                                        ))
                                    }
                                    </>
                                )
                                :
                                (
                                    <span className='text-gray-700 text-white-100'>
                                        انتخاب کنید
                                    </span>
                                )
                            } 
                        
                        </div> 
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-gray-600 dark:stroke-white w-4 h-4 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    
                    </div>
                    {
                        show ?
                        (
                            <div className='w-full absolute px-1 top-[60px] left-[0px] bg-white-100 dark:bg-bgDark-100 rounded-lg border border-gray-300 dark:border-bgDark-100 z-11 shadow-searchSelect' ref={el} >
                                <div className='flex items-center dark:bg-bgDark-100 rounded-3xl bg-gray-100 py-1 my-[10px] relative'>
                                        <input className='w-full h-full text-gray-600 dark:text-white-100 rounded-3xl bg-gray-100 dark:bg-cardDark-100 pr-[10px] py-1 text-[0.9rem] leading-800 font-dana outline-hidden focus:border-backgroundInput-100 ' type="text"  onChange={(e)=>searchHandler(e)}/>
                                        <button className='border-none w-[30px] bg-gray-100 dark:bg-bgDark-100 rounded-r-[40px] flex justify-center items-center' type="submit" value="Submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white-100 h-4 w-4 stroke-gray-500 dark:stroke-white-100" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                </div>
                                <div className='max-h-[200px] overflow-y-auto'>
                                {
                                    filteredItem  ? 

                                    filteredItem.map((item , index)=>(
                                        <div className='w-full flex justufy-center items-center hover:bg-gray-100  dark:hover:bg-dark-100 cursor-pointer px-3 py-1' key={index} onClick={()=>addChangeHandler(item.id)}>
                                            <span className={`text-[0.9rem] text-gray-600 dark:text-white-100`}>{item.title}</span>
                                        </div>

                                    ))
                                    :
                                    (
                                        <div className='flex items-center justify-center py-4'>
                                            <span className='w-fit text-gray-400 dark:text-white-100'>
                                            موردی برای انتخاب نیست 
                                            </span>
                                        </div>
                                    
                                    )

                                }
                        
                                </div>
                            
                        
                        </div>

                        ):
                        (
                            null
                        )
                    }
                </div>
            </div>
            {
                errorMsg ?
                (
                    <span className="text-sm text-red-500">
                    {errorMsg}
                    </span>
                )
                :
                (
                null
                )
            }

        </div>
    
    )
}

export default SelectWithLabel;