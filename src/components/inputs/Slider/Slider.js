import { useRef } from "react";
import { countNumberOfCharactersFromNumber } from "../../../core/util";
import "./Slider.css"

const thumbRadius = 7;

export default function Slider({min = 0, max = 100, increment = 1, value, onChange}) {
    let containerRef = useRef();

    let shift = (value - min) / (max - min) * 100;
    let indicatorWidth = Math.max(countNumberOfCharactersFromNumber(min), countNumberOfCharactersFromNumber(max)) + 1;

    let containerStyle = {
        marginLeft: thumbRadius + "px",
        marginRight: thumbRadius + "px",
    }

    let thumbStyle = {
        height: thumbRadius * 2 + "px",
        width: thumbRadius * 2 + "px",
        marginLeft: `calc(${shift}% - ${thumbRadius}px)`
    }

    let indicatorStyle = {
        marginLeft: `calc(${shift}% - ${indicatorWidth / 2}rem)`,
        width: indicatorWidth + "rem"
    }

    let highlightStyle = {
        width: `calc(${shift}% - ${thumbRadius}px)`
    }

    const handleMouseMove = (e) => {
        const isHeld = e.buttons & 1;
        if(!isHeld) return;

        const container = containerRef.current;
        if(!container) return;

        e.stopPropagation();

        const boundingBox = container.getBoundingClientRect();
        let v = Math.round((e.clientX - boundingBox.left)) / (Math.trunc(boundingBox.width) - 1);
        if(v < 0) v = 0;
        if(v > 1) v = 1;

        v = v * (max - min) + min;
        v = Math.trunc(v / increment) * increment;
        onChange(v);
    }

    return <div className="align-center w-full slider-container ">
        <p className="m-0 mr-5px">{min}</p>
        <div ref={containerRef} style={containerStyle} className="align-center grid-1-1" onMouseMove={handleMouseMove}>
            <div className="g-el-1-1 slider-scrollbar"></div>
            <div style={thumbStyle} className="g-el-1-1 slider-thumb pointer"></div> 
            <div style={highlightStyle} className="g-el-1-1 slider-highlight"></div>
        </div>
        <p className="m-0 ml-5px">{max}</p>
        <div style={containerStyle} className="slider-indicator">
            <p style={indicatorStyle} className="m-0 text-align-center bg-primary rounded text-on-color">{value}</p>
        </div>
    </div>
}