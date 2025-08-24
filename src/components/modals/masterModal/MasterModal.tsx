import { useEffect } from "react";

interface MasterModalProps {
  children: React.ReactNode;
  close: () => void;
  title: string;
  isWide? : boolean
  noPadding?: boolean
}

const MasterModal: React.FC<MasterModalProps> = ({ noPadding, children, close ,title , isWide = false }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bgModal-100 dark:bg-bgModalDark-200" onClick={handleBackgroundClick}>
      <div 
        className={`${noPadding ? "p-0" : "p-10 bg-white-100 dark:bg-cardDark-100"} w-4/5 h-fit ${isWide ? 'max-w-[1200px]' : 'max-w-[650px]' } rounded-lg shadow-lg relative`}
        style={{ maxHeight: '90vh', overflowY: 'auto', overscrollBehavior: 'contain' }}
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن مودال هنگام کلیک داخل آن
      > 
        {
        !noPadding ?
        (
          <p className="w-full font-bold text-textprimary-100 dark:text-white-100 text-[1.2rem] mb-4 text-center">{title}</p>
        ) 
        :
        (null)
        }   

        {children}
      </div>
    </div>
  );
};

export default MasterModal;
