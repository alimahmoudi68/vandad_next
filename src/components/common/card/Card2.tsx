import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  classes?: string
}

const Card2 = ({ title, children , classes }: CardProps) => {
  return (
    <div className={`${classes} p-4 md:p-8 bg-white-100 dark:bg-cardDark-100 flex flex-col justify-center items-center rounded-md`}>
      {
        title !== '' ?
        (
          <div className="w-full flex gap-x-2 items-center mb-5">
            <div className="w-[16px] h-[16px] bg-primary-100 rounded-full"></div>
            <span className="text-[1.3rem] font-bold text-primary-100">
              {title}
            </span>
          </div>
        )
        :
        (
          null
        )
      }
      {children}
    </div>
  );
};

export default Card2;
