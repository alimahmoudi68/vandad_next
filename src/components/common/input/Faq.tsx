import SimpleInputWithLabel from "./SimpleInputWithLabel";

interface Config {
  classes: string;
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
}

interface FaqProps {
  config: Config;
  change: (
    args:
      | {
          event: React.ChangeEvent<HTMLInputElement>;
          indexItem: number;
          fieldName: string;
        }
      | {
          type: 'addFaq' | 'removeFaq';
          indexItem?: number;
        }
  ) => void;
  value: {
    question: string,
    answer: string,
    errs: {
      question: string,
      answer: string,
    },
  }[];
}

const Faq: React.FC<FaqProps> = (props) => {
  let { config, change, value } = props;


  const addFaqHandler = () =>{
    change({ type: 'addFaq' })
  }
  

  return (
    <div
      className={` ${config.classes} flex flex-col items-center gap-x-2`}
    >
      <div className="w-full flex items-center gap-x-2">
        {config.label !== "" ? (
          <label className="min-w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center">
            {config.label}
          </label>
        ) : null}
      </div>

      
      <div className="w-full flex flex-wrap gap-3">
        {
          value && value.map((item , index)=>(
            <div className="w-full text-gray-600 flex flex-wrap gap-x-[10px] border px-5 pt-5 pb-10 gap-y-5 items-start justify-between rounded-lg relative" key={index}>
                  <SimpleInputWithLabel
                  classes='' 
                  config = {{
                    label : 'سوال',
                    name : 'question'
                  }}
                  change = {(e)=>change({ event: e, indexItem:index , fieldName: 'question' })}
                  value = {item.question}
                  errorMsg = {item.errs.question}
                  />
                  <SimpleInputWithLabel
                  classes='' 
                  config = {{
                    label : 'جواب',
                    name : 'answer'
                  }}
                  change = {(e)=>change({ event: e, indexItem: index, fieldName: 'answer' })}
                  value = {item.answer}
                  errorMsg = {item.errs.answer}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-[24px] h-[24px] absolute top-0 left-0 stroke-gray-500 hover:stroke-primary-100 cursor-pointer duration-300" onClick={()=>change({ type: 'removeFaq', indexItem: index })}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

            </div>
          ))
        }
      </div>
     

      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" 
      className="w-[24px] h-[24px] mt-3 stroke-gray-500 hover:stroke-primary-100 cursor-pointer duration-300" 
      onClick={()=>addFaqHandler()}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      

    </div>
  );
};

export default Faq;
