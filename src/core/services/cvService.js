import defaultData from '../../data/default-cv-data.json'
import { getOrInitFromLocalStorage } from '../util';
import { createContext } from 'react';

const CVDataKey = "CV-Data-Key";

const fonts = ["Poppins", "Finlandica"]

export class CVService {
    constructor() {
        this.data = getOrInitFromLocalStorage(CVDataKey, defaultData)
    }

    reset() {
        this.data = defaultData;
        localStorage.setItem(CVDataKey, JSON.stringify(defaultData));
        return this.data;
    }

    getData() {
        return new Promise((resolve, reject) => {
            resolve(this.data);
        })
    }

    getFonts() {
      return fonts;
    }
}

export const CVServiceContext = createContext(null);

export const CVServiceProvider = ({ children }) => {
  const serv = new CVService();

  return (
    <CVServiceContext.Provider value={serv}>
      {children}
    </CVServiceContext.Provider>
  );
};