import defaultData from '../../data/default-cv-data.json'
import { getOrInitFromLocalStorage } from '../util';
import { createContext } from 'react';
import SquaredCVLayout from '../../components/cv-layouts/SquaredCVLayout/SquaredCVLayout';

const keepDataInLocal = false;
const CVDataKey = "CV-Data-Key";

const fonts = ["Poppins", "Finlandica", "DM Serif Text", "Tinos"]
const layouts = [
  {
    name: "Squared",
    create: (data, settings) => <SquaredCVLayout data={data} settings={settings}/>,
    preferredFont: "Finlandica",
    heightToFontSizeRatio : 13 / 880
  }
]

export class CVService {
    constructor() {
        this.data = keepDataInLocal ? getOrInitFromLocalStorage(CVDataKey, defaultData) : defaultData;
    }

    reset() {
        this.data = defaultData;
        localStorage.setItem(CVDataKey, JSON.stringify(defaultData));
        return this.data;
    }

    getData() {
        return new Promise((resolve) => resolve(this.data))
    }

    getFonts() {
        return new Promise((resolve) => resolve(fonts))
    }

    getLayouts() {
      return new Promise(r => r(layouts));
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