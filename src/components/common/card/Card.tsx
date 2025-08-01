import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  classes?: string
}

const Card = ({ title, children , classes }: CardProps) => {
  return (
    <div className={`${classes} p-8 bg-white-100 dark:bg-cardDark-100 flex flex-col justify-center items-center rounded-md`}>
      {
        title !== '' ?
        (
          <span className="mb-5 text-[1.2rem] font-bold text-textPrimary-100 dark:text-white-100">
            {title}
          </span>
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

export default Card;
