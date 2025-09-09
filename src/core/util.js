export function getOrInitFromLocalStorage(key, defaultValue) {
    let stored = localStorage.getItem(key);
    if(!stored) {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue;
    } else return JSON.parse(stored);
}

export function countNumberOfCharactersFromNumber(n) {
    let count = n >= 0 ? 1 : 2;

    while(true) {
        n = Math.trunc(n / 10);
        if(n !== 0) count++;
        else break;
    }

    return count;
}