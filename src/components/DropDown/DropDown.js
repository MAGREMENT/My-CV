import { useRef, useEffect } from "react"

export default function DropDown({open, onChange, children, trigger, closeOnBlur}) {
    let containerRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onChange(false);
            }
        };

        if(open) document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onChange, open]);

    const menu = !open ? null :
        <div className="z-10 border-1px border-color-primary rounded absolute w-full bg">
            {children}
        </div>

    return <div className="relative" ref={containerRef}>
        {trigger}
        {menu}
    </div>
}