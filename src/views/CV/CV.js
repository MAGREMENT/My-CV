import './CV.css'
import { useEffect, useState } from 'react';
import { getCVData } from '../../core/services/cvService';
import SquareRegionCVLayout from '../../components/cv-layouts/SquareRegionCVLayout/SquareRegionCVLayout';

export default function CV() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getCVData().then(r => setData(r))
    }, [])

    return <div className="full-size flex-center">
        <div className='cv-container rounded shadow-around'>
            <SquareRegionCVLayout data={data}/>
        </div>
    </div>
}