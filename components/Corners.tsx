export default function Corners() {
    return (
        <>
            <span className="absolute z-10 top-0 left-0 -translate-y-1/2 w-0 h-0 border-8 border-transparent border-l-border transition-colors duration-500"></span>
            <span className="absolute z-10 top-0 right-0 -translate-y-1/2 w-0 h-0 border-8 border-transparent border-r-border transition-colors duration-500"></span>
            <span className="absolute z-10 bottom-0 left-0 translate-y-1/2 w-0 h-0 border-8 border-transparent border-l-border transition-colors duration-500"></span>
            <span className="absolute z-10 bottom-0 right-0 translate-y-1/2 w-0 h-0 border-8 border-transparent border-r-border transition-colors duration-500"></span>
        </>
    );
}
