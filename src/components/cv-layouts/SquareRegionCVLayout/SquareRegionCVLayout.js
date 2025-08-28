import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function BottomInformation({icon, text}){
    return <div class="flex-row align-center">
        <FontAwesomeIcon className='mr-5px fs-1-5rem' icon={icon}/>
        <p className='m-0'>{text}</p>
    </div>
}

function CoreInformationContener({title, children}) {
    return <div className='flex-col w-full'>
        <div className='w-full border-b-1px border-color-primary'>
            <p className='mt-0 ml-20px fs-1-5rem mb-5px'>{title}</p>
        </div>
        <div className='ml-20px'>
            {children}
        </div>
    </div>
}

export default function SquareRegionCVLayout({data}) {
    return <div className="full-size flex-col">
        <div className='flex-grow flex-row'>
            <div className='flex-col w-40per'>
                <div className='bg-secondary h-50px'>

                </div>
                <div className='flex-grow flex-col bg-primary'>

                </div>
            </div>
            <div className='flex-col flex-grow'>
                <div className='bg-secondary pt-30px plr-20px pb-20px w-full'>
                    <p className='m-0 fs-2-5rem fw-650'>{data?.firstname}</p>
                    <p className='m-0 fs-2-5rem fw-650'>{data?.surname}</p>
                    <p className='m-0 fs-1-5rem'>{data?.title}</p>
                </div>
                <div className="flex-grow flex-col justify-around">
                    <CoreInformationContener title="Work Experience">
                        <p>hi</p>
                    </CoreInformationContener>
                    <CoreInformationContener title="Education">
                        <p>hi</p>
                    </CoreInformationContener>
                </div>
            </div>
        </div>
        <div className="flex-row align-center justify-around bg-secondary ptb-20px">
            <BottomInformation icon={faPhone} text={data?.phone}/>
            <BottomInformation icon={faEnvelope} text={data?.mail}/>
            <BottomInformation icon={faLocationDot} text={data?.location + ", " + data?.country }/>
        </div>
    </div>
}