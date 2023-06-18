import { useEffect, useState } from "react";

export const useScrollToTopRequest = (callback: () => void, newestOnTop: boolean) => {
    const [isWorkedOut, setIsWorkedOut] = useState(false);

    const handleWheelToTop = (event: WheelEvent) => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop === 0 && event.deltaY < 0 && !isWorkedOut) {
            setIsWorkedOut(true);
            callback();
        }
    };

    const handleWheelToBottom = (event: WheelEvent) => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (
            scrollTop + windowHeight === documentHeight &&
            event.deltaY > 0 &&
            !isWorkedOut
        ) {
            setIsWorkedOut(true);
            callback();
        }
    };

    useEffect(() => {
        const handleFunc = newestOnTop ? handleWheelToBottom : handleWheelToTop;

        document.addEventListener("wheel", handleFunc);

        return () => {
            document.removeEventListener("wheel", handleFunc);
        };
    }, [callback, isWorkedOut]);
};




