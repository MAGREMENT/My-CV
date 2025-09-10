import { useEffect, useRef } from "react";

export function useResizeTracker(ref, toRun) {
    useEffect(() => {
        const e = ref.current;
        if(!e) return;

        const observer = new ResizeObserver(entries => {
            for(let entry of entries) {
                toRun(entry.contentRect);
            }
        });

        observer.observe(e);

        return () => {
            observer.unobserve(e);
            observer.disconnect();
        }
    }, []);
}