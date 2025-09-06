import { TranslationServiceProvider } from "./TranslationService";
import { CVServiceProvider } from "./CVService";

export default function ServicesWrapper({children}) {
    return <TranslationServiceProvider>
        <CVServiceProvider>
            {children}
        </CVServiceProvider>
    </TranslationServiceProvider>
}