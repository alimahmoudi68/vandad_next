"use client";
import React , {useState , useEffect , useRef} from "react";
import { isEmpty } from 'lodash';


export default function Filter({ filters:allFilters , title , name , options , changeFilters}) {

    const elBtn = useRef();
    const el = useRef();

    const [show , setShow] = useState(false);
    const [filters , setFilters] = useState(allFilters);
    const [filteredOptions , setFilterdOption] = useState(options);


    useEffect(()=>{
        setFilters(allFilters);
    } , [allFilters]);


    const showHandler = ()=>{   
        setShow(!show);
    }

    const close = (e) => {
        if (!isEmpty(el.current)) {
            if (!el.current.contains(e.target) && !elBtn.current.contains(e.target)) {
                setShow(false);
            }
        }
    }

    useEffect(()=>{
        document.addEventListener("mousedown", close);
        return () => {
           document.removeEventListener("mousedown", close);
        }
    }, []);


    const searchOptionHandler = (key)=>{
        let newOptions = [...options];
        newOptions = options.filter(opt =>{
            if( 
            
                opt.title.trim().startsWith(key) ||
                opt.title.includes(key) ||
                opt.title.includes(key.toUpperCase()) ||
                opt.title.trim().startsWith(key.toUpperCase())
                
            ){
                return true;
            }else{
                return false;
            }
        });

        //console.log('newOptions' ,  newOptions )
        setFilterdOption(newOptions);
    }


    const isFilterItemSelected = (item)=>{

        let status = false;
        filters.map(filter=>{
            if(filter.name == name && filter.values.includes(item)){
                status = true;
            }
        });
        return status;
    }

    const changeFilterHandler = (item)=>{

        let filersThemp = [...filters];

        if(filersThemp.some(f=>f.name == name)){

            filersThemp = filersThemp.map(filter=>{
                if(filter.name == name){
                    let newValues = [...filter.values];
                    if(filter.values.includes(item)){
                        newValues = filter.values.filter(f=>f !==item)
                    }else{
                        newValues.push(item);
                    }
    
                    return{
                        name ,
                        values : newValues
                    }
    
                }else{
                    return filter
                }
    
            });

        }else{
            filersThemp.push({
                name , 
                values : [item]
            })
        }


        setFilters(filersThemp);

    }


    const sendFiltersHandler = ()=>{
        changeFilters(filters);
        setShow(false);
    }


    const removeAllFiltersHanlder = ()=>{
        
        let filersThemp = [...filters];

        filersThemp = filersThemp.map(filter=>{
            if(filter.name == name){
                return{
                    name ,
                    values : []
                }
            }else{
                return filter
            }
        });
        setFilters(filersThemp);
        changeFilters(filersThemp);
    }


    return (
    <div className="bg-white-100 rounded-md relative">
        <div className="flex gap-x-[40px] justify-between items-center px-3 py-2 cursor-pointer border border-primaryText-100 rounded-md" onClick={showHandler} ref={elBtn}>
            <span>{title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`stroke-gray-600 duration-[200ms] w-4 h-4 ${show ? 'rotate-[180deg]' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
        {
            show ?
            (
                <div className="w-[300px] absolute bg-white-100 top-[50px] right-0 px-4 pb-4 border border-primaryText-100 rounded-md" ref={el}>
                    <div className='flex items-center dark:bg-dark-100 rounded-3xl bg-gray-100 py-1 my-[10px] relative'>
                        <input className='w-full h-full text-gray-600 dark:text-white-100 rounded-3xl bg-gray-100 dark:bg-dark-100 pr-[10px] py-1 text-[0.9rem] leading-800 font-dana outline-none focus:border-backgroundInput-100'  type="text"  onChange={(e)=>searchOptionHandler(e.target.value)}/>
                        <button className='border-none w-[30px] bg-gray-100 dark:bg-dark-100 rounded-r-[40px] flex justify-center items-center' type="submit" value="Submit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white-100 h-4 w-4 stroke-gray-500 dark:stroke-white-100" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-y-2 mb-2">
                    {
                        filteredOptions && filteredOptions.map(item=>(
                            <div key={item.value} className="w-fit flex gap-x-2 items-center cursor-pointer" onClick={()=>changeFilterHandler( item.value )}>
                                <div className={`w-4 h-4 border border-primaryText-100 ${isFilterItemSelected(item.value) ? "bg-primary-100" : ""} rounded-[5px]`}>
                                    { isFilterItemSelected(item.value) ?
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
                                <span className="text-primaryText-100">
                                    {item.title}
                                </span>

                            </div>
                        ))
                    }
                    </div>
                    <div className="w-full items-center flex justify justify-between">
                        <div className="w-[calc(50%-5px)] bg-primary-100 px-2 py-1 text-center text-white-100 rounded-[3px] cursor-pointer hover:opacity-80" onClick={sendFiltersHandler}>اعمال</div>
                        <div className="w-[calc(50%-5px)] border px-2 py-1 text-center rounded-[3px] cursor-pointer hover:opacity-80" onClick={removeAllFiltersHanlder}>حذف فیلترها</div>
                    </div>
                </div>
            )
            :
            (
                null
            )

        }
        

    </div>

    );
}
