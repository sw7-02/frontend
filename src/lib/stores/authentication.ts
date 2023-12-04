import { persistentWritable } from "./localStorage";

export const jwtStore = persistentWritable("jwt", "");
export const usernameStore = persistentWritable("username", "");
export const isTeacherStore = persistentWritable("isTeacher", false);
export const userRoleStore = persistentWritable("userRole", 0);
