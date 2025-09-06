export function getOrInitFromLocalStorage(key, defaultValue) {
    let stored = localStorage.getItem(key);
    if(!stored) {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue;
    } else return JSON.parse(stored);
}