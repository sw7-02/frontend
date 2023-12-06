import { persistentWritable } from "./localStorage";

export const courseIdStore = persistentWritable("courseId", null);
export const sessionIdStore = persistentWritable("sessionId", null);
export const taskIdStore = persistentWritable("taskId", null);
