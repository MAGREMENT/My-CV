import "./Slider.css"

const thumbRadius = 7;

export default function Slider({min, max, increment, value, onChange}) {
    let shift = (value - min) / (max - min) * 100;

    let containerStyle = {
        paddingLeft: thumbRadius + "px",
        paddingRight: thumbRadius + "px",
    }

    let thumbStyle = {
        height: thumbRadius * 2 + "px",
        width: thumbRadius * 2 + "px",
        marginLeft: `calc(${shift}% - ${thumbRadius}px)`
    }

    return <div className="flex-row align-center w-full">
        <p className="m-0">{min}</p>
        <div style={containerStyle} className="flex-grow align-center mlr-5px grid-1-1">
            <div className="g-el-1-1 slider-scrollbar"></div>
            <div style={thumbStyle} className="g-el-1-1 slider-thumb"></div> 
            <div className="g-el-1-1"></div>
        </div>
        <p className="m-0">{max}</p>
    </div>
}