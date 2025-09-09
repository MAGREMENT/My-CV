import './CV.css'
import { useContext, useEffect, useState, useRef } from 'react';
import { CVServiceContext } from '../../core/services/CVService';
import SquareRegionCVLayout from '../../components/cv-layouts/SquareRegionCVLayout/SquareRegionCVLayout';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Label from '../../components/Label/Label';
import { TranslationServiceContext } from '../../core/services/TranslationService';
import {useReactToPrint} from "react-to-print";
import Slider from '../../components/inputs/Slider/Slider';
import Select from '../../components/inputs/Select/Select';

export default function CV() {
    let tr = useContext(TranslationServiceContext);
    const cvService = useContext(CVServiceContext);

    const fonts = cvService.getFonts().map(f => ({value:f, data:f}));
    const languages = [{value:"en", data:"English"}, {value: "fr", data:"French"}]

    const [data, setData] = useState(null);
    const [settings, setSettings] = useState({
        font: fonts[0].value,
        size: 35
    })
    const [lang, setLang] = useState(tr.getLanguage());

    useEffect(() => {
        cvService.getData().then(r => setData(r))
    }, [cvService])

    const pdfRef = useRef(null);
    const reactToPrint = useReactToPrint({
        documentTitle: "cv",
        contentRef: pdfRef
    })

    const style = {
        fontFamily: settings.font,
        width: settings.size + "%"
    }

    const handleLangChange = (e) => {
        tr.setLanguage(e);
        setLang(tr.getLanguage());
    }

    return <div className='flex-row h-full'>
        <div className="flex-grow flex-row align-safe-center justify-center overflow-y p-20px min-h-0">
            <div style={style}>
                <div ref={pdfRef} className='cv-container rounded shadow-around max-w-full w-full'>
                    <SquareRegionCVLayout data={data} settings={settings}/>
                </div>
            </div>
        </div>
        <div className='flex-col p-20px w-240px flex-shrink-0'>
            <div className='flex-row align-center'>
                <FontAwesomeIcon className='mr-5px fs-1-5rem' icon={faGear}/>
                <p className='fs-1-5rem fw-650 m-0'>{tr.t("SETTINGS")}</p>
            </div>
            <Label text={tr.t("FONT")}>
                <Select possibleValues={fonts} value={settings.font} onChange={(e) => setSettings({...settings, font: e})}></Select>
            </Label>
            <Label text={tr.t("LANGUAGE")}>
                <Select possibleValues={languages} value={lang} onChange={handleLangChange}></Select>
            </Label>
            <Label text={tr.t("SIZE")}>
                <Slider min={20} max={100} value={settings.size} onChange={(e) => setSettings({...settings, size: e})}></Slider>
            </Label>
            <button className='basic-button mb-10px' onClick={() => setData(cvService.reset())}>Reset Data</button>
            <button className='basic-button' onClick={reactToPrint}>{tr.t("TO_PDF")}</button>
        </div>
    </div>
}