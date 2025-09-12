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

//https://stackoverflow.com/questions/3916191/download-data-url-file
export function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}