import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { TranslationServiceContext } from '../../../core/services/TranslationService';

function BottomInformation({icon, text}){
    return <div className="flex-row align-center">
        <FontAwesomeIcon className='mr-5px fs-1-5em' icon={icon}/>
        <p className='m-0'>{text}</p>
    </div>
}

function CoreInformationContener({title, children, additionalCss}) {
    return <div className='flex-col w-full'>
        <div className='w-full border-b-1px border-color-primary mb-1em pl-2em pb-0-2em'>
            <p className='mt-0 fs-1-5em fw-550 mb-0 uppercase'>{title}</p>
        </div>
        <div className={'ml-2em pr-1em ' + additionalCss}>
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

    return <div className='flex-col mb-1em'>
        <p className='m-0 fw-550 fs-1-25em'>{tr.t(data?.title)}</p>
        <p className='m-0 italic mb-0-5em'>{`${tr.t(data?.establishment)} - ${tr.t(data?.location)}, ${tr.t(data?.country)} | ${dateString}`}</p>
        <div className='flex-col'>
            {feats.map((f, i) => <div className='flex-row'>
                    <div className="circle-0-3em mt-0-4em bg-tertiary flex-shrink-0 mlr-1em"></div>
                    <p className='m-0' key={i}>{tr.t(f)}</p>
                </div>)}
        </div>
    </div>
}

function SkillDisplay({skill, isLast}) {
    let tr = useContext(TranslationServiceContext);

    const barStyle = {
        width: skill.value + "%"
    }

    return <div className={'flex-col mr-2em ' + (isLast ? "" : "mb-1em")}>
        <p className='m-0 mb-5px'>{tr.t(skill.name, skill.name)}</p>
        <div className='w-full h-1-5em bg'>
            <div style={barStyle} className='h-full bg-tertiary'></div>
        </div>
    </div>
}

function PersonnalProject({project}) {
    let tr = useContext(TranslationServiceContext);

    return <div className='flex-col mb-1em'>
        <p className='m-0 fw-550 fs-1-25em'>{project.title}</p>
        <p className='m-0 italic mb-0-5em'>{project.link}</p>
        <p className='m-0'>{tr.t(project.description)}</p>
    </div>
}

export default function SquaredCVLayout({data, settings}) {
    let tr = useContext(TranslationServiceContext); 

    let experiences = data?.experience ?? [];
    let education = data?.education ?? [];
    let languages = data?.languages ?? [];
    let skills = data?.skills ?? [];
    let projects = data?.personnalProjects ?? [];

    return <div className="full-size flex-col">
        <div className='flex-grow flex-row'>
            <div className='flex-col w-45per flex-shrink-0'>
                <div className='bg-secondary h-5em'></div>
                <div className='flex-grow flex-col bg-primary text-on-color'>
                    <div className='w-full plr-2em -mt-3em'>
                        <img className='w-full' src={data?.picture} alt="profile"></img>
                    </div>
                    <div className="flex-col h-full justify-around">
                        <CoreInformationContener title={tr.t("PROFILE")}>
                            <p className='m-0'>{tr.t(data?.introduction)}</p>
                        </CoreInformationContener>
                        <CoreInformationContener title={tr.t("SKILLS")} additionalCss="grid-2cols">
                            {skills.map((s, i) => <SkillDisplay skill={s} key={i} isLast={i >= skills.length - 2}/>)}
                        </CoreInformationContener>
                        <CoreInformationContener title={tr.t("LANGUAGES")}>
                            {languages.map((l, i) => {
                                let value = "BEGINNER";
                                if(l.value > 90) value = "NATIVE";
                                else if(l.value > 70) value = "ADVANCED";
                                else if(l.value > 40) value = "INTERMEDIATE";

                                return <p key={i} className='m-0 mb-0-5em'>{tr.t(l.name) + " : " + tr.t(value)}</p>
                            })}
                        </CoreInformationContener>
                    </div>
                </div>
            </div>
            <div className='flex-col flex-grow text-tertiary'>
                <div className='bg-secondary plr-2em ptb-2em w-full'>
                    <p className='m-0 fs-2-5em fw-650'>{data?.firstname}</p>
                    <p className='m-0 fs-2-5em fw-650'>{data?.surname}</p>
                    <p className='m-0 fs-1-5em'>{tr.t(data?.title)}</p>
                </div>
                <div className="bg flex-grow flex-col justify-around pt-0-5em">
                    <CoreInformationContener title={tr.t("EDUCATION")}>
                        {education.map((e, i) => <CoreInformation key={i} data={e}/>)}
                    </CoreInformationContener>
                    <CoreInformationContener title={tr.t("WORK_EXPERIENCE")}>
                        {experiences.map((e, i) => <CoreInformation key={i} data={e}/>)}
                    </CoreInformationContener>
                    <CoreInformationContener title={tr.t("PERSONNAL_PEROJECTS")}>
                        {projects.map((e, i) => <PersonnalProject key={i} project={e}/>)}
                    </CoreInformationContener>
                </div>
            </div>
        </div>
        <div className="flex-row flex-shrink-0 align-center justify-around bg-secondary ptb-2em">
            <BottomInformation icon={faPhone} text={data?.phone}/>
            <BottomInformation icon={faEnvelope} text={data?.mail}/>
            <BottomInformation icon={faLocationDot} text={data?.location + ", " + tr.t(data?.country) }/>
        </div>
    </div>
}