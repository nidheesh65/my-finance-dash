export const Storage = {
    save: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
    get: (key) => JSON.parse(localStorage.getItem(key)),
    clear: () => { localStorage.clear(); location.reload(); }
};
