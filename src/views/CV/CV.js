import './CV.css'
import { useContext, useEffect, useState, useRef } from 'react';
import { CVServiceContext } from '../../core/services/CVService';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Label from '../../components/Label/Label';
import { TranslationServiceContext } from '../../core/services/TranslationService';
import Slider from '../../components/inputs/Slider/Slider';
import Select from '../../components/inputs/Select/Select';
import { toPng } from 'html-to-image';
import { downloadURI } from '../../core/util';

const containerPadding = 20;
const widthToHeightRatio = 297 / 210;

export default function CV() {
    let tr = useContext(TranslationServiceContext);
    const cvService = useContext(CVServiceContext);

    const containerRef = useRef();
    const pdfRef = useRef();

    const [maxCvHeight, setMaxCvHeight] = useState(2000);
    const [layouts, setLayouts] = useState([]);
    const [currentLayout, setCurrentLayout] = useState("");
    const [fonts, setFonts] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [data, setData] = useState(null);
    const [settings, setSettings] = useState({
        font: "", 
        size: 0
    })
    const [lang, setLang] = useState(tr.getLanguage());

    useEffect(() => {
        cvService.getData().then(r => setData(r));
        cvService.getFonts().then(f => {
            setFonts(f);
            setSettings(s => ({...s, font: f[0]}))
        });
        cvService.getLayouts().then(l => {
            setLayouts(l);
            setCurrentLayout(l[0].name)
        })
    }, [cvService])

    useEffect(() => {
        tr.getAvailableLanguages().then(l => setLanguages(l))
    }, [tr]);

    useEffect(() => {
        if(!containerRef?.current) return;
        setSettings(s => ({...s, size: containerRef.current.offsetHeight - containerPadding * 2}));
        setMaxCvHeight(Math.trunc((containerRef.current.offsetWidth  - containerPadding * 2) * widthToHeightRatio))
    }, [])

    const base = layouts.find(l => l.name === currentLayout);

    useEffect(() => {
        if(!base) return;

        if(fonts.includes(base.preferredFont)) setSettings(s => ({...s, font: base.preferredFont}))
    }, [base, fonts])

    const style = {
        fontFamily: settings.font,
        height: settings.size + "px"
    }

    if(base) style.fontSize = settings.size * base.heightToFontSizeRatio;

    const handleLangChange = (e) => {
        tr.setLanguage(e);
        setLang(tr.getLanguage());
    }

    const handleDownload = () => {
        if(!pdfRef.current) return;

        toPng(pdfRef.current).then(dataUrl => {
            downloadURI(dataUrl, "cv")
        })
    }

    let layoutToShow = base ? base.create(data, settings) : null;

    return <div className='flex-row h-full'>
        <div ref={containerRef} style={{padding: containerPadding + "px"}} className="flex-grow flex-row align-safe-center justify-center overflow-y min-h-0">
            <div ref={pdfRef} className='cv-container rounded shadow-around h-full' style={style}>
                {layoutToShow}
            </div>
        </div>
        <div className='flex-col p-20px w-240px flex-shrink-0'>
            <div className='flex-row align-center'>
                <FontAwesomeIcon className='mr-5px fs-1-5rem' icon={faGear}/>
                <p className='fs-1-5rem fw-650 m-0'>{tr.t("SETTINGS")}</p>
            </div>
            <Label text={tr.t("LAYOUT")}>
                <Select possibleValues={layouts.map(l => ({value: l.name, data: l.name}))} value={currentLayout} onChange={setCurrentLayout}></Select>
            </Label>
            <Label text={tr.t("FONT")}>
                <Select possibleValues={fonts.map(f => ({value: f, data: f}))} value={settings.font} onChange={(e) => setSettings({...settings, font: e})}></Select>
            </Label>
            <Label text={tr.t("LANGUAGE")}>
                <Select possibleValues={languages.map(l => ({value: l.key, data: tr.t(l.name)}))} value={lang} onChange={handleLangChange}></Select>
            </Label>
            <Label text={tr.t("SIZE")}>
                <Slider min={360} max={maxCvHeight} increment={1} value={settings.size} onChange={(e) => setSettings({...settings, size: e})}></Slider>
            </Label>
            <button className='basic-button' onClick={handleDownload}>{tr.t("TO_PNG")}</button>
        </div>
    </div>;
}