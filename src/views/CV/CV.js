import './CV.css'
import { useEffect, useState } from 'react';
import { getCVData } from '../../core/services/cvService';
import SquareRegionCVLayout from '../../components/cv-layouts/SquareRegionCVLayout/SquareRegionCVLayout';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Label from '../../components/Label/Label';

export default function CV() {
    const [data, setData] = useState(null);
    const [settings, setSettings] = useState({
        font: "Poppins",
        size: 50
    })

    useEffect(() => {
        getCVData().then(r => setData(r))
    }, [])

    let style = {
        fontFamily: settings.font,
        width: settings.size + "%"
    }

    return <div className='flex-row h-full'>
        <div className="flex-grow align-safe-center justify-center overflow-y p-20px min-h-0">
            <div style={style} className='cv-container rounded shadow-around max-w-full'>
                <SquareRegionCVLayout data={data} settings={settings}/>
            </div>
        </div>
        <div className='flex-col p-20px'>
            <div className='flex-row align-center'>
                <FontAwesomeIcon className='mr-5px fs-1-5rem' icon={faGear}/>
                <p className='fs-1-5rem fw-650 m-0'>Settings</p>
            </div>
            <Label text="Font">
                <select></select>
            </Label>
            <Label text="Size">
                <input  type="range" min="20" max="100" value={settings.size} onChange={(e) => setSettings({...settings, size: e.target.value})}></input>
            </Label>
        </div>
    </div>
}