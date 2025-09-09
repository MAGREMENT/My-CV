import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { TranslationServiceContext } from '../../../core/services/TranslationService';

function BottomInformation({icon, text}){
    return <div className="flex-row align-center">
        <FontAwesomeIcon className='mr-5px fs-1-5rem' icon={icon}/>
        <p className='m-0'>{text}</p>
    </div>
}

function CoreInformationContener({title, children, additionalCss}) {
    return <div className='flex-col w-full'>
        <div className='w-full border-b-1px border-color-primary mb-10px'>
            <p className='mt-0 ml-20px fs-1-5rem mb-5px'>{title}</p>
        </div>
        <div className={'ml-20px pr-10px ' + additionalCss}>
            {children}
        </div>
    </div>
}

const dateOptions = {month: 'short', year:"numeric"}

function CoreInformation({data}) {
    let feats = data?.feats ?? [];
    let tr = useContext(TranslationServiceContext);
    
    let dateString = "";
    if(data) {
        const start = new Date(data.start);
        const end = new Date(data.end);
        dateString = start.toLocaleDateString("fr-FR", dateOptions);

        if(start.getMonth() !== end.getMonth || start.getFullYear() !== end.getFullYear()) 
            dateString += " - " + end.toLocaleDateString("fr-FR", dateOptions)
    }

    return <div className='flex-col mb-10px'>
        <p className='m-0 fs-650 fs-1-5rem'>{tr.t(data?.title)}</p>
        <p className='m-0'>{`${tr.t(data?.establishment)} - ${tr.t(data?.location)}, ${tr.t(data?.country)} | ${dateString}`}</p>
        <ul className='m-0'>
            {feats.map((f, i) => <li key={i}>{tr.t(f)}</li>)}
        </ul>
    </div>
}

function SkillDisplay({skill}) {
    const barStyle = {
        width: skill.value + "%"
    }

    return <div className='flex-col mr-20px mb-20px'>
        <p className='m-0 mb-5px'>{skill.name}</p>
        <div className='w-full h-30px bg'>
            <div style={barStyle} className='h-full bg-secondary'></div>
        </div>
    </div>
}

export default function SquareRegionCVLayout({data, settings}) {
    let tr = useContext(TranslationServiceContext); 

    let experiences = data?.experience ?? [];
    let education = data?.education ?? [];
    let languages = data?.languages ?? [];
    let skills = data?.skills ?? [];

    return <div className="full-size flex-col">
        <div className='flex-grow flex-row'>
            <div className='flex-col w-45per flex-shrink-0'>
                <div className='bg-secondary h-70px'></div>
                <div className='flex-grow flex-col bg-primary text-on-color'>
                    <div className='w-full plr-20px -mt-30px'>
                        <img className='w-full' src="/assets/random.jpg" alt="profile"></img>
                    </div>
                    <div className="flex-col h-full justify-around">
                        <CoreInformationContener title={tr.t("PROFILE")}>
                            {tr.t(data?.introduction)}
                        </CoreInformationContener>
                        <CoreInformationContener title={tr.t("SKILLS")} additionalCss="grid-2cols">
                            {skills.map((s, i) => <SkillDisplay skill={s} key={i}/>)}
                        </CoreInformationContener>
                        <CoreInformationContener title={tr.t("LANGUAGES")}>
                            {languages.map((l, i) => {
                                let value = "BEGINNER";
                                if(l.value > 90) value = "NATIVE";
                                else if(l.value > 70) value = "ADVANCED";
                                else if(l.value > 40) value = "INTERMEDIATE";

                                return <p key={i} className='m-0 mb-5px'>{tr.t(l.name) + " : " + tr.t(value)}</p>
                            })}
                        </CoreInformationContener>
                    </div>
                </div>
            </div>
            <div className='flex-col flex-grow'>
                <div className='bg-secondary pt-30px plr-20px pb-20px w-full'>
                    <p className='m-0 fs-2-5rem fw-650'>{data?.firstname}</p>
                    <p className='m-0 fs-2-5rem fw-650'>{data?.surname}</p>
                    <p className='m-0 fs-1-5rem'>{tr.t(data?.title)}</p>
                </div>
                <div className="flex-grow flex-col justify-around">
                    <CoreInformationContener title={tr.t("EDUCATION")}>
                        {education.map((e, i) => <CoreInformation key={i} data={e}/>)}
                    </CoreInformationContener>
                    <CoreInformationContener title={tr.t("WORK_EXPERIENCE")}>
                        {experiences.map((e, i) => <CoreInformation key={i} data={e}/>)}
                    </CoreInformationContener>
                </div>
            </div>
        </div>
        <div className="flex-row flex-shrink-0 align-center justify-around bg-secondary ptb-20px">
            <BottomInformation icon={faPhone} text={data?.phone}/>
            <BottomInformation icon={faEnvelope} text={data?.mail}/>
            <BottomInformation icon={faLocationDot} text={data?.location + ", " + tr.t(data?.country) }/>
        </div>
    </div>
}