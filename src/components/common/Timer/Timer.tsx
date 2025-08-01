import React , {useState, useEffect} from 'react';

interface TimerProps {
    finish: () => void;
}

const Timer: React.FC<TimerProps> = (props) => {
    const [second, setSecond] = useState<string>('00');
    const [minute, setMinute] = useState<string>('02');
    const [counter, setCounter] = useState<number>(120);

    useEffect(() => {
        let t = setInterval(function() { 
            const secondCounter = counter % 60;
            const minuteCounter = Math.floor(counter / 60);
    
            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : String(secondCounter);
            const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : String(minuteCounter);
    
            setSecond(computedSecond);
            setMinute(computedMinute);
    
            setCounter(counter => counter - 1);
            if(counter < 0){
                clearInterval(t);
                setCounter(10);
                props.finish();
            }
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearInterval(t);
    }, [counter, props]);

    return(
        <div className='text-align-right text-[0.8rem] my-2'>
            <span>{minute}</span><span>:</span><span>{second}</span>
        </div>
    )
}

export default Timer;