'use client'
import React , {useState , useEffect} from 'react';
import { useTheme } from "next-themes";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonLoadingProps {
    rows?: number;
    cols?: number;
    itemClasses?: string;
    containerClasses?: string;
}

const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ 
    rows = 1, 
    cols = 1, 
    itemClasses = '', 
    containerClasses = '' 
}) => {

    const [mounted, setMounted] = useState(false);

    const { theme } = useTheme();

    const rowsArr = Array(Number(rows)).fill('');
    const colsArr = Array(Number(cols)).fill('');

    const widthCol = ((1 / colsArr.length) * 100).toFixed(0);
    //console.log(widthCol);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // تا زمانی که مقدار `theme` از سمت کلاینت مقداردهی نشده، چیزی رندر نشود


    return (
        <SkeletonTheme 
            baseColor={theme === 'dark' ? '#202020' : '#ebebeb'} 
            highlightColor={theme === 'dark' ? '#444' : '#f5f5f5'}
        >
            <div className={`${containerClasses} w-full flex flex-col items-center justify-center mb-2`}>
                {rowsArr.map((_, rowIndex) => (
                    <div key={rowIndex} className="w-full flex items-center justify-center gap-x-3">
                        {colsArr.map((_, colIndex) => (
                            <div key={colIndex} className={`w-full ${itemClasses} mb-3`}>
                                <Skeleton className="w-full h-full" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonLoading;
