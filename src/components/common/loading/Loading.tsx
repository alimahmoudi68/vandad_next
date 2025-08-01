import ScaleLoader from "react-spinners/ScaleLoader";

interface LoadingProps {
    classes: string;
}

interface ScaleLoaderProps {
    height: number;
    width: number;
    color: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
    const scaleLoaderProps: ScaleLoaderProps = {
        height: 20,
        width: 3,
        color: "#FC427B",
    };

    return (
        <div className={`${props.classes} flex justify-center items-center`}>
            <ScaleLoader {...scaleLoaderProps} />
        </div>
    );
};

export default Loading;
