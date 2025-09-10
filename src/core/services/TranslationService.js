import frT from '../../data/translations-fr.json'
import enT from '../../data/translations-en.json'
import { getOrInitFromLocalStorage } from '../util';
import { createContext } from 'react';

const languages = [{
        key: "fr-FR",
        name: "FRENCH"
    },
    {
        key: "en-GB",
        name: "ENGLISH"
    }];

function getLanguageData(lang) {
    switch(lang) {
        case "fr-FR" : return frT;
        case "en-GB" : return enT;
        default: return null;
    }
}

const LangKey = "Lang-Key";

export class TranslationService {
    constructor(){
        this.data = {}
        this.lang = getOrInitFromLocalStorage(LangKey, "en-GB");

        this.setLanguage(this.lang);
    }

    setLanguage(lang) {
        if(!languages.find(l => l.key === lang)) return;

        let data = this.data[lang];
        if(data) {
            this.lang = lang;
            return;
        }

        data = getLanguageData(lang);
        if(!data) return;

        this.data[lang] = data;
        this.lang = lang;
        localStorage.setItem(LangKey, JSON.stringify(lang));
    }

    getLanguage() {
        return this.lang;
    }

    t(key, defaultValue = "") {
        return this.data[this.lang]?.[key] ?? defaultValue;
    }

    getAvailableLanguages() {
        return new Promise(r => r(languages))
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