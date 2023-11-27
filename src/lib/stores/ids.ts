import { writable } from "svelte/store";

export const courseIdStore = writable<number>();

export const sessionIdStore = writable<number>();

export const taskIdStore = writable<number>();
