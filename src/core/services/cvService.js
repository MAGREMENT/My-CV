import data from './../../data/default-cv-data.json'

export function getCVData() {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}