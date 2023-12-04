import { persistentWritable } from "./localStorage";

export const jwtStore = persistentWritable<string>("jwt", "");
export const usernameStore = persistentWritable<string>("username", "");
export const isTeacherStore = persistentWritable<boolean>("isTeacher", false);
export const userRoleStore = persistentWritable<number>("userRole", 0);
