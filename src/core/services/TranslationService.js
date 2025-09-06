import frT from '../../data/translations-fr.json'
import enT from '../../data/translations-en.json'
import { getOrInitFromLocalStorage } from '../util';
import { createContext } from 'react';

const languages = ["fr", "en"];

function getLanguageData(lang) {
    switch(lang) {
        case "fr" : return frT;
        case "en" : return enT;
        default: return null;
    }
}

const LangKey = "Lang-Key";

export class TranslationService {
    constructor(){
        this.data = {}
        this.lang = getOrInitFromLocalStorage(LangKey, "en");

        this.setLanguage(this.lang);
    }

    setLanguage(lang) {
        console.log(lang);
        if(!languages.includes(lang)) return;

        let data = this.data[lang];
        if(data) {
            this.lang = lang;
            return;
        }

        data = getLanguageData(lang);
        if(!data) return;

        this.data[lang] = data;
        this.lang = lang;
    }

    getLanguage() {
        return this.lang;
    }

    t(key, defaultValue = "") {
        return this.data[this.lang]?.[key] ?? defaultValue;
    }
}

export const TranslationServiceContext = createContext(null);

export const TranslationServiceProvider = ({ children }) => {
  const serv = new TranslationService();

  return (
    <TranslationServiceContext.Provider value={serv}>
      {children}
    </TranslationServiceContext.Provider>
  );
};