import { useState } from "react";
import DropDown from "../../DropDown/DropDown";

export default function Select({possibleValues, value, valueMap = defaultValueMap, onChange}) {
    const [open, setOpen] = useState(false);

    if(!Array.isArray(possibleValues)) possibleValues = [];
    let children = possibleValues.map(p => valueMap(p, () => onChange(p.value))) 

    let index = possibleValues.findIndex(v => v.value === value);
    let shown = index < 0 ? null : valueMap(possibleValues[index]);

    let trigger = <div className="border-1px rounded p-5px" onClick={() => setOpen(!open)}>
        {shown}
    </div>

    return <DropDown open={open} trigger={trigger} onChange={setOpen}>
        {children}
    </DropDown>
}

function defaultValueMap(p, onClick) {
    return <p className={"m-0 p-5px " + (onClick ? "bg-primary-hover text-on-color-hover" : "")} onClick={onClick} key={p.value}>{p.data}</p>;
}