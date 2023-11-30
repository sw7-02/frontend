import { persistentWritable } from "./localStorage";

export enum role {
    STUDENT = 0,
    TEACHER = 1,
    TA = 2,
}

export const jwtStore = persistentWritable("jwt", "");
export const usernameStore = persistentWritable("username", "");
export const isTeacherStore = persistentWritable("isTeacher", false);
export const userRoleStore = persistentWritable("userRole", 0);
