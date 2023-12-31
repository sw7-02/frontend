import { writable } from "svelte/store";

export function persistentWritable<T>(key: string, value: T) {
    let storedValue;
    let initialValue;
    if (typeof localStorage !== "undefined") {
        storedValue = localStorage.getItem(key);
        initialValue = storedValue ? JSON.parse(storedValue) : value;
    } else {
        initialValue = value;
    }
    const store = writable<T>(initialValue);

    store.subscribe(($store) => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(key, JSON.stringify($store));
        }
    });

    return store;
}
