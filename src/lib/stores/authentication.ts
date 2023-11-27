import { writable } from "svelte/store";

export enum role {
    STUDENT = 0,
    TEACHER = 1,
    TA = 2,
}

export const jwtStore = writable<string>("");

export const isTeacherStore = writable<boolean>(false);

export const userRoleStore = writable<role>(0);