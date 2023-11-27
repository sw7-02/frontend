import { writable } from "svelte/store";

export const courseIdStore = writable<number>();

export const taskStore = writable<number>();
